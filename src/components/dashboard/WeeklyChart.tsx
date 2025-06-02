'use client';

import { useEffect, useState } from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  ChartData
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { subWeeks, startOfWeek, endOfWeek } from 'date-fns';
import { Transaction } from '@/types';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type WeeklyChartProps = {
  transactions: Transaction[];
};

type WeekData = {
  startDate: Date;
  endDate: Date;
  label: string;
  income: number;
  expense: number;
};

export function WeeklyChart({ transactions }: WeeklyChartProps) {
  const [chartData, setChartData] = useState<ChartData<'bar'> | null>(null);
  
  useEffect(() => {
    // Get the last 4 weeks
    const today = new Date();
    const weeks: WeekData[] = Array.from({ length: 4 }, (_, i) => {
      const date = subWeeks(today, 3 - i);
      const weekStart = startOfWeek(date, { weekStartsOn: 1 }); // Start on Monday
      const weekEnd = endOfWeek(date, { weekStartsOn: 1 });
      
      return {
        startDate: weekStart,
        endDate: weekEnd,
        label: `Week ${i + 1}`,
        income: 0,
        expense: 0
      };
    });
    
    // Process transactions for each week
    transactions.forEach(transaction => {
      const transactionDate = transaction.date.toDate();
      
      weeks.forEach(week => {
        if (transactionDate >= week.startDate && transactionDate <= week.endDate) {
          if (transaction.type === 'income') {
            week.income += transaction.amount;
          } else {
            week.expense += transaction.amount;
          }
        }
      });
    });
    
    // Prepare chart data
    setChartData({
      labels: weeks.map(week => week.label),
      datasets: [
        {
          label: 'Income',
          data: weeks.map(week => week.income),
          backgroundColor: 'rgba(34, 197, 94, 0.7)',
        },
        {
          label: 'Expense',
          data: weeks.map(week => week.expense),
          backgroundColor: 'rgba(239, 68, 68, 0.7)',
        }
      ]
    });
  }, [transactions]);
  
  if (!chartData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
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
        text: 'Weekly Income & Expenses (Last 4 Weeks)',
      },
    },
    scales: {
      x: {
        stacked: false,
      },
      y: {
        stacked: false
      }
    }
  };
  
  return (
    <div className="h-64">
      <Bar data={chartData} options={options} />
    </div>
  );
} 