import React from 'react'
import { CasesGrid } from '../../../../ui/cases-grid/CasesGrid'
import { CasesFilterMobile } from '../../../../ui/cases-filter/components/mobile/CasesFilterMobile'
import { useCases } from '../../../../hooks/useCases'
import styles from './cases-section-mobile.module.scss'

export const CasesSectionMobile: React.FC = () => {
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
    <div className={styles.casesSectionMobile}>

      <CasesGrid 
        cases={filteredCases} 
        layout="compact"
        onCaseClick={handleCaseClick}
      />
    </div>
  )
}