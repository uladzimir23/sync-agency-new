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
      <div className={styles.sidebar}>
        <CasesFilterTablet 
          filters={filters}
          onFiltersChange={updateFilters}
        />
      </div>
      
      <div className={styles.content}>
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
    </div>
  )
}