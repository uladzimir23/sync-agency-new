import React from 'react'
import { ButtonStack, ButtonStackItem } from '@/components/ui/button-stack'
import './SelectMonth.scss'

interface SelectMonthProps {
  months: Date[]
  selectedMonth: number
  onMonthSelect: (index: number) => void
  formatMonth: (date: Date) => string
}

export const SelectMonth: React.FC<SelectMonthProps> = ({
  months,
  selectedMonth,
  onMonthSelect,
  formatMonth,
}) => {
  return (
    <div className="select-month">
      <h3 className="select-month__title">Select Month</h3>
      <ButtonStack 
        direction="row" 
        spacing={8}
        activeIndex={selectedMonth}
        onActiveChange={onMonthSelect}
        className="select-month__stack"
      >
        {months.map((month, index) => (
          <ButtonStackItem key={index}>
            {formatMonth(month)}
          </ButtonStackItem>
        ))}
      </ButtonStack>
    </div>
  )
}