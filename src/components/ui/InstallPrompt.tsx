'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useTheme } from '@/lib/ThemeContext';

// Define the BeforeInstallPromptEvent type since it's not in the default types
interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

// Extend Window interface to include MSStream property
declare global {
  interface Window {
    MSStream?: unknown;
  }
}

export function InstallPrompt() {
  const { colors } = useTheme();
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Check if it's iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // For iOS, show prompt after a delay if not installed
    if (iOS) {
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (installPrompt) {
      installPrompt.prompt();
      const choiceResult = await installPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setShowPrompt(false);
      }
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Don't show again for 24 hours
    localStorage.setItem('installPromptDismissed', Date.now().toString());
  };

  // Don't show if already installed
  if (isInstalled) {
    return null;
  }

  // Don't show if dismissed recently
  const dismissedTime = localStorage.getItem('installPromptDismissed');
  if (dismissedTime) {
    const timeDiff = Date.now() - parseInt(dismissedTime);
    const twentyFourHours = 24 * 60 * 60 * 1000;
    if (timeDiff < twentyFourHours) {
      return null;
    }
  }

  // Don't show if prompt not available
  if (!showPrompt) {
    return null;
  }

  // Show iOS-specific instructions
  if (isIOS) {
    return (
      <div className={`fixed bottom-0 left-0 right-0 ${colors.semanticColors.background.primary} p-4 shadow-lg border-t ${colors.semanticColors.border.secondary} z-50`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className={`text-sm font-medium ${colors.semanticColors.text.primary}`}>
              Install Cashira App
            </h3>
            <p className={`mt-1 text-xs ${colors.semanticColors.text.tertiary}`}>
              To install this app: tap the share button in Safari, then &ldquo;Add to Home Screen&rdquo;.
            </p>
          </div>
          <button 
            onClick={handleDismiss}
            className={`p-2 ${colors.semanticColors.text.light} ${colors.semanticColors.hover.text}`}
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  }
  
  // Show standard install banner for other devices
  return (
    <div className={`fixed bottom-0 left-0 right-0 ${colors.semanticColors.background.primary} p-4 shadow-lg border-t ${colors.semanticColors.border.secondary} z-50`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className={`text-sm font-medium ${colors.semanticColors.text.primary}`}>
            Install Cashira App
          </h3>
          <p className={`mt-1 text-xs ${colors.semanticColors.text.tertiary}`}>
            Install our app for a better experience and offline access.
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleInstallClick}
            className={`px-4 py-2 text-xs font-medium rounded-md ${colors.componentColors.button.primary}`}
          >
            Install
          </button>
          <button 
            onClick={handleDismiss}
            className={`p-2 ${colors.semanticColors.text.light} ${colors.semanticColors.hover.text}`}
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
} 
