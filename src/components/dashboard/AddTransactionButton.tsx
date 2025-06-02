'use client';

import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface AddTransactionButtonProps {
  showForm: boolean;
  onToggleForm: () => void;
}

export function AddTransactionButton({ showForm, onToggleForm }: AddTransactionButtonProps) {
  return (
    <button 
      onClick={onToggleForm}
      className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
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