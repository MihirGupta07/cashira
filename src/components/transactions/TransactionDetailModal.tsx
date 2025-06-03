'use client';

import { format } from 'date-fns';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Transaction } from '@/lib/api-client';
import { useTheme } from '@/lib/ThemeContext';
import { useCurrency } from '@/lib/CurrencyContext';
import { CATEGORY_EMOJI } from '@/lib/constants';


type TransactionDetailModalProps = {
  transaction: Transaction | null;
  onClose: () => void;
  onDelete: (id: string) => void;
};

export function TransactionDetailModal({ 
  transaction, 
  onClose,
  onDelete
}: TransactionDetailModalProps) {
  const { colors } = useTheme();
  const { formatAmount, isLoading: isCurrencyLoading } = useCurrency();
  
  if (!transaction) return null;
  
  const { id, amount, type, category, note, date, createdAt } = transaction;
  
  // Format dates
  const formattedDate = format(new Date(date), 'MMMM d, yyyy');
  const formattedCreatedAt = format(new Date(createdAt), 'MMM d, yyyy h:mm a');
  
  const isIncome = type === 'income';
  const emoji = CATEGORY_EMOJI[category] || '❓';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div 
        className={`relative w-full max-w-md rounded-lg shadow-lg ${colors.semanticColors.background.primary} p-5 max-h-[90vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className={`absolute top-3 right-3 ${colors.semanticColors.text.tertiary} hover:text-gray-700 dark:hover:text-gray-300`}
          aria-label="Close"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
        
        <div className="mb-6 text-center">
          <h2 className={`text-xl font-bold ${colors.semanticColors.text.primary}`}>
            Transaction Details
          </h2>
        </div>
        
        {/* Transaction icon and type */}
        <div className="flex items-center justify-center mb-6">
          <div className={`h-16 w-16 rounded-full flex items-center justify-center ${colors.semanticColors.background.tertiary} mb-2`}>
            <span className="text-3xl">{emoji}</span>
          </div>
        </div>
        
        <div className="text-center mb-6">
          <p className={`text-sm font-medium uppercase ${colors.semanticColors.text.secondary} mb-1`}>
            {type}
          </p>
          {isCurrencyLoading ? (
            <div className={`mx-auto h-8 w-24 ${colors.semanticColors.loading.background} rounded animate-pulse`}></div>
          ) : (
            <p className={`text-2xl font-bold ${isIncome ? colors.semanticColors.text.income : colors.semanticColors.text.expense}`}>
              {isIncome ? '+' : '-'}{formatAmount(amount)}
            </p>
          )}
        </div>
        
        {/* Transaction details */}
        <div className="space-y-4 mb-6">
          <div>
            <h3 className={`text-xs font-medium ${colors.semanticColors.text.tertiary}`}>Category</h3>
            <p className={`text-base ${colors.semanticColors.text.primary}`}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </p>
          </div>
          
          <div>
            <h3 className={`text-xs font-medium ${colors.semanticColors.text.tertiary}`}>Date</h3>
            <p className={`text-base ${colors.semanticColors.text.primary}`}>{formattedDate}</p>
            {/* <p className={`text-sm ${colors.semanticColors.text.secondary}`}>{formattedTime}</p> */}
          </div>
          
          <div>
            <h3 className={`text-xs font-medium ${colors.semanticColors.text.tertiary}`}>Note</h3>
            <p className={`text-base ${colors.semanticColors.text.primary} whitespace-pre-wrap`}>
              {note || 'No note'}
            </p>
          </div>
          
          <div>
            <h3 className={`text-xs font-medium ${colors.semanticColors.text.tertiary}`}>Created</h3>
            <p className={`text-sm ${colors.semanticColors.text.secondary}`}>{formattedCreatedAt}</p>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => onDelete(id)}
            className={`flex-1 py-2 px-4 rounded-md font-medium ${colors.semanticColors.background.error} ${colors.semanticColors.text.error} hover:opacity-90 transition-opacity`}
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className={`flex-1 py-2 px-4 rounded-md font-medium ${colors.semanticColors.background.secondary} ${colors.semanticColors.text.primary} hover:opacity-90 transition-opacity`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
} 