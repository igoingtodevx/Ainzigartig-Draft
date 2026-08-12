import React, { useEffect, useRef, useState } from 'react';

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  ts: number;
}

const SUGGESTIONS = [
  'Was umfasst Automatisierung & Integrationen?',
  'Welche internen Business-Tools baut ihr?',
  'Wie grenzt ihr einen Wissensassistenten ab?',
  'Welche gebauten Systeme kann ich ansehen?',
];

const STORAGE_KEY = 'ainzigartig.chat.history.v1';
const MAX_MESSAGE_CHARS = 800;
const MAX_STORED_MESSAGES = 10;
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function loadHistory(): ChatMessage[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item) => item && (item.role === 'user' || item.role === 'model') && typeof item.content === 'string')
      .map((item) => ({ role: item.role, content: item.content.slice(0, MAX_MESSAGE_CHARS), ts: Number(item.ts) || Date.now() }))
      .slice(-MAX_STORED_MESSAGES);
  } catch {
    return [];
  }
}

function saveHistory(msgs: ChatMessage[]) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(msgs.slice(-MAX_STORED_MESSAGES)));
  } catch {
    // sessionStorage may be unavailable
  }
}

const EyeMark: React.FC = () => (
  <svg width="25" height="17" viewBox="0 0 24 16" fill="none" aria-hidden="true">
    <ellipse cx="12" cy="8" rx="11" ry="7" stroke="currentColor" strokeWidth="1.8" fill="#ECA867" />
    <circle cx="12" cy="8" r="3.5" fill="#1A1918" />
    <circle cx="10.5" cy="6.5" r="1" fill="#FFFFFF" />
  </svg>
);

