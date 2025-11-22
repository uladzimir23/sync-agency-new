import React from 'react'
import { ButtonStack, ButtonStackItem } from '@/shared/ui/button-stack'
import { MonthSelectorProps } from '../../../types'
import styles from './month-selector.module.scss'

export const MonthSelector: React.FC<MonthSelectorProps> = ({
  months,
  selectedMonth,
  onMonthSelect,
  formatMonth,
  scrollable = false,
}) => {
  return (
    <div className={`${styles.monthSelector} ${scrollable ? styles.scrollable : ''}`}>
      <h3 className={styles.title}>Select Month</h3>
      <div className={styles.container}>
        <ButtonStack 
          direction="row" 
          spacing={8}
          activeIndex={selectedMonth}
          onActiveChange={onMonthSelect}
          className={styles.stack}
          interactionMode="click"
          rememberActive={true}
        >
          {months.map((month, index) => (
            <ButtonStackItem key={index}>
              {formatMonth(month)}
            </ButtonStackItem>
          ))}
        </ButtonStack>
      </div>
    </div>
  )
}