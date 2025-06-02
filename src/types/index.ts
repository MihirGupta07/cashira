import { Timestamp } from 'firebase/firestore';

export type TransactionType = 'income' | 'expense';

export type Category = {
  id: string;
  name: string;
  icon: string; // Can be emoji or icon name
  color?: string;
};

export type Transaction = {
  id: string;
  amount: number;
  type: TransactionType;
  category: string;
  note?: string;
  date: Timestamp;
  createdAt: Timestamp;
};

// Chart data types
export type ChartTimeframe = 'daily' | 'weekly' | 'monthly';

export type ChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }[];
}; 