'use client';

import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useTheme } from '@/lib/ThemeContext';

type AddTransactionButtonProps = {
  showForm: boolean;
  onToggleForm: () => void;
};

export function AddTransactionButton({ showForm, onToggleForm }: AddTransactionButtonProps) {
  const { colors } = useTheme();
  
  return (
    <button 
      onClick={onToggleForm}
      className={`flex items-center gap-1 py-2 px-4 rounded-md transition-colors ${colors.componentColors.button.primary}`}
    >
      {showForm ? (
        <>
          <XMarkIcon className="h-5 w-5" />
          <span>Cancel</span>
        </>
      ) : (
        <>
          <PlusIcon className="h-5 w-5" />
          <span>Add Transaction</span>
        </>
      )}
    </button>
  );
} 
