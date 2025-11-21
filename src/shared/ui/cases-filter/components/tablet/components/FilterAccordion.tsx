import React from 'react'
import styles from './filter-accordion.module.scss'

interface FilterAccordionProps {
  title: string
  isExpanded: boolean
  onToggle: () => void
  children: React.ReactNode
}

export const FilterAccordion: React.FC<FilterAccordionProps> = ({
  title,
  isExpanded,
  onToggle,
  children
}) => {
  return (
    <div className={styles.filterAccordion}>
      <button 
        className={styles.accordionHeader}
        onClick={onToggle}
      >
        <span className={styles.accordionTitle}>{title}</span>
        <span className={`${styles.accordionIcon} ${isExpanded ? styles.expanded : ''}`}>
          ▼
        </span>
      </button>
      
      {isExpanded && (
        <div className={styles.accordionContent}>
          {children}
        </div>
      )}
    </div>
  )
}