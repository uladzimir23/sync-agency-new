import React from 'react'
import { CaseFilter as CaseFilterType } from '../../types/case.types'
import { getUniqueCategories, getUniqueCompanies } from '../../lib/data/casesData'
import styles from './cases-filter.module.scss'

interface CasesFilterProps {
  filters: CaseFilterType
  onFiltersChange: (filters: Partial<CaseFilterType>) => void
  className?: string
}

export const CasesFilter: React.FC<CasesFilterProps> = ({
  filters,
  onFiltersChange,
  className = ''
}) => {
  const categories = getUniqueCategories()
  const companies = getUniqueCompanies()

  const handleCategoryToggle = (category: string) => {
    const currentCategories = filters.categories || []
    const newCategories = currentCategories.includes(category)
      ? currentCategories.filter(c => c !== category)
      : [...currentCategories, category]
    
    onFiltersChange({ categories: newCategories })
  }

  const handleCompanyToggle = (company: string) => {
    const currentCompanies = filters.companies || []
    const newCompanies = currentCompanies.includes(company)
      ? currentCompanies.filter(c => c !== company)
      : [...currentCompanies, company]
    
    onFiltersChange({ companies: newCompanies })
  }

  const handleSearchChange = (searchQuery: string) => {
    onFiltersChange({ searchQuery })
  }

  const clearAllFilters = () => {
    onFiltersChange({
      categories: [],
      companies: [],
      searchQuery: ''
    })
  }

  const hasActiveFilters = 
    (filters.categories && filters.categories.length > 0) ||
    (filters.companies && filters.companies.length > 0) ||
    (filters.searchQuery && filters.searchQuery.length > 0)

  return (
    <div className={`${styles.casesFilter} ${className}`}>
      <div className={styles.searchSection}>
        <input
          type="text"
          placeholder="Search cases..."
          value={filters.searchQuery || ''}
          onChange={(e) => handleSearchChange(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.filtersSection}>
        <div className={styles.filterGroup}>
          <h4 className={styles.filterTitle}>Categories</h4>
          <div className={styles.filterOptions}>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryToggle(category)}
                className={`${styles.filterOption} ${
                  filters.categories?.includes(category) ? styles.active : ''
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.filterGroup}>
          <h4 className={styles.filterTitle}>Companies</h4>
          <div className={styles.filterOptions}>
            {companies.map(company => (
              <button
                key={company}
                onClick={() => handleCompanyToggle(company)}
                className={`${styles.filterOption} ${
                  filters.companies?.includes(company) ? styles.active : ''
                }`}
              >
                {company}
              </button>
            ))}
          </div>
        </div>
      </div>

      {hasActiveFilters && (
        <div className={styles.filterActions}>
          <button 
            onClick={clearAllFilters}
            className={styles.clearButton}
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  )
}