'use client';

import { useAuthContext } from '@/lib/AuthContext';
import { useTheme } from '@/lib/ThemeContext';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useState } from 'react';

export default function ProfilePage() {
  const { user } = useAuthContext();
  const { colors } = useTheme();
  const [imageError, setImageError] = useState(false);
  
  if (!user) {
    return null; // Protected route will handle this
  }

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
      
      <div className={`${colors.componentColors.card} rounded-lg p-6`}>
        <h3 className={`text-lg font-medium ${colors.semanticColors.text.primary} mb-4`}>
          Account Information
        </h3>
        
        <div className="space-y-4">
          
          
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
    </div>
  );
} 