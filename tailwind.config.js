/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  safelist: [
    // Gray colors for backgrounds and text
    'bg-gray-50', 'bg-gray-100', 'bg-gray-200', 'bg-gray-300', 'bg-gray-400',
    'bg-gray-500', 'bg-gray-600', 'bg-gray-700', 'bg-gray-800', 'bg-gray-900',
    'text-gray-50', 'text-gray-100', 'text-gray-200', 'text-gray-300', 'text-gray-400',
    'text-gray-500', 'text-gray-600', 'text-gray-700', 'text-gray-800', 'text-gray-900',
    'border-gray-50', 'border-gray-100', 'border-gray-200', 'border-gray-300', 'border-gray-400',
    'border-gray-500', 'border-gray-600', 'border-gray-700', 'border-gray-800', 'border-gray-900',
    'hover:bg-gray-50', 'hover:bg-gray-100', 'hover:bg-gray-200', 'hover:bg-gray-700', 'hover:bg-gray-800',
    'hover:text-gray-100', 'hover:text-gray-200', 'hover:text-gray-500', 'hover:text-gray-700',
    
    // Violet colors for light mode
    'bg-violet-50', 'bg-violet-100', 'bg-violet-200', 'bg-violet-300', 'bg-violet-400',
    'bg-violet-500', 'bg-violet-600', 'bg-violet-700', 'bg-violet-800', 'bg-violet-900',
    'text-violet-50', 'text-violet-100', 'text-violet-200', 'text-violet-300', 'text-violet-400',
    'text-violet-500', 'text-violet-600', 'text-violet-700', 'text-violet-800', 'text-violet-900',
    'border-violet-50', 'border-violet-100', 'border-violet-200', 'border-violet-300', 'border-violet-400',
    'border-violet-500', 'border-violet-600', 'border-violet-700', 'border-violet-800', 'border-violet-900',
    'hover:bg-violet-50', 'hover:bg-violet-100', 'hover:bg-violet-200', 'hover:bg-violet-300',
    'hover:text-violet-600', 'hover:text-violet-700',
    'focus:ring-violet-500', 'focus:border-violet-500',
    
    // Yellow colors for dark mode
    'bg-yellow-50', 'bg-yellow-100', 'bg-yellow-200', 'bg-yellow-300', 'bg-yellow-400',
    'bg-yellow-500', 'bg-yellow-600', 'bg-yellow-700', 'bg-yellow-800', 'bg-yellow-900',
    'text-yellow-50', 'text-yellow-100', 'text-yellow-200', 'text-yellow-300', 'text-yellow-400',
    'text-yellow-500', 'text-yellow-600', 'text-yellow-700', 'text-yellow-800', 'text-yellow-900',
    'border-yellow-50', 'border-yellow-100', 'border-yellow-200', 'border-yellow-300', 'border-yellow-400',
    'border-yellow-500', 'border-yellow-600', 'border-yellow-700', 'border-yellow-800', 'border-yellow-900',
    'hover:bg-yellow-400', 'hover:bg-yellow-500', 'hover:bg-yellow-600',
    'hover:text-yellow-300', 'hover:text-yellow-400',
    'focus:ring-yellow-400', 'focus:border-yellow-400',
    
    // Red and green for status colors
    'bg-red-50', 'bg-red-100', 'bg-red-900', 'bg-red-950',
    'text-red-300', 'text-red-400', 'text-red-600', 'text-red-700',
    'border-red-300', 'border-red-400', 'border-red-500', 'border-red-700',
    'hover:text-red-500',
    'bg-green-100', 'bg-green-900',
    'text-green-300', 'text-green-400', 'text-green-600',
    'border-green-300', 'border-green-700',
    
    // Placeholder and utility classes
    'placeholder-gray-400', 'placeholder-gray-500',
    'bg-white', 'bg-transparent', 'border-transparent',
    'ring-violet-500', 'ring-yellow-400',
    'focus:ring-2', 'focus:ring-offset-2', 'focus:outline-none',
  ],
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
        yellow: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
          950: '#422006',
        },
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 