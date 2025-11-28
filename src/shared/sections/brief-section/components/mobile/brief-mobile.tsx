import React, { useState } from 'react'
import { CollapsedSelection } from '../../../booking-section/components/common'
import { BookingForm } from '../../../booking-section/components/common'

import { FeaturesGrid } from '../common/features-grid/features-grid'
import { FileUpload } from '../common/file-upload/file-upload'
import { BudgetTimelineSelection } from '../common/budget-timeline-selection/budget-timeline-selection'
import { ProjectDescription } from '../common/project-description/project-description'
import { BriefMobileProps } from '../../types'
import styles from './brief-mobile.module.scss'

export const BriefMobile: React.FC<BriefMobileProps> = ({
  briefState,
  projectFeatures,
  budgetOptions,
  timelineOptions,
  onFeatureToggle,
  onBudgetSelect,
  onTimelineSelect,
  onProjectDescriptionChange,
  onFilesUpload
}) => {
  const { formData } = briefState
  const [expandedSection, setExpandedSection] = useState<string | null>('features')

  const handleSectionToggle = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <div className={styles.mobileLayout}>
      {/* Service Features */}
      <CollapsedSelection
        selectedMonth={new Date()}
        selectedDate={undefined}
        selectedTime={null}
        formatMonth={() => ''}
        formatDate={() => ''}
        onExpand={() => handleSectionToggle('features')}
        isExpanded={expandedSection === 'features'}
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
        onExpand={() => handleSectionToggle('budget')}
        isExpanded={expandedSection === 'budget'}
        title="Budget / Timeline"
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
        onExpand={() => handleSectionToggle('description')}
        isExpanded={expandedSection === 'description'}
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

      <CollapsedSelection
          selectedMonth={new Date()}
          selectedDate={undefined}
          selectedTime={null}
          formatMonth={() => ''}
          formatDate={() => ''}
          onExpand={() => handleSectionToggle('details')}
          isExpanded={expandedSection === 'details'}
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
  )
}