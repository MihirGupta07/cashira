'use client';

import { Category } from '@/types';

type CategoryGridProps = {
  categories: Category[];
  selectedCategoryId: string;
  onSelectCategory: (id: string) => void;
};

export function CategoryGrid({ 
  categories, 
  selectedCategoryId, 
  onSelectCategory 
}: CategoryGridProps) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          onClick={() => onSelectCategory(category.id)}
          className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
            selectedCategoryId === category.id
              ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-400 dark:border-blue-700'
              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          <span className="text-2xl mb-1">{category.icon}</span>
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
            {category.name}
          </span>
        </button>
      ))}
    </div>
  );
} 