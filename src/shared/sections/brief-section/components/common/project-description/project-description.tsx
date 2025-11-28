import React from 'react'
import styles from './project-description.module.scss'

interface ProjectDescriptionProps {
  description: string
  onDescriptionChange: (description: string) => void
}

export const ProjectDescription: React.FC<ProjectDescriptionProps> = ({
  description,
  onDescriptionChange
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onDescriptionChange(e.target.value)
  }

  const wordCount = description.trim().split(/\s+/).filter(word => word.length > 0).length
  const maxWords = 500

  return (
    <div className={styles.projectDescription}>
      <h4 className={styles.sectionTitle}>Project describtion:</h4>

      <div className={styles.textareaContainer}>
        <textarea
          className={styles.textarea}
          value={description}
          onChange={handleChange}
          placeholder="Describe your project in detail... What are your goals, target audience, specific requirements, and any other relevant information?"
          rows={8}
          maxLength={3000}
        />
        <div className={styles.counter}>
          {wordCount} / {maxWords} words
          {wordCount > maxWords && (
            <span className={styles.warning}> (Exceeded limit)</span>
          )}
        </div>
      </div>
    </div>
  )
}