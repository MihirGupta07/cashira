import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useRouter } from 'next/navigation';
import { transactionApi, Transaction } from '@/lib/api-client';

export interface TransactionListRef {
  refresh: () => Promise<void>;
}

const TransactionList = forwardRef<TransactionListRef>(function TransactionList(props, ref) {
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const data = await transactionApi.getAll();
      setTransactions(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Expose refresh method to parent component
  useImperativeHandle(ref, () => ({
    refresh: fetchTransactions
  }));

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this transaction?')) return;
    
    try {
      await transactionApi.delete(id);
      // Remove from the local state
      setTransactions(prev => prev.filter(t => t.id !== id));
      router.refresh();
    } catch (err) {
      console.error('Error deleting transaction:', err);
      alert(err instanceof Error ? err.message : 'Failed to delete transaction');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (loading) {
    return <div className="p-4 text-center">Loading transactions...</div>;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        Error: {error}
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        No transactions found. Add your first transaction!
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="py-4 flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center">
              <span className={`w-2 h-2 rounded-full mr-2 ${
                transaction.type === 'income' ? 'bg-green-500' : 'bg-red-500'
              }`}></span>
              <h3 className="text-sm font-medium">{transaction.category}</h3>
            </div>
            <p className="text-xs text-gray-500">{formatDate(transaction.date)}</p>
            {transaction.note && <p className="text-sm text-gray-600 mt-1">{transaction.note}</p>}
          </div>
          
          <div className="flex items-center space-x-4">
            <span className={`font-medium ${
              transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
            }`}>
              {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
            </span>
            
            <button
              onClick={() => router.push(`/transactions/${transaction.id}/edit`)}
              className="text-primary-600 hover:text-primary-800"
            >
              Edit
            </button>
            
            <button
              onClick={() => handleDelete(transaction.id)}
              className="text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
});

export default TransactionList; 