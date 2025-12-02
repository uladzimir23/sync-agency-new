import React, { useState, useRef, useEffect } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import styles from './CollapsedSection.module.scss'

interface CollapsedSectionProps {
  title: string | React.ReactNode
  isExpanded?: boolean
  onToggle?: () => void
  disabled?: boolean
  children: React.ReactNode
  showChevron?: boolean
  forceOpen?: boolean
  className?: string
  headerClassName?: string
  contentClassName?: string
}

export const CollapsedSection: React.FC<CollapsedSectionProps> = ({
  title,
  isExpanded: controlledExpanded,
  onToggle,
  disabled = false,
  children,
  showChevron = true,
  forceOpen = false,
  className = '',
  headerClassName = '',
  contentClassName = ''
}) => {
  const [internalExpanded, setInternalExpanded] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  
  const isControlled = controlledExpanded !== undefined
  const expanded = isControlled ? controlledExpanded : internalExpanded
  const isOpen = forceOpen || expanded
  
  const handleToggle = () => {
    if (disabled) return
    
    if (isControlled && onToggle) {
      onToggle()
    } else if (!isControlled) {
      setInternalExpanded(!internalExpanded)
    }
  }

  // Анимация высоты контента
  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`
      } else {
        contentRef.current.style.maxHeight = '0px'
      }
    }
  }, [isOpen, children])

  return (
    <div 
      className={`${styles.collapsedSection} ${isOpen ? styles.expanded : ''} ${disabled ? styles.disabled : ''} ${className}`}
    >
      <div 
        className={`${styles.header} ${headerClassName}`}
        onClick={handleToggle}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-expanded={isOpen}
        aria-disabled={disabled}
      >
        <div className={styles.details}>
          <div className={styles.summary}>
            {title}
          </div>
        </div>
        
        {showChevron && !forceOpen && (
          <div className={styles.arrowWrapper}>
            <FaChevronDown 
              className={`${styles.arrow} ${isOpen ? styles.expanded : ''}`} 
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      
      <div 
        ref={contentRef}
        className={`${styles.content} ${isOpen ? styles.expanded : ''} ${contentClassName}`}
        aria-hidden={!isOpen}
      >
        {children}
      </div>
    </div>
  )
}