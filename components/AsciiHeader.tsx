import React, { useState, useEffect, useRef, useCallback } from 'react';

/* ── ASCII art lines (plain, no JSX) ── */
const ASCII_LINES = [
  `     .::::'   '::' .::.  ::' ':::::' '::'   .:;;'     '::::.  .:::'''   ':::::::.'::'   .:;;:.`,
  `     0WWWWW: 'NWWK kWWN.:WWN.KMMWWWX'NWWX 'ONMWWWXd  cWWWWWk  xWWWWWWXl'WMWWWWMMcOWWW' xNWWWWNk.`,
  `    'WMWNMMd 'WMMK kMMMk;MMN.;lkMMMK.NMMX kMMM;kMMM: kMMWWMN. xMMMlkMMW'llNMMWol'0MMW'cMMMdoMMMo`,
  `    cMMNkMMK .WMMK kMMMWkWMN.  XMMW: NMMX OMMW';ddd' XMMkXMM; xMMMoOMWX.  KMMN.  0MMW'oMMMl'ddd;`,
  `    kMM0;MMW'.WMMK kMMWMMWMN. xMMMd .NMMX OMMWl0000:'WMW;0MMx xMMMNWMXl   KMMN.  0MMW'oMMMdO000l`,
  `    XMMKdWMMl.WMMK kMM0XMMMN :WMM0  .NMMX OMMW:kMMM;lMMWdKMMX xMMMcxMMN.  KMMN.  0MMW'oMMMllMMMx`,
  `   :WMMWXWMMO.WMMK kMMxlMMMN.KMMMxlc.NMMX kMMM;dMMM;kMMMNNMMW'xMMM;dMMW'  KMMN.  0MMW'lMMMdcMMMx`,
  `   lWWWx KWWN:NWWK kWWx 0WWN;WWWWMMN'NWWX '0WMWNXWWlXWWN.lWWWoxWWW;dWWW.  KWWN.  0WWW' kNMWWXWWd`,
  `   .:::. '::: '::' .::. .::' ':::::' '::'   ';;' ::.'::'  :::..::: .::'   '::'   '::'   .:;: ':.`,
];

/* Characters used for the scramble effect */
const GLITCH_CHARS = `MWNXKOkdxolc;:'.0 `;

/* Positions that get a permanent neon accent color */
const ACCENT_MAP: Record<string, 'cyan' | 'pink' | 'yellow'> = {
  '1-5':   'yellow', // 0
  '1-31':  'pink',   // K
  '1-73':  'cyan',   // W
  '2-22':  'pink',   // M
  '2-93':  'cyan',   // c
  '3-4':   'cyan',   // c
  '4-47':  'yellow', // x
  '5-64':  'pink',   // c
  '6-23':  'cyan',   // x
  '7-61':  'yellow', // x
};

const COLORS = {
  cyan:   'rgb(0, 255, 255)',
  pink:   'rgb(255, 0, 255)',
  yellow: 'rgb(255, 255, 0)',
};

const randChar = () => GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];

