import React, { useState } from 'react'
// import { CollapsedSelection } from '../../../booking-section/components/common'
import { FeaturesGrid } from '../common/features-grid/features-grid'
import { FileUpload } from '../common/file-upload/file-upload'
import { BudgetTimelineSelection } from '../common/budget-timeline-selection/budget-timeline-selection'
import { ProjectDescription } from '../common/project-description/project-description'
import { BriefTabletProps } from '../../types'
import styles from './brief-tablet.module.scss'
import { CollapsedSelection } from '@shared/ui/collapsed-selection/collapsed-selection'


export const BriefTablet: React.FC<BriefTabletProps> = ({
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
  const [leftExpanded, setLeftExpanded] = useState(true)
  const [rightExpanded, setRightExpanded] = useState(true)

  return (
    <div className={styles.tabletLayout}>
      {/* Левая колонка */}
      <div className={styles.column}>
        <CollapsedSelection
          selectedMonth={new Date()}
          selectedDate={undefined}
          selectedTime={null}
          formatMonth={() => ''}
          formatDate={() => ''}
          onExpand={() => setLeftExpanded(!leftExpanded)}
          isExpanded={leftExpanded}
          title="Project Details"
          forceTitle={true}
        >
          <div className={styles.tabletContent}>
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Service Features</h4>
              <FeaturesGrid
                features={projectFeatures}
                selectedFeatures={formData.selectedFeatures}
                onFeatureToggle={onFeatureToggle}
              />
            </div>

            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Project Description</h4>
              <ProjectDescription
                description={formData.projectDescription}
                onDescriptionChange={onProjectDescriptionChange}
              />
            </div>
          </div>
        </CollapsedSelection>
      </div>

      {/* Правая колонка */}
      <div className={styles.column}>
        <CollapsedSelection
          selectedMonth={new Date()}
          selectedDate={undefined}
          selectedTime={null}
          formatMonth={() => ''}
          formatDate={() => ''}
          onExpand={() => setRightExpanded(!rightExpanded)}
          isExpanded={rightExpanded}
          title="Budget & Files"
          forceTitle={true}
        >
          <div className={styles.tabletContent}>
            <div className={styles.section}>
              <BudgetTimelineSelection
                budgetOptions={budgetOptions}
                timelineOptions={timelineOptions}
                selectedBudget={formData.selectedBudget}
                selectedTimeline={formData.selectedTimeline}
                onBudgetSelect={onBudgetSelect}
                onTimelineSelect={onTimelineSelect}
              />
            </div>

            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Attachments</h4>
              <FileUpload
                uploadedFiles={formData.uploadedFiles}
                onFilesUpload={onFilesUpload}
              />
            </div>
          </div>
        </CollapsedSelection>
      </div>
    </div>
  )
}