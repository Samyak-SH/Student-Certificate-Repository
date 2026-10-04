/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f5f6ff',
          100: '#ebedfe',
          200: '#d9dcfe',
          300: '#b5bafc',
          400: '#8d91f8',
          500: '#686cf2',
          600: '#5d5fef',
          700: '#4f50db',
          800: '#4243b8',
          900: '#383995',
        },
        primary: {
          50: '#f5f6ff',
          100: '#ebedfe',
          200: '#d9dcfe',
          300: '#b5bafc',
          400: '#8d91f8',
          500: '#5d5fef',
          600: '#4f50db',
          700: '#4243b8',
          800: '#383995',
          900: '#2d2e78',
        },
        secondary: {
          50: '#fff8ed',
          100: '#ffefd1',
          200: '#ffdca2',
          300: '#ffc466',
          400: '#fda52d',
          500: '#f59e0b',
          600: '#db7706',
          700: '#b65309',
          800: '#943f10',
          900: '#7a3610',
        },
        neutral: {
          50: '#f8f9fd',
          100: '#f3f4fa',
          200: '#e7eaf3',
          300: '#d5dae7',
          400: '#9aa2b6',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        success: {
          50: '#ecfdf5',
          500: '#10b981',
          700: '#047857',
        },
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          700: '#b45309',
        },
        error: {
          50: '#fef2f2',
          500: '#ef4444',
          700: '#b91c1c',
        }
      },
      boxShadow: {
        'card': '0 8px 24px -4px rgba(110, 120, 160, 0.08), 0 2px 6px -1px rgba(110, 120, 160, 0.04)',
        'hover': '0 16px 32px -4px rgba(93, 95, 239, 0.14), 0 4px 12px -2px rgba(93, 95, 239, 0.06)',
        'soft': '0 4px 20px -2px rgba(110, 120, 160, 0.06)',
        'brand': '0 10px 25px -3px rgba(93, 95, 239, 0.35)',
        'folder': '0 10px 25px -5px rgba(93, 95, 239, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}