/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'slate': {
          '50': '#f8fafc',
          '900': '#0f172a',
        },
        'cool-gray': '#f8fafc',
        'muted': '#475569',
        'solar-amber': '#f59e0b',
        'refined-gold': '#d4af37',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        'safe': 'clamp(1rem, 5vw, 3rem)',
      },
      lineHeight: {
        'relaxed': '1.625',
      }
    },
  },
  plugins: [],
};
