import React from 'react'
import { CasesGrid } from '../../../../ui/cases-grid/CasesGrid'
import { CasesFilter } from '../../../../ui/cases-filter/CasesFilter'
import { useCases } from '../../../../hooks/useCases'
import styles from './cases-section-desktop.module.scss'

export const CasesSectionDesktop: React.FC = () => {
  const { 
    filteredCases, 
    filters, 
    updateFilters, 
    selectCase,
    clearFilters 
  } = useCases()

  const handleCaseClick = (caseItem: any) => {
    selectCase(caseItem)
    // Здесь можно добавить навигацию на детальную страницу кейса
    // или открыть модальное окно
  }

  return (
    <div className={styles.casesSectionDesktop}>

      <CasesGrid 
        cases={filteredCases} 
        layout="detailed"
        onCaseClick={handleCaseClick}
      />
    </div>
  )
}