export const AsciiHeader: React.FC = () => {
  const width = Math.max(...ASCII_LINES.map(l => l.length));
  const totalCells = ASCII_LINES.length * width;

  /* Each cell: { resolved: boolean } — we animate column-by-column */
  const [revealCol, setRevealCol] = useState(-1);
  const [tick, setTick] = useState(0); // drives scramble re-renders
  const [shimmerCells, setShimmerCells] = useState<Set<string>>(new Set());
  const revealed = useRef(false);
  const frameRef = useRef<number>(0);

  /* ── Phase 1: Scramble reveal, sweeping left→right ── */
  useEffect(() => {
    let col = -1;
    const step = () => {
      col += 2; // reveal 2 columns per frame for speed
      if (col >= width) {
        revealed.current = true;
        setRevealCol(width);
        return;
      }
      setRevealCol(col);
      setTick(t => t + 1);
      frameRef.current = requestAnimationFrame(step);
    };
    // Small delay before starting
    const timeout = setTimeout(() => {
      frameRef.current = requestAnimationFrame(step);
    }, 300);
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frameRef.current);
    };
  }, [width]);

  /* ── Phase 2: Ongoing shimmer — random cells briefly flash a neon color ── */
  useEffect(() => {
    if (!revealed.current) return;
    const interval = setInterval(() => {
      const next = new Set<string>();
      // Pick 3-6 random non-space cells to shimmer
      const count = 3 + Math.floor(Math.random() * 4);
      for (let i = 0; i < count; i++) {
        const row = Math.floor(Math.random() * ASCII_LINES.length);
        const col = Math.floor(Math.random() * ASCII_LINES[row].length);
        if (ASCII_LINES[row][col] !== ' ') {
          next.add(`${row}-${col}`);
        }
      }
      setShimmerCells(next);
    }, 150);
    return () => clearInterval(interval);
  }, [revealCol]);

  /* ── Render each character ── */
  const renderAscii = useCallback(() => {
    return ASCII_LINES.map((line, row) => {
      const chars: React.ReactNode[] = [];
      for (let col = 0; col < line.length; col++) {
        const ch = line[col];
        const key = `${row}-${col}`;
        const isRevealed = col <= revealCol;
        const accent = ACCENT_MAP[key];
        const isShimmer = shimmerCells.has(key);

        let displayChar = ch;
        let color: string | undefined;
        let textShadow: string | undefined;

        if (!isRevealed) {
          // Still scrambling — show random char or blank
          if (ch === ' ') {
            displayChar = ' ';
          } else if (col <= revealCol + 8) {
            // "wavefront" zone — scramble chars
            displayChar = randChar();
            const colors = [COLORS.cyan, COLORS.pink, COLORS.yellow];
            color = colors[Math.floor(Math.random() * 3)];
          } else {
            displayChar = ' ';
          }
        } else {
          // Revealed
          if (accent) {
            color = COLORS[accent];
            textShadow = `0 0 6px ${color}`;
          } else if (isShimmer) {
            const colors = [COLORS.cyan, COLORS.pink, COLORS.yellow];
            color = colors[Math.floor(Math.random() * 3)];
            textShadow = `0 0 4px ${color}`;
          }
        }

        chars.push(
          <span
            key={key}
            style={{ color, textShadow, transition: isRevealed ? 'color 0.3s' : undefined }}
          >
            {displayChar}
          </span>
        );
      }
      return <React.Fragment key={row}>{chars}{'\n'}</React.Fragment>;
    });
  }, [revealCol, tick, shimmerCells]);

  return (
    <div className="mb-20 md:mb-28 select-none relative group cursor-default">
      <pre className="font-mono text-[3px] sm:text-[5px] md:text-[7px] lg:text-[9px] xl:text-[10px] leading-[1.15] text-gray-600 whitespace-pre overflow-hidden inline-block text-left">
        {renderAscii()}
      </pre>

      <h1 className="mt-8 md:mt-16 text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase font-display px-4 leading-tight">
        Bereit für eine Zukunft<br />
        <span className="text-neon-cyan text-glow-cyan">mit generativer KI?</span>
      </h1>
      <p className="mt-6 text-base md:text-lg text-gray-400 max-w-6xl mx-auto px-4">
        Ainzigartig hilft kleinen und mittelständischen Unternehmen dabei, künstliche Intelligenz sinnvoll einzusetzen – mit konkreten Anwendungsfällen, die wirklich funktionieren, und einer Beratung, die auf Augenhöhe stattfindet.
      </p>

      {/* CTA Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
        <a
          href="#"
          className="inline-flex items-center gap-2 px-8 py-3 text-sm font-bold uppercase tracking-wider bg-primary text-white border-2 border-primary hover:bg-primary-hover shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 font-mono"
        >
          Kostenloses Erstgespräch buchen
          <span className="material-symbols-outlined text-base">calendar_month</span>
        </a>
        <a
          href="#"
          className="inline-flex items-center gap-2 px-8 py-3 text-sm font-bold uppercase tracking-wider text-neon-cyan border-2 border-neon-cyan/40 hover:border-neon-cyan hover:bg-neon-cyan/5 transition-all duration-200 font-mono"
        >
          Demo ansehen
        </a>
      </div>

      {/* Trust Badges */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4">
        {[
          'DSGVO Konform',
          'Made in Germany',
          'Technische Expertise',
        ].map((badge) => (
          <span key={badge} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 font-mono">
            <span className="material-symbols-outlined text-neon-cyan text-base">check_circle</span>
            {badge}
          </span>
        ))}
      </div>
    </div>
  );
};