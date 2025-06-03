'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  CURRENCIES, 
  COUNTRY_TO_CURRENCY, 
  DEFAULT_CURRENCY, 
  STORAGE_KEYS 
} from './constants';

export type CurrencyCode = keyof typeof CURRENCIES;
export type Currency = typeof CURRENCIES[CurrencyCode];

type CurrencyContextType = {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatAmount: (amount: number) => string;
  isLoading: boolean;
};

const CurrencyContext = createContext<CurrencyContextType>({
  currency: DEFAULT_CURRENCY,
  setCurrency: () => {},
  formatAmount: () => '',
  isLoading: true,
});

export const useCurrency = () => useContext(CurrencyContext);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>(DEFAULT_CURRENCY);
  const [isLoading, setIsLoading] = useState(true);

  // Detect location and set default currency on mount
  useEffect(() => {
    const detectLocationAndSetCurrency = async () => {
      try {
        // First check if we have a saved currency preference
        const savedCurrency = localStorage.getItem(STORAGE_KEYS.CURRENCY);
        if (savedCurrency) {
          try {
            const parsedCurrency = JSON.parse(savedCurrency);
            if (parsedCurrency && parsedCurrency.code && CURRENCIES[parsedCurrency.code as CurrencyCode]) {
              setCurrency(CURRENCIES[parsedCurrency.code as CurrencyCode]);
              setIsLoading(false);
              return; // Use saved preference if available
            }
          } catch (e) {
            console.error('Error parsing saved currency', e);
          }
        }

        // If no saved preference, try to detect location
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) {
          throw new Error('Failed to fetch location data');
        }
        
        const data = await response.json();
        const countryCode = data.country_code;
        
        if (countryCode && COUNTRY_TO_CURRENCY[countryCode]) {
          const currencyCode = COUNTRY_TO_CURRENCY[countryCode];
          setCurrency(CURRENCIES[currencyCode]);
        }
      } catch (error) {
        console.error('Error detecting location:', error);
        // Fall back to default currency if location detection fails
      } finally {
        setIsLoading(false);
      }
    };

    detectLocationAndSetCurrency();
  }, []);

  // Save currency preference when it changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEYS.CURRENCY, JSON.stringify(currency));
    }
  }, [currency, isLoading]);

  // Format amount with currency symbol
  const formatAmount = (amount: number): string => {
    return `${currency.symbol}${amount.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatAmount, isLoading }}>
      {children}
    </CurrencyContext.Provider>
  );
} 