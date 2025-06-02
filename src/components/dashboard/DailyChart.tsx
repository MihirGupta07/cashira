'use client';

import { useEffect, useState } from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  ChartData
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';
import { Transaction } from '@/types';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type DailyChartProps = {
  transactions: Transaction[];
};

type DayData = {
  date: Date;
  label: string;
  income: number;
  expense: number;
};

export function DailyChart({ transactions }: DailyChartProps) {
  const [chartData, setChartData] = useState<ChartData<'line'> | null>(null);
  
  useEffect(() => {
    // Get the last 7 days
    const today = new Date();
    const days: DayData[] = Array.from({ length: 7 }, (_, i) => {
      const date = subDays(today, 6 - i);
      return {
        date,
        label: format(date, 'EEE'),
        income: 0,
        expense: 0
      };
    });
    
    // Process transactions for each day
    transactions.forEach(transaction => {
      const transactionDate = transaction.date.toDate();
      
      days.forEach(day => {
        const startOfCurrentDay = startOfDay(day.date);
        const endOfCurrentDay = endOfDay(day.date);
        
        if (transactionDate >= startOfCurrentDay && transactionDate <= endOfCurrentDay) {
          if (transaction.type === 'income') {
            day.income += transaction.amount;
          } else {
            day.expense += transaction.amount;
          }
        }
      });
    });
    
    // Prepare chart data
    setChartData({
      labels: days.map(day => day.label),
      datasets: [
        {
          label: 'Income',
          data: days.map(day => day.income),
          borderColor: 'rgba(34, 197, 94, 1)',
          backgroundColor: 'rgba(34, 197, 94, 0.5)',
          tension: 0.3
        },
        {
          label: 'Expense',
          data: days.map(day => day.expense),
          borderColor: 'rgba(239, 68, 68, 1)',
          backgroundColor: 'rgba(239, 68, 68, 0.5)',
          tension: 0.3
        }
      ]
    });
  }, [transactions]);
  
  if (!chartData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Daily Income & Expenses (Last 7 Days)',
      },
    },
  };
  
  return (
    <div className="h-64">
      <Line data={chartData} options={options} />
    </div>
  );
} 