/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#030303',
        surface: '#0a0a0a',
        accent: '#5b9eff',
        accent2: '#ffb454',
        purple: '#7c3aed',
        cyan: '#22d3ee',
        muted: 'rgba(255,255,255,0.45)',
        line: 'rgba(255,255,255,0.08)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
