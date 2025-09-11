/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Crimson R Games inspired color palette
        crimson: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626', // Primary crimson
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        warm: {
          orange: {
            50: '#fff7ed',
            100: '#ffedd5',
            200: '#fed7aa',
            300: '#fdba74',
            400: '#fb923c', // Accent orange
            500: '#f97316',
            600: '#ea580c',
            700: '#c2410c',
            800: '#9a3412',
            900: '#7c2d12',
            950: '#431407',
          },
          yellow: {
            50: '#fefce8',
            100: '#fef9c3',
            200: '#fef08a',
            300: '#fde047',
            400: '#fcd34d', // Accent yellow
            500: '#eab308',
            600: '#ca8a04',
            700: '#a16207',
            800: '#854d0e',
            900: '#713f12',
            950: '#422006',
          }
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'serif': ['Georgia', 'serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'inherit',
            a: {
              color: '#dc2626',
              '&:hover': {
                color: '#b91c1c',
              },
            },
          },
        },
      },
    },
  },
  plugins: [],
}