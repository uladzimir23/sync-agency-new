import React from 'react'
import styles from './case-category.module.scss'

export type CategoryType = 
  | 'Branding & Identity'
  | 'Marketing Strategy'
  | 'Corporate Websites'
  | 'Web Applications'
  | 'MVP Development'
  | 'Product Design'
  | 'AI'
  | 'Your Request'

export interface CaseCategoryProps {
  category: CategoryType
  className?: string
  size?: 'small' | 'medium' | 'large'
}

// Маппинг категорий к цветовым схемам
const getCategoryVariant = (category: CategoryType): string => {
  const variants: Record<CategoryType, string> = {
    'Branding & Identity': 'blue',
    'Marketing Strategy': 'red',
    'Corporate Websites': 'green',
    'Web Applications': 'orange',
    'MVP Development': 'purple',
    'Product Design': 'pink',
    'AI': 'cyan',
    'Your Request': 'yellow'
  }
  return variants[category]
}

export const CaseCategory: React.FC<CaseCategoryProps> = ({ 
  category, 
  className = '',
  size = 'medium'
}) => {
  const variant = getCategoryVariant(category)

  return (
    <span 
      className={`
        ${styles.category} 
        ${styles[variant]} 
        ${styles[size]}
        ${className}
      `}
    >
      {category}
    </span>
  )
}