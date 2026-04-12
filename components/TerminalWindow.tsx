import React, { useState, useRef, useEffect, useCallback } from 'react';

interface ChatMessage {
  role: 'user' | 'ai' | 'system';
  content: string;
}

const MAX_WORDS = 100;
const MIN_WORDS = 2;
const MAX_SESSION_MESSAGES = 20;
const COOLDOWN_SECONDS = 5;

export const TerminalWindow: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'system',
      content: 'Willkommen bei AINZIGARTIG AI. Stelle mir Fragen über unser Unternehmen und unsere Services. Schreibe "help" für Anweisungen.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionMessageCount, setSessionMessageCount] = useState(0);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const cooldownTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Cooldown timer
  useEffect(() => {
    if (cooldownRemaining > 0) {
      cooldownTimerRef.current = setInterval(() => {
        setCooldownRemaining((prev) => {
          if (prev <= 1) {
            if (cooldownTimerRef.current) clearInterval(cooldownTimerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (cooldownTimerRef.current) clearInterval(cooldownTimerRef.current);
    };
  }, [cooldownRemaining]);

  const getWordCount = (text: string): number => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  const handleHelpCommand = useCallback(() => {
    setMessages((prev) => [
      ...prev,
      { role: 'user', content: 'help' },
      {
        role: 'system',
        content: `AINZIGARTIG AI Terminal — Hilfe
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Stelle Fragen über unsere Services, unser Team oder unsere Fähigkeiten.

Regeln:
• Fragen: ${MIN_WORDS}–${MAX_WORDS} Wörter
• Max ${MAX_SESSION_MESSAGES} Nachrichten pro Session
• ${COOLDOWN_SECONDS}s Pause zwischen Nachrichten

Beispielfragen:
• "Was bietet AINZIGARTIG an?"
• "Wie kann KI meinem Unternehmen helfen?"
• "Welche Erfahrung hat euer Team?"

Befehle:
• help  — Zeigt diese Hilfe
• clear — Löscht den Chatverlauf`,
      },
    ]);
  }, []);

  const handleClearCommand = useCallback(() => {
    setMessages([
      {
        role: 'system',
        content: 'Terminal gelöscht. Stelle mir Fragen über AINZIGARTIG.',
      },
    ]);
    setSessionMessageCount(0);
    setError(null);
  }, []);

  const sendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    // Handle special commands
    if (trimmedInput.toLowerCase() === 'help') {
      handleHelpCommand();
      setInput('');
      return;
    }
    if (trimmedInput.toLowerCase() === 'clear') {
      handleClearCommand();
      setInput('');
      return;
    }

    // Client-side validations
    setError(null);
    const wordCount = getWordCount(trimmedInput);

    if (wordCount < MIN_WORDS) {
      setError(`Bitte stelle eine vollständige Frage (mind. ${MIN_WORDS} Wörter).`);
      return;
    }
    if (wordCount > MAX_WORDS) {
      setError(`Frage zu lang. Max. ${MAX_WORDS} Wörter erlaubt (aktuell: ${wordCount}).`);
      return;
    }
    if (sessionMessageCount >= MAX_SESSION_MESSAGES) {
      setError(`Session-Limit erreicht (${MAX_SESSION_MESSAGES} Nachrichten). Schreibe "clear" für eine neue Session.`);
      return;
    }
    if (cooldownRemaining > 0) {
      setError(`Bitte warte ${cooldownRemaining} Sekunden.`);
      return;
    }

    // Add user message
    const userMessage: ChatMessage = { role: 'user', content: trimmedInput };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setSessionMessageCount((prev) => prev + 1);
    setCooldownRemaining(COOLDOWN_SECONDS);

    // Build history for context (last 4 messages, only user/ai)
    const history = messages
      .filter((m) => m.role !== 'system')
      .slice(-4)
      .map((m) => ({ role: m.role === 'user' ? 'user' : 'model', content: m.content }));

    try {
      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmedInput, history }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessages((prev) => [
          ...prev,
          { role: 'system', content: `⚠ ${data.error || 'Ein Fehler ist aufgetreten.'}` },
        ]);
      } else {
        setMessages((prev) => [...prev, { role: 'ai', content: data.response }]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'system', content: '⚠ Verbindungsfehler. Bitte überprüfe deine Internetverbindung.' },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  const wordCount = getWordCount(input);

  return (
    <div className="relative mx-auto w-full max-w-5xl text-left bg-terminal-bg rounded-lg shadow-2xl border border-gray-700 overflow-hidden transform transition-transform hover:scale-[1.005] duration-500 flex flex-col h-[500px]">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#150a26] border-b border-gray-800 shrink-0">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs text-gray-500 font-mono hidden sm:block">terminal_ai_session.sh</div>
        <div className="flex items-center space-x-2">
          <span className={`w-2 h-2 rounded-full ${isLoading ? 'bg-yellow-500' : 'bg-green-500'} animate-pulse-fast`}></span>
          <span className={`text-[10px] font-bold tracking-wider ${isLoading ? 'text-yellow-500' : 'text-green-500'}`}>
            {isLoading ? 'AI STATUS: PROCESSING' : 'AI STATUS: ONLINE'}
          </span>
        </div>
      </div>

      {/* Terminal Content */}
      <div
        ref={scrollRef}
        className="p-4 md:p-6 overflow-y-auto relative flex-grow font-mono text-sm md:text-base leading-relaxed scrollbar-hide bg-terminal-bg/95"
      >
        <div className="absolute inset-0 m-2 border border-dashed border-gray-700 pointer-events-none rounded opacity-30"></div>

        <div className="relative z-10 flex flex-col space-y-4">
          {/* Welcome header */}
          <div className="text-gray-500 text-xs mb-2">
            Session started: <span className="text-gray-400">{new Date().toLocaleString('de-DE')}</span>
            <br />
            Welcome to <span className="text-primary font-bold">AINZIGARTIG AI</span>. Type &apos;help&apos; for instructions.
          </div>

          {/* Messages */}
          {messages.map((msg, index) => {
            if (msg.role === 'user') {
              return (
                <div key={index} className="group/msg">
                  <div className="flex items-start">
                    <span className="text-neon-pink mr-3 font-bold shrink-0">root@terminal:~$</span>
                    <span className="text-gray-100">{msg.content}</span>
                  </div>
                </div>
              );
            }
            if (msg.role === 'ai') {
              return (
                <div key={index} className="group/msg mt-2 pl-4 border-l-2 border-gray-800 ml-1">
                  <div className="flex items-start mb-1">
                    <span className="text-neon-cyan font-bold mr-2 text-xs uppercase tracking-widest">
                      [AINZIGARTIG AI]
                    </span>
                  </div>
                  <div className="text-gray-300 ai-response-glow">
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              );
            }
            // system message
            return (
              <div key={index} className="text-gray-500 text-xs pl-2 border-l border-gray-700 whitespace-pre-wrap">
                {msg.content}
              </div>
            );
          })}

          {/* Loading indicator */}
          {isLoading && (
            <div className="group/msg mt-2 pl-4 border-l-2 border-gray-800 ml-1">
              <div className="flex items-start mb-1">
                <span className="text-neon-cyan font-bold mr-2 text-xs uppercase tracking-widest">
                  [AINZIGARTIG AI]
                </span>
              </div>
              <div className="text-gray-500 flex items-center gap-1">
                <span className="animate-pulse">Processing</span>
                <span className="animate-pulse delay-75">.</span>
                <span className="animate-pulse delay-150">.</span>
                <span className="animate-pulse delay-300">.</span>
              </div>
            </div>
          )}

          {/* Input line */}
          <div className="mt-2 flex items-center">
            <span className="text-neon-pink mr-3 font-bold shrink-0">root@terminal:~$</span>
            <div className="flex-grow relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setError(null);
                }}
                onKeyDown={handleKeyDown}
                placeholder={cooldownRemaining > 0 ? `Warte ${cooldownRemaining}s...` : 'Stelle eine Frage über AINZIGARTIG...'}
                disabled={isLoading}
                className="w-full bg-transparent border-none outline-none text-gray-100 font-mono placeholder-gray-600 caret-transparent disabled:opacity-50"
                autoComplete="off"
                spellCheck={false}
              />
              {!isLoading && (
                <span
                  className="absolute top-0 h-5 w-2 bg-neon-cyan animate-cursor-blink pointer-events-none"
                  style={{ left: `${input.length}ch` }}
                ></span>
              )}
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="text-red-400 text-xs pl-6">⚠ {error}</div>
          )}
        </div>
      </div>

      {/* Terminal Footer */}
      <div className="px-4 py-2 bg-[#150a26] border-t border-gray-800 flex justify-between items-center text-[10px] text-gray-500 font-mono shrink-0">
        <div className="flex space-x-4">
          <span>INTERACTIVE MODE</span>
          {cooldownRemaining > 0 && <span className="text-yellow-500">COOLDOWN: {cooldownRemaining}s</span>}
        </div>
        <div className="flex space-x-4">
          <span className={wordCount > MAX_WORDS ? 'text-red-400' : 'text-gray-500'}>
            Wörter: {wordCount} / {MAX_WORDS}
          </span>
          <span>
            Session: {sessionMessageCount} / {MAX_SESSION_MESSAGES}
          </span>
        </div>
      </div>
    </div>
  );
};