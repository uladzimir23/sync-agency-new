import React from 'react'
import { BudgetOption, TimelineOption } from '../../../types'
import styles from './budget-timeline-selection.module.scss'

interface BudgetTimelineSelectionProps {
  budgetOptions: BudgetOption[]
  timelineOptions: TimelineOption[]
  selectedBudget: string | null
  selectedTimeline: string | null
  onBudgetSelect: (budgetValue: string) => void
  onTimelineSelect: (timelineValue: string) => void
}

export const BudgetTimelineSelection: React.FC<BudgetTimelineSelectionProps> = ({
  budgetOptions,
  timelineOptions,
  selectedBudget,
  selectedTimeline,
  onBudgetSelect,
  onTimelineSelect
}) => {
  return (
    <div className={styles.budgetTimelineSelection}>
      <div className={styles.section}>
        
      <div className={styles.sectionTitleWrapper}>
        <div className={styles.blurBackground}></div> {/* Новый div для блюра */}
        <h4 className={styles.sectionTitle}>Budget of your project:</h4>
      </div>

        <div className={styles.optionsGrid}>
          {budgetOptions.map(option => (
            <div
              key={option.id}
              className={`${styles.option} ${selectedBudget === option.value ? styles.selected : ''}`}
              onClick={() => onBudgetSelect(option.value)}
            >
              <span className={styles.optionLabel}>{option.label}</span>
            </div>
          ))}
        </div>
      </div>


      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Timeline of your project:</h4>
        <div className={styles.optionsGrid}>
          {timelineOptions.map(option => (
            <div
              key={option.id}
              className={`${styles.option} ${selectedTimeline === option.value ? styles.selected : ''}`}
              onClick={() => onTimelineSelect(option.value)}
            >
              <span className={styles.optionLabel}>{option.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Budget of your project:</h4>
        <div className={styles.optionsGrid}>
          {budgetOptions.map(option => (
            <div
              key={option.id}
              className={`${styles.option} ${selectedBudget === option.value ? styles.selected : ''}`}
              onClick={() => onBudgetSelect(option.value)}
            >
              <span className={styles.optionLabel}>{option.label}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}