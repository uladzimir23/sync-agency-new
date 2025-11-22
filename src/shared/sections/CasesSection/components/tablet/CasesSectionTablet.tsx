import React from 'react'
import { CasesGrid } from '../../../../ui/cases-grid/CasesGrid'
import { CasesFilterTablet } from '../../../../ui/cases-filter/components/tablet/CasesFilterTablet'
import { useCases } from '../../../../hooks/useCases'
import styles from './cases-section-tablet.module.scss'

export const CasesSectionTablet: React.FC = () => {
  const { 
    filteredCases, 
    filters, 
    updateFilters, 
    selectCase,
    clearFilters 
  } = useCases()

  const handleCaseClick = (caseItem: any) => {
    selectCase(caseItem)
  }

  return (
    <div className={styles.casesSectionTablet}>

      <div className={styles.content}>

        <CasesGrid 
          cases={filteredCases} 
          layout="detailed"
          onCaseClick={handleCaseClick}
        />
      </div>
    </div>
  )
}