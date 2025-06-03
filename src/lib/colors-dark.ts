// Centralized DARK MODE color configuration for the Cashira application
// This file provides dark theme alternatives with YELLOW as the primary brand color

import { semanticColors as lightSemanticColors, componentColors as lightComponentColors, colors as lightColors } from './colors';

export const darkColors = {
  // Yellow brand colors (primary for dark mode)
  primary: {
    50: 'yellow-50',
    100: 'yellow-100',
    200: 'yellow-200',
    300: 'yellow-300',
    400: 'yellow-400',
    500: 'yellow-500',
    600: 'yellow-600',
    700: 'yellow-700',
    800: 'yellow-800',
    900: 'yellow-900',
    950: 'yellow-950',
  },

  // Dark mode gray scale (inverted from light mode)
  gray: {
    50: 'gray-900',   // Darkest for backgrounds
    100: 'gray-800',  // Dark background
    200: 'gray-700',  // Medium dark
    300: 'gray-600',  // Borders
    400: 'gray-500',  // Subtle text
    500: 'gray-400',  // Secondary text
    600: 'gray-300',  // Primary text (light)
    700: 'gray-200',  // Brighter text
    800: 'gray-100',  // Brightest
    900: 'gray-50',   // White text
  },

  // Dark mode status colors (adjusted for dark backgrounds)
  red: {
    50: 'red-950',    // Dark error backgrounds
    100: 'red-900',   // Error backgrounds
    300: 'red-700',   // Error borders
    400: 'red-600',   // Error elements
    500: 'red-500',   // Standard red
    600: 'red-400',   // Error text
    700: 'red-300',   // Bright error text
    800: 'red-200',   // Very bright error
  },

  green: {
    100: 'green-900', // Success backgrounds
    300: 'green-700', // Success borders
    500: 'green-500', // Standard green
    600: 'green-400', // Success text
    700: 'green-300', // Bright success text
  },

  // Semantic colors
  white: 'gray-900',      // Dark background instead of white
  black: 'gray-50',       // Light text instead of black
  transparent: 'transparent',
} as const;

// Dark mode semantic color mappings with YELLOW theme
export const darkSemanticColors = {
  // Background colors
  background: {
    primary: `bg-${darkColors.white}`,                    // Dark background (gray-900)
    secondary: `bg-${darkColors.gray[100]}`,              // Darker background (gray-800)
    tertiary: `bg-${darkColors.gray[200]}`,               // Medium dark background (gray-700)
    error: `bg-${darkColors.red[100]}`,                   // Dark error background
    success: `bg-${darkColors.green[100]}`,               // Dark success background
    primaryButton: `bg-${darkColors.primary[400]}`,       // Yellow button (yellow-400)
    primaryButtonHover: `bg-${darkColors.primary[300]}`,  // Brighter yellow hover (yellow-300)
    card: `bg-${darkColors.gray[100]}`,                   // Dark card background (gray-800)
    loading: `bg-${darkColors.gray[300]}`,                // Dark loading background
  },

  // Text colors
  text: {
    primary: `text-${darkColors.gray[900]}`,              // Light text (gray-50)
    secondary: `text-${darkColors.gray[700]}`,            // Medium light text (gray-200)
    tertiary: `text-${darkColors.gray[500]}`,             // Subtle light text (gray-400)
    light: `text-${darkColors.gray[400]}`,                // Very subtle text (gray-500)
    error: `text-${darkColors.red[600]}`,                 // Error text (red-400)
    success: `text-${darkColors.green[600]}`,             // Success text (green-400)
    income: `text-${darkColors.green[600]}`,              // Income text (green-400)
    expense: `text-${darkColors.red[600]}`,               // Expense text (red-400)
    brand: `text-${darkColors.primary[400]}`,             // Yellow brand text (yellow-400)
    brandActive: `text-${darkColors.primary[400]}`,       // Active yellow text (yellow-400)
    placeholder: `placeholder-${darkColors.gray[400]}`,   // Placeholder text
  },

  // Border colors
  border: {
    primary: `border-${darkColors.gray[300]}`,            // Primary border (gray-600)
    secondary: `border-${darkColors.gray[200]}`,          // Secondary border (gray-700)
    error: `border-${darkColors.red[400]}`,               // Error border
    success: `border-${darkColors.green[300]}`,           // Success border
    brand: `border-${darkColors.primary[400]}`,           // Yellow brand border (yellow-400)
    focus: `border-${darkColors.primary[400]}`,           // Yellow focus border (yellow-400)
    accent: `border-l-4 border-${darkColors.red[500]}`,   // Accent border
    transparent: `border-${darkColors.transparent}`,      // Transparent border
  },

  // Hover states
  hover: {
    background: `hover:bg-${darkColors.gray[200]}`,       // Hover background (gray-700)
    text: `hover:text-${darkColors.gray[800]}`,           // Hover text (gray-100)
    brandText: `hover:text-${darkColors.primary[300]}`,   // Hover yellow text (yellow-300)
    errorText: `hover:text-${darkColors.red[500]}`,       // Hover error text
    primaryButton: `hover:bg-${darkColors.primary[300]}`, // Yellow button hover (yellow-300)
    lightButton: `hover:bg-${darkColors.gray[200]}`,      // Light button hover
  },

  // Focus states
  focus: {
    ring: `focus:ring-${darkColors.primary[400]}`,        // Yellow focus ring (yellow-400)
    border: `focus:border-${darkColors.primary[400]}`,    // Yellow focus border (yellow-400)
    outline: 'focus:outline-none',                        // No outline
    ringOffset: 'focus:ring-2 focus:ring-offset-2',       // Ring offset
  },

  // Loading states
  loading: {
    spinner: `border-${darkColors.primary[400]}`,         // Yellow loading spinner (yellow-400)
    background: `bg-${darkColors.gray[300]}`,             // Loading background
  },
} as const;

