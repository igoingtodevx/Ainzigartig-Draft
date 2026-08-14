import React, { useEffect, useRef, useState } from 'react';
import { EyeLogo } from './EyeLogo';

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  ts: number;
}

const SUGGESTIONS = [
  'Was macht Ainzigartig genau?',
  'Welche KI-Lösung passt zu meinem Unternehmen?',
  'Wie läuft ein Projekt mit euch ab?',
  'Was kostet eine Zusammenarbeit?',
];

const STORAGE_KEY = 'ainzigartig_chat_history';

function loadHistory(): ChatMessage[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveHistory(msgs: ChatMessage[]) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(msgs.slice(-12)));
  } catch {
    // sessionStorage may be unavailable
  }
}

export const ChatBot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(loadHistory);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [cooldownUntil, setCooldownUntil] = useState(0);
  const [, setTick] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open, busy]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
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
    const message = (text ?? input).trim();
    if (!message || busy || Date.now() < cooldownUntil) return;

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
          history: nextHistory
            .filter((m) => m.role !== 'model' || m.content)
            .slice(-8)
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
  const canSend = input.trim().length >= 2 && !busy && cooldownSec === 0;

  return (
    <>
      <button
        type="button"
        aria-label={open ? 'Chat schließen' : 'Chat öffnen'}
        onClick={() => setOpen((o) => !o)}
        className={`fixed bottom-5 right-5 z-[60] w-14 h-14 rounded-full border border-ink/25 shadow-card transition-all duration-300 flex items-center justify-center ${
          open ? 'bg-ink text-white rotate-0' : 'bg-accent text-ink hover:-translate-y-1 hover:shadow-lift'
        }`}
      >
        {open ? (
          <span className="material-symbols-outlined text-[22px]">close</span>
        ) : (
          <EyeLogo width={25} height={17} />
        )}
      </button>

      {open && (
        <div
          className="fixed bottom-24 right-5 z-[60] w-[400px] max-w-[calc(100vw-2.5rem)] h-[590px] max-h-[calc(100vh-8rem)] bg-surface border border-ink/15 rounded-[26px] shadow-lift flex flex-col overflow-hidden"
          role="dialog"
          aria-label="Chat mit dem Ainzigartig Assistenten"
        >
          <div className="px-5 py-4 border-b border-ink/10 flex items-center justify-between bg-base/70">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-accent/30 border border-accent/60 flex items-center justify-center text-ink"><EyeLogo width={24} height={16} /></span>
              <div>
                <p className="font-editorial text-lg leading-none text-ink">Edi</p>
                <p className="text-[11px] text-muted mt-1.5">Ainzigartig Assistent</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-surface px-2.5 py-1 text-[10px] uppercase tracking-[0.1em] font-semibold text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-mid" /> live
            </span>
          </div>

          <div ref={scrollRef} className="flex-grow overflow-y-auto px-4 py-5 space-y-4 bg-surface">
            {messages.length === 0 && (
              <div className="space-y-5">
                <div className="brand-card bg-base/70 p-4 shadow-none">
                  <p className="text-sm text-muted leading-relaxed">
                    Hallo. Ich beantworte Fragen zu Ainzigartig, unseren Leistungen und dazu, wo KI in Ihrem Unternehmen sinnvoll sein könnte.
                  </p>
                </div>
                <div className="grid gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      disabled={busy}
                      className="w-full text-left text-sm text-ink border border-ink/12 bg-surface hover:bg-surface-soft hover:border-ink/25 rounded-2xl px-4 py-3 transition-colors disabled:opacity-50"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[88%] text-sm leading-relaxed px-4 py-3 rounded-[18px] ${m.role === 'user' ? 'bg-ink text-white rounded-br-md' : 'bg-base text-ink border border-ink/10 rounded-bl-md'}`}>
                  {m.content}
                </div>
              </div>
            ))}

            {busy && (
              <div className="flex justify-start">
                <div className="bg-base border border-ink/10 px-4 py-3 rounded-[18px] rounded-bl-md inline-flex items-center gap-1.5">
                  {[0, 1, 2].map((n) => <span key={n} className="inline-block w-1.5 h-1.5 bg-light rounded-full animate-blink" style={{ animationDelay: `${n * 180}ms` }} />)}
                </div>
              </div>
            )}

            {error && <div className="rounded-2xl border border-red-900/15 bg-red-50 px-4 py-3"><p className="text-xs text-red-800">{error}</p></div>}
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
                disabled={busy}
                className="flex-grow resize-none text-sm bg-transparent px-2 py-2 focus:outline-none placeholder:text-light disabled:opacity-50"
                style={{ maxHeight: 96, minHeight: 38 }}
              />
              <button
                type="button"
                onClick={() => send()}
                disabled={!canSend}
                aria-label={cooldownSec > 0 ? `Bitte ${cooldownSec} Sekunden warten` : 'Nachricht senden'}
                className={`shrink-0 rounded-full flex items-center justify-center transition-colors ${
                  cooldownSec > 0 ? 'px-3 h-10 bg-surface-soft text-muted text-xs' : 'w-10 h-10 bg-ink text-white hover:bg-[#33312E] disabled:bg-ink/20 disabled:text-ink/40'
                }`}
              >
                {cooldownSec > 0 ? <span>{cooldownSec}s</span> : <span className="material-symbols-outlined text-[18px]">arrow_upward</span>}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
