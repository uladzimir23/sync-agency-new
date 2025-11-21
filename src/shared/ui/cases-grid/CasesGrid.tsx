import React from 'react'
import { Case, CaseLayout } from '../../types/case.types'
import { CaseCard } from '../case-card/CaseCard'
import styles from './cases-grid.module.scss'

export interface CasesGridProps {
  cases: Case[]
  layout?: CaseLayout
  className?: string
  onCaseClick?: (caseItem: Case) => void
}

export const CasesGrid: React.FC<CasesGridProps> = ({
  cases,
  layout = 'detailed',
  className = '',
  onCaseClick
}) => {
  return (
    <div className={`${styles.casesGrid} ${styles[layout]} ${className}`}>
      {cases.map((caseItem) => (
        <CaseCard
          key={caseItem.id}
          caseItem={caseItem}
          layout={layout}
          onClick={onCaseClick}
        />
      ))}
    </div>
  )
}