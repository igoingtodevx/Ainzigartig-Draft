/** @type {import('tailwindcss').Config} */

// Color tokens — Hex is single-source-of-truth for now.
// OKLch values show the designer's perceptual intent:
// hue + chroma + lightness, independent of display profile.
// Inspired by Perplexity DESIGN.md color documentation.
//
// To switch to terracotta accent (per Design Manifest alt), change every
// `accent` class to `accent-alt` in components. The token stays available
// for selective use (e.g. one specific Insights CTA).
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
        // Per Design Manifest
        base:         '#F0EDE3',
        surface:      '#E5E2D7',
        ink:          '#1C1917',
        muted:        '#6B6861',
        faint:        '#B8B2A7',
        // Current brand accent
        accent:       '#1B4D3E',
        'accent-mid':  '#2D7A5E',
        'accent-hover':'#163C30',
        // Alternative accent per Design Manifest option (Anwaltskanzlei alt)
        'accent-alt':  '#B44D2D',
        'accent-alt-hover': '#9A3F23',
      },
      fontFamily: {
        editorial: ['"Fraunces"', 'Georgia', 'serif'],
        body:      ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
      },
      spacing: {
        unit: '8px',
        '2u': '16px',
        '3u': '24px',
        '4u': '32px',
        '6u': '48px',
        '8u': '64px',
        '12u': '96px',
        '16u': '128px',
      },
      borderRadius: {
        DEFAULT: '2px',
      },
      keyframes: {
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'underline-in': {
          '0%': { backgroundSize: '0% 1px' },
          '100%': { backgroundSize: '100% 1px' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        reveal: 'reveal 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'underline-in': 'underline-in 0.4s cubic-bezier(0.33, 1, 0.68, 1) forwards',
        blink: 'blink 1s step-end infinite',
      },
    },
  },
  plugins: [],
};
