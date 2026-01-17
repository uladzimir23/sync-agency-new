import React from 'react'
import styles from './ProcessTimeline.module.scss'

interface ProcessStep {
  step: number
  title: string
  description: string
  duration?: string
}

interface ProcessTimelineProps {
  title: string
  subtitle: string
  steps: ProcessStep[]
  className?: string
}

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({
  title,
  subtitle,
  steps,
  className = ''
}) => {
  return (
    <section className={`${styles.processTimelineSection} ${className}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <h3 className={styles.subtitle}>{subtitle}</h3>
        </div>

        {steps.map((step) => (
          <div key={step.step} className={styles.stepCard}>
            <div className={styles.stepNumber}>{step.step}</div>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepDescription}>{step.description}</p>
            {step.duration && (
              <span className={styles.stepDuration}>{step.duration}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}