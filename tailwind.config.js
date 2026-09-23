/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        brand: {
          dark: '#064e3b',
          primary: '#047857',
          accent: '#059669',
          light: '#ecfdf5',
          gold: '#d97706',
          goldLight: '#fef3c7',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Noto Sans Malayalam"', 'Manjari', 'system-ui', 'sans-serif'],
        malayalam: ['"Noto Sans Malayalam"', 'Manjari', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(6, 78, 59, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.02)',
        'card-hover': '0 20px 35px -8px rgba(6, 78, 59, 0.12), 0 4px 10px -2px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 25px rgba(5, 150, 105, 0.25)',
      }
    },
  },
  plugins: [],
}