export const ChatBot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(loadHistory);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [cooldownUntil, setCooldownUntil] = useState(0);
  const [, setTick] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [availability, setAvailability] = useState<'checking' | 'ready' | 'unavailable'>('checking');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open, busy]);

  useEffect(() => {
    if (open && availability === 'ready') setTimeout(() => inputRef.current?.focus(), 200);
  }, [availability, open]);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/chat')
      .then(async (response) => {
        if (!response.ok) throw new Error(String(response.status));
        return response.json();
      })
      .then((payload) => { if (!cancelled) setAvailability(payload?.configured ? 'ready' : 'unavailable'); })
      .catch(() => { if (!cancelled) setAvailability('unavailable'); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!open) return;
    const dialog = document.getElementById('ainzigartig-chat');
    if (!dialog) return;

    const focusFirstControl = () => {
      const firstControl = dialog.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
      (firstControl && firstControl.getClientRects().length > 0 ? firstControl : dialog).focus();
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        requestAnimationFrame(() => triggerRef.current?.focus());
      }
    };
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
        .filter((element) => element.getClientRects().length > 0);
      if (focusable.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeInside = dialog.contains(document.activeElement);
      if (!activeInside || (event.shiftKey && document.activeElement === first)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('keydown', trapFocus);
    requestAnimationFrame(focusFirstControl);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('keydown', trapFocus);
    };
  }, [open]);

  useEffect(() => saveHistory(messages), [messages]);

  useEffect(() => {
    if (!cooldownUntil) return;
    const interval = setInterval(() => {
      if (Date.now() >= cooldownUntil) {
        setCooldownUntil(0);
        clearInterval(interval);
        return;
      }
      setTick((n) => n + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldownUntil]);

  async function send(text?: string) {
    const message = (text ?? input).trim().slice(0, MAX_MESSAGE_CHARS);
    if (!message || busy || availability !== 'ready' || Date.now() < cooldownUntil) return;

    setInput('');
    setError(null);
    const userMsg: ChatMessage = { role: 'user', content: message, ts: Date.now() };
    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    setBusy(true);

    try {
      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          history: messages
            .filter((m) => m.role !== 'model' || m.content)
            .slice(-6)
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) {
        setError(data?.error || `Fehler ${resp.status}`);
        if (resp.status === 429) setCooldownUntil(Date.now() + 6000);
        return;
      }

      setMessages([...nextHistory, { role: 'model', content: data?.response || '(keine Antwort)', ts: Date.now() }]);
    } catch (e) {
      setError(`Verbindung fehlgeschlagen: ${String(e).slice(0, 100)}`);
    } finally {
      setBusy(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  const cooldownSec = cooldownUntil ? Math.max(0, Math.ceil((cooldownUntil - Date.now()) / 1000)) : 0;
  const canSend = input.trim().length >= 2 && !busy && availability === 'ready' && cooldownSec === 0;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label={open ? 'Chat schließen' : 'Chat öffnen'}
        aria-expanded={open}
        aria-controls="ainzigartig-chat"
        onClick={() => setOpen((o) => !o)}
        className={`fixed bottom-5 right-5 z-[60] w-14 h-14 rounded-full border border-ink/25 shadow-card transition-all duration-300 flex items-center justify-center ${
          open ? 'bg-ink text-white rotate-0' : 'bg-accent text-ink hover:-translate-y-1 hover:shadow-lift'
        }`}
      >
        {open ? (
          <span className="material-symbols-outlined text-[22px]" aria-hidden="true">close</span>
        ) : (
          <EyeMark />
        )}
      </button>

      {open && (
        <div
          id="ainzigartig-chat"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ainzigartig-chat-title"
          tabIndex={-1}
          className="fixed bottom-24 right-5 z-[60] w-[400px] max-w-[calc(100vw-2.5rem)] h-[590px] max-h-[calc(100vh-8rem)] bg-surface border border-ink/15 rounded-[26px] shadow-lift flex flex-col overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-ink/10 flex items-center justify-between bg-base/70">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-accent/30 border border-accent/60 flex items-center justify-center text-ink"><EyeMark /></span>
              <div>
                <p id="ainzigartig-chat-title" className="font-editorial text-lg leading-none text-ink">Edi</p>
                <p className="text-[11px] text-muted mt-1.5">Ainzigartig Assistent</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                requestAnimationFrame(() => triggerRef.current?.focus());
              }}
              aria-label="Chat schließen"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-surface-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-hover"
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">close</span>
            </button>
          </div>

          <div ref={scrollRef} className="flex-grow overflow-y-auto px-4 py-5 space-y-4 bg-surface">
            {messages.length === 0 && (
              <div className="space-y-5">
                <div className="brand-card bg-base/70 p-4 shadow-none">
                  {availability === 'checking' && <p className="text-sm text-muted leading-relaxed" role="status">Verfügbarkeit des Assistenten wird geprüft…</p>}
                  {availability === 'unavailable' && <><p className="text-sm font-semibold text-ink">Assistent derzeit nicht aktiviert.</p><p className="mt-1 text-xs leading-relaxed text-muted">Die Wissensbasis bleibt in den Demos, Leistungsseiten und Projektumfängen nachvollziehbar. Es wird keine Scheinantwort erzeugt.</p></>}
                  {availability === 'ready' && <p className="text-sm text-muted leading-relaxed">Hallo. Ich beantworte Fragen zu Ainzigartig, unseren Leistungen und dazu, wie wir konkrete Software- und KI-Prozesse abgrenzen.</p>}
                </div>
                <div className={`grid gap-2 ${availability === 'ready' ? '' : 'opacity-45'}`}>
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      disabled={busy || availability !== 'ready'}
                      className="w-full text-left text-sm text-ink border border-ink/12 bg-surface hover:bg-surface-soft hover:border-ink/25 rounded-2xl px-4 py-3 transition-colors disabled:opacity-50"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4" role="log" aria-live="polite" aria-relevant="additions text">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[88%] text-sm leading-relaxed px-4 py-3 rounded-[18px] ${m.role === 'user' ? 'bg-ink text-white rounded-br-md' : 'bg-base text-ink border border-ink/10 rounded-bl-md'}`}>
                    {m.content}
                  </div>
                </div>
              ))}

              {busy && (
                <div className="flex justify-start">
                  <div className="bg-base border border-ink/10 px-4 py-3 rounded-[18px] rounded-bl-md inline-flex items-center gap-1.5" aria-label="Antwort wird erstellt">
                    {[0, 1, 2].map((n) => <span key={n} aria-hidden="true" className="inline-block w-1.5 h-1.5 bg-light rounded-full animate-blink" style={{ animationDelay: `${n * 180}ms` }} />)}
                  </div>
                </div>
              )}

              {error && <div className="rounded-2xl border border-red-900/15 bg-red-50 px-4 py-3"><p className="text-xs text-red-800">{error}</p></div>}
            </div>
          </div>

          <div className="border-t border-ink/10 p-3 bg-base/60">
            <div className="flex items-end gap-2 rounded-[18px] border border-ink/15 bg-surface p-2 focus-within:border-accent-hover transition-colors">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Frage stellen…"
                rows={1}
                maxLength={MAX_MESSAGE_CHARS}
                disabled={busy || availability !== 'ready'}
                aria-label="Frage an den Ainzigartig Assistenten"
                className="flex-grow resize-none text-sm bg-transparent px-2 py-2 focus:outline-none placeholder:text-light disabled:opacity-50"
                style={{ maxHeight: 96, minHeight: 38 }}
              />
              <button
                type="button"
                onClick={() => send()}
                disabled={!canSend}
                aria-label={availability !== 'ready' ? 'Assistent nicht verfügbar' : cooldownSec > 0 ? `Bitte ${cooldownSec} Sekunden warten` : 'Nachricht senden'}
                className={`shrink-0 rounded-full flex items-center justify-center transition-colors ${
                  cooldownSec > 0 ? 'px-3 h-10 bg-surface-soft text-muted text-xs' : 'w-10 h-10 bg-ink text-white hover:bg-[#33312E] disabled:bg-ink/20 disabled:text-ink/40'
                }`}
              >
                {cooldownSec > 0 ? <span>{cooldownSec}s</span> : <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_upward</span>}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
