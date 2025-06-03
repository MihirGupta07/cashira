'use client';

import { Category } from '@/types';
import { useTheme } from '@/lib/ThemeContext';

type CategoryGridProps = {
  categories: Category[];
  selectedCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
};

export function CategoryGrid({ 
  categories, 
  selectedCategoryId, 
  onSelectCategory 
}: CategoryGridProps) {
  const { colors } = useTheme();
  
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 transition-all duration-300 ease-in-out">
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          onClick={() => onSelectCategory(category.id)}
          className={`flex flex-col items-center justify-center p-3 h-20 rounded-lg border transition-all duration-300 ease-in-out ${
            selectedCategoryId === category.id
              ? `${colors.semanticColors.background.primaryButton} ${colors.semanticColors.border.brand}`
              : `${colors.semanticColors.background.primary} ${colors.semanticColors.border.secondary} ${colors.semanticColors.hover.background}`
          }`}
        >
          <span className="text-2xl mb-1">{category.icon}</span>
          <span className={`text-xs font-medium min-h-[1rem] ${
            selectedCategoryId === category.id 
              ? colors.semanticColors.text.primary
              : colors.semanticColors.text.secondary
          }`}>
            {category.name}
          </span>
        </button>
      ))}
    </div>
  );
} 
