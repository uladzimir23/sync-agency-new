import React from 'react'
import './ProcessTimeline.scss'

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
}

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({
  title,
  subtitle,
  steps
}) => {
  return (
    <section className="process-timeline-section">
      <div className="process-timeline-container">
        <div className="process-timeline-header">
          <h2 className="process-timeline-title">{title}</h2>
          <p className="process-timeline-subtitle">{subtitle}</p>
        </div>

        <div className="process-timeline">
          {steps.map((step, index) => (
            <div key={step.step} className="process-step">
              <div className="process-step-marker">
                <div className="process-step-number">{step.step}</div>
                {index < steps.length - 1 && (
                  <div className="process-step-connector"></div>
                )}
              </div>
              
              <div className="process-step-content">
                <h3 className="process-step-title">{step.title}</h3>
                <p className="process-step-description">{step.description}</p>
                {step.duration && (
                  <span className="process-step-duration">{step.duration}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}