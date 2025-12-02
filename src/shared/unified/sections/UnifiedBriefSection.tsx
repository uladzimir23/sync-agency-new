import React, { useState } from 'react'
import { useUnifiedBrief } from '../hooks/use-unified-brief'
import { CollapsedSection } from '../components/forms/collapsed-section/CollapsedSection'
import { UnifiedBookingForm } from '../components/forms/booking-form/UnifiedBookingForm'
import { FeaturesGrid, BudgetTimelineSelection, FileUpload, ProjectDescription } from '@/shared/sections/brief-section/components/common'
import styles from './UnifiedBriefSection.module.scss'

interface UnifiedBriefSectionProps {
  title?: string
  subtitle?: string
  onBriefSubmit?: (data: any) => Promise<void>
  onContactSubmit?: (data: any) => Promise<void>
}

export const UnifiedBriefSection: React.FC<UnifiedBriefSectionProps> = ({
  title = 'Project Brief',
  subtitle = 'Provide details about your project to get started',
  onBriefSubmit,
  onContactSubmit
}) => {
  const {
    briefState,
    projectFeatures,
    budgetOptions,
    timelineOptions,
    handleFeatureToggle,
    handleBudgetSelect,
    handleTimelineSelect,
    handleProjectDescriptionChange,
    handleFilesUpload,
    handleFormDataChange,
    handleBriefSubmit,
    isFormValid,
    isTwoColumn,
    isAccordion
  } = useUnifiedBrief({ onBriefSubmit })

  const [expandedSections, setExpandedSections] = useState({
    features: isTwoColumn,
    budget: isTwoColumn,
    description: isTwoColumn,
    contact: isTwoColumn
  })

  const handleSectionToggle = (section: keyof typeof expandedSections) => {
    if (isTwoColumn) return // На десктопе все открыто
    
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const renderProjectDetails = () => (
    <div className={styles.projectDetails}>
      <FeaturesGrid
        features={projectFeatures}
        selectedFeatures={briefState.formData.selectedFeatures}
        onFeatureToggle={handleFeatureToggle}
      />
    </div>
  )

  const renderBudgetTimeline = () => (
    <BudgetTimelineSelection
      budgetOptions={budgetOptions}
      timelineOptions={timelineOptions}
      selectedBudget={briefState.formData.selectedBudget}
      selectedTimeline={briefState.formData.selectedTimeline}
      onBudgetSelect={handleBudgetSelect}
      onTimelineSelect={handleTimelineSelect}
    />
  )

  const renderDescriptionAndFiles = () => (
    <div className={styles.descriptionAndFiles}>
      <ProjectDescription
        description={briefState.formData.projectDescription}
        onDescriptionChange={handleProjectDescriptionChange}
      />
      <FileUpload
        uploadedFiles={briefState.formData.uploadedFiles}
        onFilesUpload={handleFilesUpload}
      />
    </div>
  )

  const renderContactForm = () => (
    <UnifiedBookingForm
      initialData={{
        name: briefState.formData.name,
        email: briefState.formData.email,
        communicationMethod: briefState.formData.communicationMethod,
        contactId: briefState.formData.contactId
      }}
      onSubmit={onContactSubmit || (async (data) => {
        handleFormDataChange(data)
        await handleBriefSubmit()
      })}
      submitText="Submit Brief"
      showCancel={false}
      disabled={!isFormValid}
    />
  )

  return (
    <section className={styles.unifiedBriefSection}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      {isTwoColumn ? (
        <div className={styles.twoColumnLayout}>
          {/* Левая колонка */}
          <div className={styles.leftColumn}>
            <CollapsedSection
              title="Service Features"
              isExpanded={true}
              forceOpen={true}
              className={styles.section}
            >
              {renderProjectDetails()}
            </CollapsedSection>

            <CollapsedSection
              title="Budget & Timeline"
              isExpanded={true}
              forceOpen={true}
              className={styles.section}
            >
              {renderBudgetTimeline()}
            </CollapsedSection>

            <CollapsedSection
              title="Project Description & Files"
              isExpanded={true}
              forceOpen={true}
              className={styles.section}
            >
              {renderDescriptionAndFiles()}
            </CollapsedSection>
          </div>

          {/* Правая колонка */}
          <div className={styles.rightColumn}>
            <CollapsedSection
              title="Contact Details"
              isExpanded={true}
              forceOpen={true}
              className={styles.section}
            >
              {renderContactForm()}
            </CollapsedSection>
          </div>
        </div>
      ) : (
        <div className={styles.singleColumnLayout}>
          <CollapsedSection
            title="Service Features"
            isExpanded={expandedSections.features}
            onToggle={() => handleSectionToggle('features')}
            className={styles.section}
          >
            {renderProjectDetails()}
          </CollapsedSection>

          <CollapsedSection
            title="Budget & Timeline"
            isExpanded={expandedSections.budget}
            onToggle={() => handleSectionToggle('budget')}
            className={styles.section}
          >
            {renderBudgetTimeline()}
          </CollapsedSection>

          <CollapsedSection
            title="Project Description & Files"
            isExpanded={expandedSections.description}
            onToggle={() => handleSectionToggle('description')}
            className={styles.section}
          >
            {renderDescriptionAndFiles()}
          </CollapsedSection>

          <CollapsedSection
            title="Contact Details"
            isExpanded={expandedSections.contact}
            onToggle={() => handleSectionToggle('contact')}
            disabled={!isFormValid}
            className={styles.section}
          >
            {renderContactForm()}
          </CollapsedSection>
        </div>
      )}
    </section>
  )
}