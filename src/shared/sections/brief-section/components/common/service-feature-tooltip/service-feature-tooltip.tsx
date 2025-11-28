import React from 'react'
import { ProjectFeature } from '../../../types'
import styles from './service-feature-tooltip.module.scss'

interface ServiceFeatureTooltipProps {
  feature: ProjectFeature
  isVisible: boolean
  position: { top: number; left: number }
}

export const ServiceFeatureTooltip: React.FC<ServiceFeatureTooltipProps> = ({
  feature,
  isVisible,
  position
}) => {
  if (!isVisible) return null

  return (
    <div 
      className={styles.tooltip}
      style={{
        top: position.top,
        left: position.left
      }}
    >
      <div className={styles.tooltipContent}>
        <h4 className={styles.tooltipTitle}>{feature.title}</h4>
        <p className={styles.tooltipDescription}>{feature.description}</p>
        <div className={styles.tooltipMeta}>
          <span className={styles.category}>{feature.category}</span>
        </div>
      </div>
    </div>
  )
}