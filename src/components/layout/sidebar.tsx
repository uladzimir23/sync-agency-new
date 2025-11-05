// src/components/layout/sidebar.tsx
import React, { useState, useRef, useEffect } from 'react'
import { ButtonStack, ButtonStackItem } from '@/components/ui/button-stack'
import { cn } from '@/lib/utils'
import './sidebar.scss'

interface SidebarItem {
  id: string
  icon: React.ReactNode
  label: string
  onClick?: () => void
}

interface SidebarProps {
  items: SidebarItem[]
  defaultActiveIndex?: number
  className?: string
  collapsedWidth?: string
  expandedWidth?: string
}

const Sidebar: React.FC<SidebarProps> = ({
  items,
  defaultActiveIndex = 0,
  className,
  collapsedWidth = '100px',
  expandedWidth = '250px'
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false)
    }, 300)
  }

  const handleItemClick = (index: number, onClick?: () => void) => {
    setActiveIndex(index)
    onClick?.()
  }

  // Очистка таймаута при размонтировании
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  const showExpanded = !isCollapsed || isHovered

  return (
    <div
      ref={sidebarRef}
      className={cn(
        'sidebar',
        isCollapsed && 'sidebar--collapsed',
        showExpanded && 'sidebar--expanded',
        className
      )}
      style={{
        '--collapsed-width': collapsedWidth,
        '--expanded-width': expandedWidth,
      } as React.CSSProperties}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="sidebar__content">
        <ButtonStack
          direction="column"
          spacing={8}
          activeIndex={activeIndex}
          onActiveChange={setActiveIndex}
          className="sidebar__button-stack"
        >
          {items.map((item, index) => (
            <ButtonStackItem
              key={item.id}
              onClick={() => handleItemClick(index, item.onClick)}
              className="sidebar__item"
            >
              <div className="sidebar__item-content">
                <span className="sidebar__icon">{item.icon}</span>
                {showExpanded && (
                  <span className="sidebar__label">{item.label}</span>
                )}
              </div>
            </ButtonStackItem>
          ))}
        </ButtonStack>
      </div>
    </div>
  )
}

export { Sidebar }
export type { SidebarItem, SidebarProps }