import React, { useState } from 'react'
import { CaseFilter as CaseFilterType } from '../../../../types/case.types'
import { getUniqueCategories, getUniqueCompanies } from '../../../../lib/data/casesData'
import { FilterAccordion } from './components/FilterAccordion'
import styles from './cases-filter-tablet.module.scss'

interface CasesFilterTabletProps {
  filters: CaseFilterType
  onFiltersChange: (filters: Partial<CaseFilterType>) => void
  className?: string
}

export const CasesFilterTablet: React.FC<CasesFilterTabletProps> = ({
  filters,
  onFiltersChange,
  className = ''
}) => {
  const categories = getUniqueCategories()
  const companies = getUniqueCompanies()
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['search', 'categories', 'companies'])
  )

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

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev)
      if (newSet.has(section)) {
        newSet.delete(section)
      } else {
        newSet.add(section)
      }
      return newSet
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
    <div className={`${styles.casesFilterTablet} ${className}`}>
      <div className={styles.filterHeader}>
        <h3 className={styles.filterTitle}>Filters</h3>
        {hasActiveFilters && (
          <button 
            onClick={clearAllFilters}
            className={styles.clearAllButton}
          >
            Clear All
          </button>
        )}
      </div>

      <div className={styles.filterContent}>
        {/* Поиск */}
        <FilterAccordion
          title="Search"
          isExpanded={expandedSections.has('search')}
          onToggle={() => toggleSection('search')}
        >
          <div className={styles.searchSection}>
            <input
              type="text"
              placeholder="Search cases..."
              value={filters.searchQuery || ''}
              onChange={(e) => handleSearchChange(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </FilterAccordion>

        {/* Категории */}
        <FilterAccordion
          title={`Categories ${filters.categories?.length ? `(${filters.categories.length})` : ''}`}
          isExpanded={expandedSections.has('categories')}
          onToggle={() => toggleSection('categories')}
        >
          <div className={styles.filterOptions}>
            {categories.map(category => (
              <label key={category} className={styles.filterOption}>
                <input
                  type="checkbox"
                  checked={filters.categories?.includes(category) || false}
                  onChange={() => handleCategoryToggle(category)}
                  className={styles.checkbox}
                />
                <span className={styles.optionLabel}>{category}</span>
              </label>
            ))}
          </div>
        </FilterAccordion>

        {/* Компании */}
        <FilterAccordion
          title={`Companies ${filters.companies?.length ? `(${filters.companies.length})` : ''}`}
          isExpanded={expandedSections.has('companies')}
          onToggle={() => toggleSection('companies')}
        >
          <div className={styles.filterOptions}>
            {companies.map(company => (
              <label key={company} className={styles.filterOption}>
                <input
                  type="checkbox"
                  checked={filters.companies?.includes(company) || false}
                  onChange={() => handleCompanyToggle(company)}
                  className={styles.checkbox}
                />
                <span className={styles.optionLabel}>{company}</span>
              </label>
            ))}
          </div>
        </FilterAccordion>
      </div>
    </div>
  )
}