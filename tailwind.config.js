/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        aurora: {
          dark: {
            purple1: '#1a0b2e',
            purple2: '#2d1b4e',
          },
          teal: '#16F8B6',
          mint: '#7DF9FF',
          pink: '#FFB5E8',
          blue: '#4CC9F0',
        },
      },
      backgroundImage: {
        'aurora-gradient': 'linear-gradient(135deg, #1a0b2e 0%, #2d1b4e 25%, #16F8B6 50%, #7DF9FF 75%, #FFB5E8 100%)',
        'aurora-radial': 'radial-gradient(ellipse at center, #4CC9F0 0%, #16F8B6 30%, #2d1b4e 60%, #1a0b2e 100%)',
      },
      fontFamily: {
        handwritten: ['"Dancing Script"', 'cursive'],
      },
      animation: {
        'aurora-wave': 'aurora-wave 20s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        'aurora-wave': {
          '0%, 100%': { transform: 'translateX(0) translateY(0) scale(1)', opacity: '0.8' },
          '25%': { transform: 'translateX(20px) translateY(-20px) scale(1.1)', opacity: '1' },
          '50%': { transform: 'translateX(-20px) translateY(20px) scale(0.9)', opacity: '0.9' },
          '75%': { transform: 'translateX(10px) translateY(-10px) scale(1.05)', opacity: '0.95' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'sparkle': {
          '0%, 100%': { opacity: '0', transform: 'scale(0)' },
          '50%': { opacity: '1', transform: 'scale(1)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}

