// Centralized color configuration for the Cashira application
// All components should import colors from this file instead of using hardcoded values

export const colors = {
  // Violet brand colors (primary for light mode)
  primary: {
    50: 'violet-50',
    100: 'violet-100',
    200: 'violet-200',
    300: 'violet-300',
    400: 'violet-400',
    500: 'violet-500',
    600: 'violet-600',
    700: 'violet-700',
    800: 'violet-800',
    900: 'violet-900',
    950: 'violet-950',
  },

  // Gray scale
  gray: {
    50: 'gray-50',
    100: 'gray-100',
    200: 'gray-200',
    300: 'gray-300',
    400: 'gray-400',
    500: 'gray-500',
    600: 'gray-600',
    700: 'gray-700',
    800: 'gray-800',
    900: 'gray-900',
  },

  // Status colors
  red: {
    50: 'red-50',
    100: 'red-100',
    300: 'red-300',
    400: 'red-400',
    500: 'red-500',
    600: 'red-600',
    700: 'red-700',
    800: 'red-800',
  },

  green: {
    100: 'green-100',
    300: 'green-300',
    500: 'green-500',
    600: 'green-600',
    700: 'green-700',
  },

  // Semantic colors
  white: 'white',
  transparent: 'transparent',
} as const;

// Semantic color mappings for better understanding
export const semanticColors = {
  // Background colors
  background: {
    primary: `bg-${colors.white}`,
    secondary: `bg-${colors.gray[50]}`,
    tertiary: `bg-${colors.gray[100]}`,
    error: `bg-${colors.red[50]}`,
    success: `bg-${colors.green[100]}`,
    primaryButton: `bg-${colors.primary[100]}`,
    primaryButtonHover: `bg-${colors.primary[200]}`,
    card: `bg-${colors.white}`,
    loading: `bg-${colors.gray[200]}`,
  },

  // Text colors
  text: {
    primary: `text-${colors.gray[900]}`,
    secondary: `text-${colors.gray[700]}`,
    tertiary: `text-${colors.gray[500]}`,
    light: `text-${colors.gray[400]}`,
    error: `text-${colors.red[700]}`,
    success: `text-${colors.green[600]}`,
    income: `text-${colors.green[600]}`,
    expense: `text-${colors.red[600]}`,
    brand: `text-${colors.primary[600]}`,
    brandActive: `text-${colors.primary[700]}`,
    placeholder: `placeholder-${colors.gray[400]}`,
  },

  // Border colors
  border: {
    primary: `border-${colors.gray[300]}`,
    secondary: `border-${colors.gray[200]}`,
    error: `border-${colors.red[300]}`,
    success: `border-${colors.green[300]}`,
    brand: `border-${colors.primary[500]}`,
    focus: `border-${colors.primary[500]}`,
    accent: `border-l-4 border-${colors.red[500]}`,
    transparent: `border-${colors.transparent}`,
  },

  // Hover states
  hover: {
    background: `hover:bg-${colors.gray[50]}`,
    text: `hover:text-${colors.gray[700]}`,
    brandText: `hover:text-${colors.gray[700]}`,
    errorText: `hover:text-${colors.red[500]}`,
    primaryButton: `hover:bg-${colors.primary[200]}`,
    lightButton: `hover:bg-${colors.gray[50]}`,
  },

  // Focus states
  focus: {
    ring: `focus:ring-${colors.primary[500]}`,
    border: `focus:border-${colors.primary[500]}`,
    outline: 'focus:outline-none',
    ringOffset: 'focus:ring-2 focus:ring-offset-2',
  },

  // Loading states
  loading: {
    spinner: `border-${colors.primary[500]}`,
    background: `bg-${colors.gray[200]}`,
  },
} as const;

// Helper function to get background class
export const bg = (color: string) => `bg-${color}`;

// Helper function to get text class
export const text = (color: string) => `text-${color}`;

// Helper function to get border class
export const border = (color: string) => `border-${color}`;

// Helper function to get hover class
export const hover = (type: 'bg' | 'text' | 'border', color: string) => `hover:${type}-${color}`;

// Pre-built component color classes
export const componentColors = {
  button: {
    primary: `${semanticColors.text.secondary} ${semanticColors.background.primaryButton} ${semanticColors.hover.primaryButton} ${semanticColors.border.primary} ${semanticColors.focus.outline} ${semanticColors.focus.ringOffset} ${semanticColors.focus.ring}`,
    secondary: `${semanticColors.text.secondary} ${semanticColors.background.primary} ${semanticColors.hover.lightButton} ${semanticColors.border.primary} ${semanticColors.focus.outline} ${semanticColors.focus.ringOffset} ${semanticColors.focus.ring}`,
  },
  input: `${semanticColors.background.primary} ${semanticColors.text.primary} ${semanticColors.border.primary} ${semanticColors.focus.outline} ${semanticColors.focus.ring} ${semanticColors.focus.border}`,
  card: `${semanticColors.background.card} rounded-lg shadow border ${semanticColors.border.secondary} transition-all duration-300 ease-in-out`,
  errorAlert: `${semanticColors.background.error} ${semanticColors.border.accent} ${semanticColors.text.error}`,
  loading: `animate-spin rounded-full border-t-2 border-b-2 ${semanticColors.loading.spinner}`,
} as const; 