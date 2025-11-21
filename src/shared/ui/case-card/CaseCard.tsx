import React from 'react'
import { Case, CaseLayout } from '../../types/case.types'
import { CaseCarousel } from '../case-carousel/CaseCarousel'
import { CaseCategory } from '../case-category/CaseCategory'
import styles from './case-card.module.scss'

export interface CaseCardProps {
  caseItem: Case
  layout?: CaseLayout
  className?: string
  onClick?: (caseItem: Case) => void
  autoPlayCarousel?: boolean
}

export const CaseCard: React.FC<CaseCardProps> = ({ 
  caseItem, 
  layout = 'detailed',
  className = '',
  onClick,
  autoPlayCarousel = false
}) => {
  const handleClick = () => {
    onClick?.(caseItem)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <div 
      className={`${styles.caseCard} ${styles[layout]} ${className}`}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      tabIndex={0}
      role="button"
      aria-label={`View ${caseItem.company} - ${caseItem.category} case study`}
    >

      <div className={styles.caseContent}>
        <div className={styles.caseMeta}>
          <span className={styles.company}>{caseItem.company}</span>
          <span className={styles.separator}>•</span>
          <CaseCategory 
            category={caseItem.category as any} 
            size={layout === 'minimal' ? 'small' : 'medium'}
          />
        </div>
        <div className={styles.caseTags}>
          {caseItem.tags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        
        <h3 className={styles.caseTitle}>{caseItem.title}</h3>
        <p className={styles.caseDescription}>{caseItem.description}</p>
        
      </div>
      <div className={styles.caseMedia}>
        <CaseCarousel 
          images={caseItem.images}
          className={styles.carousel}
          autoPlay={autoPlayCarousel}
          autoPlayInterval={4000}
        />

      </div>
      


    </div>
  )
}