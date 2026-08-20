/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './App.tsx',
    './index.tsx',
    './types.ts',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Ainzigartig visual canon — ported from marvin-brt/Ainzigartig_clean
        base: '#FAF8F5',
        surface: '#FFFFFF',
        'surface-soft': '#F3EFEA',
        ink: '#1A1918',
        muted: '#52504C',
        faint: '#7A7873',
        light: '#7A7873',
        accent: '#ECA867',
        'accent-mid': '#E3944C',
        'accent-hover': '#D9823A',
        'border-light': '#DDD8D1',

        // Compatibility aliases for older functional pages.
        // Keeping the class names avoids touching business logic while
        // making the whole app render in the current Ainzigartig identity.
        'background-dark': '#FAF8F5',
        'surface-dark': '#FFFFFF',
        'terminal-bg': '#FFFFFF',
        'terminal-border': '#DDD8D1',
        'text-primary': '#1A1918',
        'text-secondary': '#52504C',
        'neon-cyan': '#ECA867',
        'neon-pink': '#ECA867',
        'neon-yellow': '#B77A36',
        primary: '#1A1918',
        'primary-hover': '#33312E',
      },
      fontFamily: {
        editorial: ['"Newsreader"', 'Georgia', 'serif'],
        display: ['"Newsreader"', 'Georgia', 'serif'],
        body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      spacing: {
        unit: '8px',
        '1u': '8px',
        '2u': '16px',
        '3u': '24px',
        '4u': '32px',
        '6u': '48px',
        '8u': '64px',
        '12u': '96px',
        '16u': '128px',
      },
      borderRadius: {
        DEFAULT: '16px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        pill: '9999px',
      },
      boxShadow: {
        soft: '0 4px 12px rgba(26, 25, 24, 0.04)',
        card: '0 12px 32px rgba(26, 25, 24, 0.08)',
        lift: '0 20px 48px rgba(26, 25, 24, 0.12)',
      },
      keyframes: {
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(20px) scale(.99)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        reveal: 'reveal .8s cubic-bezier(.16,1,.3,1) forwards',
        marquee: 'marquee 34s linear infinite',
        blink: 'blink 1s step-end infinite',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
