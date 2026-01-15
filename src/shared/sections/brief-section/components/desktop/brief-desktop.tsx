import React, { useState } from 'react'
// import { CollapsedSelection } from '../../../booking-section/components/common'
import { BookingForm } from '../../../booking-section/components/common'
import { FeaturesGrid } from '../common/features-grid/features-grid'
import { FileUpload } from '../common/file-upload/file-upload'
import { BudgetTimelineSelection } from '../common/budget-timeline-selection/budget-timeline-selection'
import { ProjectDescription } from '../common/project-description/project-description'
import { BriefDesktopProps } from '../../types'
import styles from './brief-desktop.module.scss'
import { CollapsedSelection } from '@shared/ui/collapsed-selection/collapsed-selection'


export const BriefDesktop: React.FC<BriefDesktopProps> = ({
  briefState,
  projectFeatures,
  budgetOptions,
  timelineOptions,
  onFeatureToggle,
  onBudgetSelect,
  onTimelineSelect,
  onProjectDescriptionChange,
  onFilesUpload,
  onBriefSubmit,
  isFormValid
}) => {
  const { formData } = briefState
  
  // Состояние для управления открытыми секциями в левой колонке
  const [leftExpandedSections, setLeftExpandedSections] = useState({
    features: true,     // Первая секция открыта по умолчанию
    budget: false,
    description: false
  })

  // Функция для переключения секций (аккордеон)
  const handleLeftSectionToggle = (section: keyof typeof leftExpandedSections) => {
    setLeftExpandedSections(prev => {
      const newState = { ...prev }
      
      // Если секция уже открыта - закрываем её
      if (newState[section]) {
        newState[section] = false
      } else {
        // Закрываем все секции и открываем только выбранную
        Object.keys(newState).forEach(key => {
          newState[key as keyof typeof leftExpandedSections] = false
        })
        newState[section] = true
      }
      
      return newState
    })
  }

  return (
    <div className={styles.desktopLayout}>
      {/* Левая колонка - с аккордеоном */}
      <div className={styles.leftColumn}>
        {/* Service Features */}
        <CollapsedSelection
          selectedMonth={new Date()}
          selectedDate={undefined}
          selectedTime={null}
          formatMonth={() => ''}
          formatDate={() => ''}
          onExpand={() => handleLeftSectionToggle('features')}
          isExpanded={leftExpandedSections.features}
          title="Service Features"
          forceTitle={true}
        >
          <FeaturesGrid
            features={projectFeatures}
            selectedFeatures={formData.selectedFeatures}
            onFeatureToggle={onFeatureToggle}
          />
        </CollapsedSelection>

        {/* Budget / Timeline */}
        <CollapsedSelection
          selectedMonth={new Date()}
          selectedDate={undefined}
          selectedTime={null}
          formatMonth={() => ''}
          formatDate={() => ''}
          onExpand={() => handleLeftSectionToggle('budget')}
          isExpanded={leftExpandedSections.budget}
          title="Budget & Timeline"
          forceTitle={true}
        >
          <BudgetTimelineSelection
            budgetOptions={budgetOptions}
            timelineOptions={timelineOptions}
            selectedBudget={formData.selectedBudget}
            selectedTimeline={formData.selectedTimeline}
            onBudgetSelect={onBudgetSelect}
            onTimelineSelect={onTimelineSelect}
          />
        </CollapsedSelection>

        {/* Project Description */}
        <CollapsedSelection
          selectedMonth={new Date()}
          selectedDate={undefined}
          selectedTime={null}
          formatMonth={() => ''}
          formatDate={() => ''}
          onExpand={() => handleLeftSectionToggle('description')}
          isExpanded={leftExpandedSections.description}
          title="Project Description"
          forceTitle={true}
        >
          <ProjectDescription
            description={formData.projectDescription}
            onDescriptionChange={onProjectDescriptionChange}
          />
          <FileUpload
            uploadedFiles={formData.uploadedFiles}
            onFilesUpload={onFilesUpload}
          />
        </CollapsedSelection>
      </div>

      {/* Правая колонка - всегда открытая */}
      <div className={styles.rightColumn}>
        <CollapsedSelection
          selectedMonth={new Date()}
          selectedDate={undefined}
          selectedTime={null}
          formatMonth={() => ''}
          formatDate={() => ''}
          onExpand={() => {}} // Пустая функция - нельзя закрыть
          isExpanded={true} // Всегда открыт
          isDisabled={false}
          title="Contact Details"
          forceTitle={true}
        >
          <div className={styles.contactFormWrapper}>
            <BookingForm
              formData={{
                name: '',
                email: '',
                communicationMethod: 'telegram',
                contactId: ''
              }}
              onFormDataChange={() => {}} // Заглушка
              onSubmit={() => {}} // Заглушка
              onBack={() => {}} // Заглушка
            />
          </div>
        </CollapsedSelection>
      </div>
    </div>
  )
}