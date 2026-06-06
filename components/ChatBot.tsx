import React, { useEffect, useRef, useState } from 'react';

/* ───────────────────────────────────────────────────────────────────────────
   ChatBot — Globaler AINZIGARTIG Assistent.
   Floating button bottom-right, öffnet ein Side-Panel.
   Anwaltskanzlei-Design: Cream + Deep Green, IBM Plex Sans, keine Schatten.
   Backend: /api/chat → Gemini 2.5 Flash (mit Rate-Limit & Cooldown).
   ─────────────────────────────────────────────────────────────────────────── */

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  ts: number;
}

const SUGGESTIONS = [
  'Was macht Ainzigartig genau?',
  'Wie schnell sind erste Ergebnisse sichtbar?',
  'Was kostet eine Zusammenarbeit?',
  'Arbeitet ihr auch in der Schweiz / Österreich?',
];

const STORAGE_KEY = 'ainzigartig.chat.history.v1';

function loadHistory(): ChatMessage[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Last 12 messages max
    return parsed.slice(-12);
  } catch {
    return [];
  }
}

function saveHistory(msgs: ChatMessage[]) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(msgs.slice(-12)));
  } catch {
    // sessionStorage might be unavailable
  }
}

export const ChatBot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(loadHistory);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [cooldownUntil, setCooldownUntil] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open, busy]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      // Slight delay so the panel is visible
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open]);

  // Persist history
  useEffect(() => {
    saveHistory(messages);
  }, [messages]);

  // Cooldown ticker
  useEffect(() => {
    if (!cooldownUntil) return;
    const t = setTimeout(() => setCooldownUntil(0), cooldownUntil - Date.now());
    return () => clearTimeout(t);
  }, [cooldownUntil]);

  async function send(text?: string) {
    const message = (text ?? input).trim();
    if (!message || busy) return;
    if (Date.now() < cooldownUntil) return;

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
        // 429: enforce cooldown client-side too
        if (resp.status === 429) {
          setCooldownUntil(Date.now() + 6000);
        }
        return;
      }

      const aiText: string = data?.response || '(keine Antwort)';
      setMessages([...nextHistory, { role: 'model', content: aiText, ts: Date.now() }]);
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
      {/* Floating button */}
      <button
        type="button"
        aria-label={open ? 'Chat schließen' : 'Chat öffnen'}
        onClick={() => setOpen((o) => !o)}
        className={`fixed bottom-5 right-5 z-[60] w-12 h-12 rounded-full border transition-all duration-200 flex items-center justify-center ${
          open
            ? 'bg-ink border-ink text-base'
            : 'bg-accent border-accent text-base hover:bg-accent-mid hover:border-accent-mid'
        }`}
      >
        {open ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 3 L13 13 M13 3 L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path
              d="M3 4.5C3 3.67 3.67 3 4.5 3h9c.83 0 1.5.67 1.5 1.5v6c0 .83-.67 1.5-1.5 1.5H8l-3 3v-3H4.5C3.67 12 3 11.33 3 10.5v-6Z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-20 right-5 z-[60] w-[380px] max-w-[calc(100vw-2.5rem)] h-[560px] max-h-[calc(100vh-7rem)] bg-base border border-faint rounded shadow-[0_8px_40px_-12px_rgba(28,25,23,0.18)] flex flex-col overflow-hidden"
          role="dialog"
          aria-label="Chat mit dem AINZIGARTIG Assistenten"
        >
          {/* Header */}
          <div className="px-4u py-3u border-b border-faint/60 flex items-center justify-between">
            <div>
              <p className="text-sm font-body text-ink">Ainzigartig Assistent</p>
              <p className="text-[11px] font-body text-muted mt-1">
                Antwortet zu unseren Services und Abläufen
              </p>
            </div>
            <span className="text-[10px] font-body uppercase tracking-[0.12em] text-accent border border-accent/30 rounded-sm px-2 py-1">
              live
            </span>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-grow overflow-y-auto px-4u py-3u space-y-3u"
          >
            {messages.length === 0 && (
              <div className="space-y-3u">
                <p className="text-sm text-muted font-body leading-relaxed">
                  Hallo. Ich beantworte Fragen zu Ainzigartig — was wir machen, wie
                  wir arbeiten und was eine Zusammenarbeit kostet.
                </p>
                <div className="space-y-2u pt-2u">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      disabled={busy}
                      className="block w-full text-left text-sm text-ink font-body border border-faint/60 hover:border-accent/60 hover:bg-surface/40 rounded px-3u py-2u transition-colors duration-200 disabled:opacity-50"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[88%] text-sm font-body leading-relaxed px-3u py-2u rounded ${
                    m.role === 'user'
                      ? 'bg-accent text-base'
                      : 'bg-surface text-ink'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {busy && (
              <div className="flex justify-start">
                <div className="bg-surface text-ink text-sm font-body px-3u py-2u rounded inline-flex items-center gap-1u">
                  <span className="inline-block w-1.5 h-1.5 bg-faint rounded-full animate-blink" style={{ animationDelay: '0ms' }} />
                  <span className="inline-block w-1.5 h-1.5 bg-faint rounded-full animate-blink" style={{ animationDelay: '200ms' }} />
                  <span className="inline-block w-1.5 h-1.5 bg-faint rounded-full animate-blink" style={{ animationDelay: '400ms' }} />
                </div>
              </div>
            )}

            {error && (
              <div className="border border-faint/60 bg-surface/40 rounded px-3u py-2u">
                <p className="text-xs text-muted font-body">{error}</p>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-faint/60 px-3u py-3u">
            <div className="flex items-end gap-2u">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Frage stellen…"
                rows={1}
                disabled={busy}
                className="flex-grow resize-none text-sm font-body bg-transparent border border-faint/60 rounded px-3u py-2u focus:border-accent/60 focus:outline-none placeholder:text-faint disabled:opacity-50"
                style={{ maxHeight: 96, minHeight: 36 }}
              />
              <button
                type="button"
                onClick={() => send()}
                disabled={!canSend}
                aria-label="Nachricht senden"
                className="flex-shrink-0 w-9 h-9 bg-accent hover:bg-accent-mid disabled:bg-faint disabled:cursor-not-allowed text-base rounded flex items-center justify-center transition-colors duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7 L12 7 M8 3 L12 7 L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            {cooldownSec > 0 && (
              <p className="text-[11px] text-muted font-body mt-2u">
                Bitte {cooldownSec}s warten…
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
