import React from 'react'
import { useDeviceType } from '@/shared/hooks/useDeviceType'
import { useBrief } from './components/hooks/use-brief'
import { BriefDesktop } from './components/desktop/brief-desktop'
import { BriefTablet } from './components/tablet/brief-tablet'
import { BriefMobile } from './components/mobile/brief-mobile'
import styles from './brief-section.module.scss'

export const BriefSection: React.FC = () => {
  const deviceType = useDeviceType()
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
    handleBriefSubmit,
    isFormValid
  } = useBrief()

  const commonProps = {
    briefState,
    projectFeatures,
    budgetOptions,
    timelineOptions,
    onFeatureToggle: handleFeatureToggle,
    onBudgetSelect: handleBudgetSelect,
    onTimelineSelect: handleTimelineSelect,
    onProjectDescriptionChange: handleProjectDescriptionChange,
    onFilesUpload: handleFilesUpload,
    onBriefSubmit: handleBriefSubmit,
    isFormValid
  }

  const renderContent = () => {
    switch (deviceType) {
      case 'desktop':
        return <BriefDesktop {...commonProps} />
      case 'tablet':
        return <BriefTablet {...commonProps} />
      case 'mobile':
        return <BriefMobile {...commonProps} />
      default:
        return <BriefDesktop {...commonProps} />
    }
  }

  return (
    <section className={styles.briefSection}>
      <div className={styles.header}>
        <h1 className={styles.title}>Project Brief</h1>
        <p className={styles.subtitle}>
          Provide details about your project to get started
        </p>
        <button 
          className={styles.submitButton}
          onClick={handleBriefSubmit}
          disabled={!isFormValid}
        >
          Submit Brief
        </button>
      </div>
      
      {renderContent()}
    </section>
  )
}