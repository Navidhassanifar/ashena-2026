/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Vazirmatn', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#e8460a',
          dark: '#c03908',
          light: '#ff7b36',
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        ink: {
          primary: '#1a1916',
          secondary: '#5c5a55',
          muted: '#9b9890',
          disabled: '#c8c6bf',
        },
        surface: {
          0: '#fcfaf6',
          1: '#f8f7f4',
          2: '#f3f1ec',
          3: '#ecebe6',
        },
        danger: {
          bg: '#fcebeb',
          border: '#f7c1c1',
          text: '#791f1f',
        },
        verified: {
          bg: '#eaf3de',
          border: '#c0dd97',
          text: '#27500a',
        },
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      },
      boxShadow: {
        card: '0 2px 16px rgba(15, 23, 42, 0.06)',
        'card-hover': '0 8px 28px rgba(15, 23, 42, 0.1)',
        modal: '0 -8px 40px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.06)',
        brand: '0 10px 28px rgba(232, 70, 10, 0.22)',
      },
      animation: {
        'fade-in': 'fadeIn 0.24s ease-out',
        'slide-up': 'slideUp 0.28s ease-out',
        'sheet-up': 'sheetUp 0.32s cubic-bezier(0.32, 0.72, 0, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        sheetUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
