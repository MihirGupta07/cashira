/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#faf7ff',
          100: '#f3edff',
          200: '#e9deff',
          300: '#d5c2ff',
          400: '#b794ff',
          500: '#9c66ff',
          600: '#8b45ff',
          700: '#7b2ff7',
          800: '#6625d4',
          900: '#5420a8',
          950: '#36126b',
        },
        purple: {
          50: '#faf7ff',
          100: '#f3edff',
          200: '#e9deff',
          300: '#d5c2ff',
          400: '#b794ff',
          500: '#9c66ff',
          600: '#8b45ff',
          700: '#7b2ff7',
          800: '#6625d4',
          900: '#5420a8',
          950: '#36126b',
        },
        violet: {
          50: '#f7f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 