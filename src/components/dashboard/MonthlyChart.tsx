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
import { Spinner } from '../ui/Spinner';

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
  const [showLegend, setShowLegend] = useState(true);
  
  useEffect(() => {
    // Check window width for responsive legend display
    const handleResize = () => {
      setShowLegend(window.innerWidth > 768);
    };
    
    // Initial check
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
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
        <Spinner size="medium" />
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
    maintainAspectRatio: true,
    aspectRatio: 1,
    plugins: {
      legend: {
        position: 'right' as const,
        display: showLegend,
      },
      title: {
        display: true,
        text: 'Monthly Expenses by Category',
      },
    },
  };
  
  return (
    <div className="w-full h-64 md:h-80 flex items-center justify-center overflow-hidden">
      <div className="w-full flex flex-col md:flex-row items-center justify-center">
        <div className="relative w-full max-w-[200px] h-[200px] md:h-[250px] md:max-w-[250px]">
          <Pie data={chartData} options={options} />
        </div>
        {!showLegend && chartData.labels && (
          <div className="mt-4 md:mt-0 text-sm grid grid-cols-2 gap-2">
            {chartData.labels.map((label, index) => {
              // Get background color safely
              const bgColors = chartData.datasets[0].backgroundColor;
              let bgColor = 'rgba(200, 200, 200, 0.7)'; // Default fallback color
              
              if (Array.isArray(bgColors) && bgColors[index]) {
                bgColor = bgColors[index] as string;
              }
              
              return (
                <div key={String(label)} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: bgColor }}
                  />
                  <span>{String(label)}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
} 