// Pre-built dark mode component color classes with YELLOW theme
export const darkComponentColors = {
  button: {
    primary: `text-gray-900 ${darkSemanticColors.background.primaryButton} ${darkSemanticColors.hover.primaryButton} ${darkSemanticColors.border.primary} ${darkSemanticColors.focus.outline} ${darkSemanticColors.focus.ringOffset} ${darkSemanticColors.focus.ring}`,
    secondary: `${darkSemanticColors.text.secondary} ${darkSemanticColors.background.secondary} ${darkSemanticColors.hover.lightButton} ${darkSemanticColors.border.primary} ${darkSemanticColors.focus.outline} ${darkSemanticColors.focus.ringOffset} ${darkSemanticColors.focus.ring}`,
  },
  input: `${darkSemanticColors.background.secondary} ${darkSemanticColors.text.primary} ${darkSemanticColors.border.primary} ${darkSemanticColors.focus.outline} ${darkSemanticColors.focus.ring} ${darkSemanticColors.focus.border}`,
  card: `${darkSemanticColors.background.card} rounded-lg shadow border ${darkSemanticColors.border.secondary} transition-all duration-300 ease-in-out`,
  errorAlert: `${darkSemanticColors.background.error} ${darkSemanticColors.border.accent} ${darkSemanticColors.text.error}`,
  loading: `animate-spin rounded-full border-t-2 border-b-2 ${darkSemanticColors.loading.spinner}`,
} as const;

// Helper functions for dark mode
export const darkBg = (color: string) => `bg-${color}`;
export const darkText = (color: string) => `text-${color}`;
export const darkBorder = (color: string) => `border-${color}`;
export const darkHover = (type: 'bg' | 'text' | 'border', color: string) => `hover:${type}-${color}`;

// Theme-aware color selection
export type ColorMode = 'light' | 'dark';

export const getThemeColors = (mode: ColorMode) => {
  return mode === 'dark' 
    ? {
        semanticColors: darkSemanticColors,
        componentColors: darkComponentColors,
        colors: darkColors,
      }
    : {
        semanticColors: lightSemanticColors,
        componentColors: lightComponentColors, 
        colors: lightColors,
      };
};

// Export everything for easy imports
export * from './colors'; // Re-export light mode colors

// Combined theme system
export const themeColors = {
  light: {
    semanticColors: lightSemanticColors,
    componentColors: lightComponentColors,
  },
  dark: {
    semanticColors: darkSemanticColors,
    componentColors: darkComponentColors,
  },
} as const; 