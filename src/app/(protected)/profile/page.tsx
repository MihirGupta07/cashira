'use client';

import { useAuthContext } from '@/lib/AuthContext';
import { useTheme } from '@/lib/ThemeContext';
import { useCurrency } from '@/lib/CurrencyContext';
import { UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useState } from 'react';
import { CURRENCIES } from '@/lib/constants';

export default function ProfilePage() {
  const { user, signOut } = useAuthContext();
  const { colors } = useTheme();
  const { currency, setCurrency, isLoading } = useCurrency();
  const [imageError, setImageError] = useState(false);
  
  if (!user) {
    return null; // Protected route will handle this
  }

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCode = e.target.value;
    const selectedCurrency = CURRENCIES[selectedCode as keyof typeof CURRENCIES];
    if (selectedCurrency) {
      setCurrency(selectedCurrency);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className={`text-2xl font-bold ${colors.semanticColors.text.primary} mb-6`}>
        Profile
      </h1>
      
      <div className={`${colors.componentColors.card} rounded-lg p-6 mb-6`}>
        <div className="flex flex-col items-center sm:flex-row sm:items-start">
          {user.picture && !imageError ? (
            <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 sm:mb-0 sm:mr-6">
              <Image 
                src={user.picture}
                alt={user.name || 'Profile picture'} 
                fill
                sizes="(max-width: 768px) 96px, 96px"
                className="object-cover"
                onError={() => setImageError(true)}
                priority
              />
            </div>
          ) : (
            <div className={`w-24 h-24 rounded-full flex items-center justify-center ${colors.semanticColors.background.secondary} mb-4 sm:mb-0 sm:mr-6`}>
              <UserCircleIcon className={`w-20 h-20 ${colors.semanticColors.text.tertiary}`} />
            </div>
          )}
          
          <div className="text-center sm:text-left">
            <h2 className={`text-xl font-semibold ${colors.semanticColors.text.primary}`}>
              {user.name || 'User'}
            </h2>
            <p className={`${colors.semanticColors.text.tertiary} mt-1`}>
              {user.email}
            </p>
          </div>
        </div>
      </div>
      
      <div className={`${colors.componentColors.card} rounded-lg p-6 mb-6`}>
        <h3 className={`text-lg font-medium ${colors.semanticColors.text.primary} mb-4`}>
          Account Information
        </h3>
        
        <div className="space-y-4">
          <div>
            <p className={`text-sm font-medium ${colors.semanticColors.text.tertiary}`}>
              Currency
            </p>
            <div className="mt-1">
              {isLoading ? (
                <div className={`${colors.semanticColors.loading.background} animate-pulse h-10 w-full rounded-md`}></div>
              ) : (
                <select
                  value={currency.code}
                  onChange={handleCurrencyChange}
                  className={`block w-full rounded-md border-gray-300 shadow-sm ${colors.semanticColors.background.secondary} ${colors.semanticColors.text.primary} py-2 px-3`}
                >
                  {Object.entries(CURRENCIES).map(([code, currencyOption]) => (
                    <option key={code} value={code}>
                      {currencyOption.name} ({currencyOption.symbol})
                    </option>
                  ))}
                </select>
              )}
              <p className={`mt-2 text-sm ${colors.semanticColors.text.tertiary}`}>
                {isLoading 
                  ? 'Detecting your location to set currency...' 
                  : 'This currency will be used throughout the app'}
              </p>
            </div>
          </div>
          
          <div>
            <p className={`text-sm font-medium ${colors.semanticColors.text.tertiary}`}>
              Email
            </p>
            <p className={`mt-1 ${colors.semanticColors.text.secondary}`}>
              {user.email}
            </p>
          </div>
          
          <div>
            <p className={`text-sm font-medium ${colors.semanticColors.text.tertiary}`}>
              Name
            </p>
            <p className={`mt-1 ${colors.semanticColors.text.secondary}`}>
              {user.name || 'Not provided'}
            </p>
          </div>
        </div>
      </div>
      
      <div className={`flex justify-center `} onClick={() => signOut()}>
        
        
        <button
          
          className={`w-100 ${colors.componentColors.card} flex items-center justify-center p-4 rounded-md ${colors.componentColors.button.secondary} text-red-400 text-center`}
          aria-label="Logout"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
} 