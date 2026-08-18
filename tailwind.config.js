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
        stake: {
          bg: '#0f212e',
          panel: '#1a2c38',
          card: '#213743',
          cardHover: '#2f4553',
          accent: '#00e701',
          accentHover: '#10ff11',
          text: '#f1f5f9',
          muted: '#b1b6c0',
          danger: '#ff334b',
        },
        mine: {
          bg: '#0f172a',
          surface: '#1e293b',
          card: '#334155',
          accent: '#f59e0b',
          danger: '#ef4444',
          success: '#22c55e',
          muted: '#64748b',
          text: '#f1f5f9',
        }
      },
      animation: {
        'pop': 'pop 0.15s ease-out',
        'shake': 'shake 0.4s ease',
        'fade-in': 'fadeIn 0.3s ease',
        'slide-down': 'slideDown 0.3s ease',
      },
      keyframes: {
        pop: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.15)' },
          '100%': { transform: 'scale(1)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-6px)' },
          '40%, 80%': { transform: 'translateX(6px)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
