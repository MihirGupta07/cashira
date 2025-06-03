// Centralized constants for the Cashira application

// Currency Constants
export const CURRENCIES = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro' },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound' },
  JPY: { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  CNY: { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  CAD: { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  NGN: { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
};

// Map countries to their currency codes
export const COUNTRY_TO_CURRENCY: { [key: string]: keyof typeof CURRENCIES } = {
  // North America
  US: 'USD',
  CA: 'CAD',
  // Europe
  GB: 'GBP',
  DE: 'EUR',
  FR: 'EUR',
  IT: 'EUR',
  ES: 'EUR',
  // Asia
  JP: 'JPY',
  CN: 'CNY',
  IN: 'INR',
  // Oceania
  AU: 'AUD',
  NZ: 'AUD',
  // Africa
  NG: 'NGN',
  // Default to USD for countries not in the list
};

export const DEFAULT_CURRENCY = CURRENCIES.USD;

// Storage Keys
export const STORAGE_KEYS = {
  CURRENCY: 'cashira_currency',
  THEME: 'cashira-theme',
};

// Theme Constants
export type ColorMode = 'light' | 'dark';

// Transaction Types
export type TransactionType = 'income' | 'expense';

// Chart Data Types
export type ChartTimeframe = 'daily' | 'weekly' | 'monthly';

// Auth Constants
export const AUTH_CONSTANTS = {
  SESSION_COOKIE_NAME: 'session',
  SESSION_EXPIRY_DAYS: 5,
  SESSION_EXPIRY_SECONDS: 60 * 60 * 24 * 5, // 5 days
};

// API Routes
export const API_ROUTES = {
  AUTH: {
    SIGNIN: '/api/auth/signin',
    SIGNOUT: '/api/auth/signout',
    ME: '/api/auth/me',
  },
  TRANSACTIONS: {
    BASE: '/api/transactions',
    BY_ID: (id: string) => `/api/transactions/${id}`,
  },
};

// Public Routes (don't require authentication)
export const PUBLIC_ROUTES = [
  '/',
  '/login',
];

// Firebase Collection Names
export const FIRESTORE_COLLECTIONS = {
  USERS: 'users',
  TRANSACTIONS: 'transactions',
};

// Re-export color constants
export * from './colors';
export * from './colors-dark'; 