import React, { useState, useRef } from 'react'
import { ProjectFeature } from '../../../types'
import { ServiceFeatureTooltip } from '../service-feature-tooltip/service-feature-tooltip'
import styles from './features-grid.module.scss'

interface FeaturesGridProps {
  features: ProjectFeature[]
  selectedFeatures: string[]
  onFeatureToggle: (featureId: string) => void
}

export const FeaturesGrid: React.FC<FeaturesGridProps> = ({
  features,
  selectedFeatures,
  onFeatureToggle
}) => {
  const [tooltipState, setTooltipState] = useState<{
    isVisible: boolean
    feature: ProjectFeature | null
    position: { top: number; left: number }
  }>({
    isVisible: false,
    feature: null,
    position: { top: 0, left: 0 }
  })

  const featureRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const handleFeatureMouseEnter = (feature: ProjectFeature, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setTooltipState({
      isVisible: true,
      feature,
      position: {
        top: rect.top - 10,
        left: rect.right + 10
      }
    })
  }

  const handleFeatureMouseLeave = () => {
    setTooltipState(prev => ({ ...prev, isVisible: false }))
  }

  const isFeatureSelected = (featureId: string) => 
    selectedFeatures.includes(featureId)

  return (
    
    <div className={styles.featuresGrid}>
      <h4 className={styles.sectionTitle}>What needs to be done:</h4>

      {features.map(feature => (
        
        <div
          key={feature.id}
          ref={el => featureRefs.current[feature.id] = el}
          className={`${styles.featureCard} ${isFeatureSelected(feature.id) ? styles.active : ''}`}
          onMouseEnter={(e) => handleFeatureMouseEnter(feature, e)}
          onMouseLeave={handleFeatureMouseLeave}
          onClick={() => onFeatureToggle(feature.id)}
        >
          <div className={styles.featureIcon}>
            {/* Иконка будет абсолютно позиционирована */}
          </div>
          <div className={styles.featureContent}>
            <h4 className={styles.featureTitle}>{feature.title}</h4>
            <p className={styles.featureDescription}>{feature.description}</p>
          </div>
          {isFeatureSelected(feature.id) && (
            <div className={styles.selectedBadge}>✓</div>
          )}
        </div>
      ))}
    </div>
  )
}