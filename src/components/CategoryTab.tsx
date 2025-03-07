import React from 'react';
import { Category } from '../types';
import { useTranslation } from 'react-i18next';

interface CategoryTabProps {
  category: Category;
  isActive: boolean;
  onClick: (categoryId: string) => void;
}

const CategoryTab: React.FC<CategoryTabProps> = ({ category, isActive, onClick }) => {
  const { t } = useTranslation();
  
  return (
    <button
      className={`px-4 py-2 rounded-t-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center ${
        isActive 
          ? `${category.color} text-white` 
          : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
      }`}
      onClick={() => onClick(category.id)}
      aria-selected={isActive}
      role="tab"
    >
      {category.icon && (
        <img 
          src={category.icon} 
          alt="" 
          className="w-6 h-6 mr-2" 
          aria-hidden="true"
        />
      )}
      {t(category.name)}
    </button>
  );
};

export default CategoryTab;
