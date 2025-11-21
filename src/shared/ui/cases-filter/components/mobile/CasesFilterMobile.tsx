import React, { useState } from 'react'
import { CaseFilter as CaseFilterType } from '../../../../types/case.types'
import { getUniqueCategories, getUniqueCompanies } from '../../../../lib/data/casesData'
import styles from './cases-filter-mobile.module.scss'

interface CasesFilterMobileProps {
  filters: CaseFilterType
  onFiltersChange: (filters: Partial<CaseFilterType>) => void
  className?: string
}

export const CasesFilterMobile: React.FC<CasesFilterMobileProps> = ({
  filters,
  onFiltersChange,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false)
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

  const getActiveFiltersCount = () => {
    return (
      (filters.categories?.length || 0) +
      (filters.companies?.length || 0) +
      (filters.searchQuery ? 1 : 0)
    )
  }

  const hasActiveFilters = getActiveFiltersCount() > 0

  return (
    <div className={`${styles.casesFilterMobile} ${className}`}>
      {/* Кнопка открытия фильтра */}
      <button 
        className={styles.filterToggle}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.filterIcon}>🎛️</span>
        Filters
        {hasActiveFilters && (
          <span className={styles.filterBadge}>
            {getActiveFiltersCount()}
          </span>
        )}
      </button>

      {/* Модальное окно фильтра */}
      {isOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>Filter Cases</h3>
              <button 
                className={styles.closeButton}
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className={styles.modalBody}>
              {/* Поиск */}
              <div className={styles.searchSection}>
                <input
                  type="text"
                  placeholder="Search cases..."
                  value={filters.searchQuery || ''}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className={styles.searchInput}
                />
              </div>

              {/* Категории */}
              <div className={styles.filterSection}>
                <h4 className={styles.sectionTitle}>Categories</h4>
                <div className={styles.filterChips}>
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => handleCategoryToggle(category)}
                      className={`${styles.filterChip} ${
                        filters.categories?.includes(category) ? styles.active : ''
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Компании */}
              <div className={styles.filterSection}>
                <h4 className={styles.sectionTitle}>Companies</h4>
                <div className={styles.filterChips}>
                  {companies.map(company => (
                    <button
                      key={company}
                      onClick={() => handleCompanyToggle(company)}
                      className={`${styles.filterChip} ${
                        filters.companies?.includes(company) ? styles.active : ''
                      }`}
                    >
                      {company}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              {hasActiveFilters && (
                <button 
                  onClick={clearAllFilters}
                  className={styles.clearButton}
                >
                  Clear All
                </button>
              )}
              <button 
                onClick={() => setIsOpen(false)}
                className={styles.applyButton}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}