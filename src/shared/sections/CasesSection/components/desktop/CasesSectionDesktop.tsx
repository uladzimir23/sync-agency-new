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
      <CasesFilter 
        filters={filters}
        onFiltersChange={updateFilters}
        className={styles.filter}
      />
      
      <div className={styles.resultsInfo}>
        <span className={styles.resultsCount}>
          {filteredCases.length} case{filteredCases.length !== 1 ? 's' : ''} found
        </span>
        {(filters.categories?.length || filters.companies?.length) && (
          <button 
            onClick={clearFilters}
            className={styles.clearFilters}
          >
            Clear filters
          </button>
        )}
      </div>

      <CasesGrid 
        cases={filteredCases} 
        layout="detailed"
        onCaseClick={handleCaseClick}
      />
    </div>
  )
}