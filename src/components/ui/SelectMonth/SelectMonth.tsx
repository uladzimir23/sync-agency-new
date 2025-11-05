import React from 'react'
import { ButtonStack, ButtonStackItem } from '@/components/ui/button-stack'
import './SelectMonth.scss'

interface SelectMonthProps {
  months: Date[]
  selectedMonth: number
  onMonthSelect: (index: number) => void
  formatMonth: (date: Date) => string
  scrollable?: boolean // Новый проп для управления скроллом
}

export const SelectMonth: React.FC<SelectMonthProps> = ({
  months,
  selectedMonth,
  onMonthSelect,
  formatMonth,
  scrollable = false,
}) => {
  return (
    <div className={`select-month ${scrollable ? 'select-month--scrollable' : ''}`}>
      <h3 className="select-month__title">Select Month</h3>
      <div className="select-month__container">
        <ButtonStack 
          direction="row" 
          spacing={8}
          activeIndex={selectedMonth}
          onActiveChange={onMonthSelect}
          className="select-month__stack"
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