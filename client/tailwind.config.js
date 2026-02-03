/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cronbi: {
          // Ana renkler - logoya uygun
          primary: '#1a1a1a',      // Siyah (logo)
          secondary: '#6366f1',    // Indigo (aksan)
          accent: '#10b981',       // Yeşil (ikincil aksan)
          // Arka plan renkleri
          dark: '#0a0a0a',         // Koyu mod arka plan
          'dark-secondary': '#141414',
          light: '#ffffff',        // Açık mod arka plan
          'light-secondary': '#f5f5f5',
          // Metin renkleri
          'text-dark': '#fafafa',
          'text-light': '#171717',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
