'use client';

import { useEffect, useState } from 'react';
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend,
  ChartData
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Transaction } from '@/types';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

type MonthlyChartProps = {
  transactions: Transaction[];
};

type CategoryData = {
  [category: string]: number;
};

export function MonthlyChart({ transactions }: MonthlyChartProps) {
  const [chartData, setChartData] = useState<ChartData<'pie'> | null>(null);
  
  useEffect(() => {
    // Get current month transactions
    const today = new Date();
    const currentMonthTransactions = transactions.filter(transaction => {
      const transactionDate = transaction.date.toDate();
      return (
        transactionDate.getMonth() === today.getMonth() &&
        transactionDate.getFullYear() === today.getFullYear()
      );
    });
    
    // Get expenses by category
    const expensesByCategory: CategoryData = {};
    const expenseTransactions = currentMonthTransactions.filter(t => t.type === 'expense');
    
    expenseTransactions.forEach(transaction => {
      const { category, amount } = transaction;
      
      if (!expensesByCategory[category]) {
        expensesByCategory[category] = 0;
      }
      
      expensesByCategory[category] += amount;
    });
    
    // Prepare colors for each category
    const backgroundColors = [
      'rgba(255, 99, 132, 0.7)',
      'rgba(54, 162, 235, 0.7)',
      'rgba(255, 206, 86, 0.7)',
      'rgba(75, 192, 192, 0.7)',
      'rgba(153, 102, 255, 0.7)',
      'rgba(255, 159, 64, 0.7)',
      'rgba(199, 199, 199, 0.7)',
      'rgba(83, 102, 255, 0.7)',
      'rgba(40, 159, 64, 0.7)',
      'rgba(210, 199, 199, 0.7)',
      'rgba(78, 52, 199, 0.7)',
      'rgba(130, 210, 64, 0.7)',
    ];
    
    // Prepare chart data
    setChartData({
      labels: Object.keys(expensesByCategory).map(cat => 
        cat.charAt(0).toUpperCase() + cat.slice(1)
      ),
      datasets: [
        {
          label: 'Expenses by Category',
          data: Object.values(expensesByCategory),
          backgroundColor: backgroundColors.slice(0, Object.keys(expensesByCategory).length),
          borderWidth: 1,
        },
      ],
    });
  }, [transactions]);
  
  if (!chartData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
  // If no expenses, show a message
  if (chartData.labels?.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        No expense data for the current month
      </div>
    );
  }
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Monthly Expenses by Category',
      },
    },
  };
  
  return (
    <div className="h-64 flex justify-center">
      <Pie data={chartData} options={options} />
    </div>
  );
} 