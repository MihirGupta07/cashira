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
    // Check if prompt was already dismissed in this session
    const promptDismissed = sessionStorage.getItem('installPromptDismissed');
    if (promptDismissed) {
      return;
    }

    // Check if app is already installed
    if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Check if it's iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);
    
    // Show the prompt
    setShowPrompt(true);

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

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
        sessionStorage.setItem('installPromptDismissed', 'true');
      }
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem('installPromptDismissed', 'true');
  };

  // Don't show if already installed
  if (isInstalled) {
    return null;
  }

  // Don't show if prompt not available
  if (!showPrompt) {
    return null;
  }

  // Show iOS-specific instructions
  if (isIOS) {
    return (
      <div className="fixed inset-x-4 top-20 mx-auto max-w-md rounded-lg shadow-lg z-50 overflow-hidden">
        <div className={`${colors.semanticColors.background.primary} p-4 border ${colors.semanticColors.border.secondary}`}>
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
      </div>
    );
  }
  
  // Show standard install banner for other devices
  return (
    <div className="fixed inset-x-4 top-20 mx-auto max-w-md rounded-lg shadow-lg z-50 overflow-hidden">
      <div className={`${colors.semanticColors.background.primary} p-4 border ${colors.semanticColors.border.secondary}`}>
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
    </div>
  );
} 
