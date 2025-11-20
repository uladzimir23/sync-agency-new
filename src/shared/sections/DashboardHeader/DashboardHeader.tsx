import React from 'react'
import './DashboardHeader.scss'

interface DashboardHeaderProps {
  title: React.ReactNode
  subtitle?: string
  className?: string
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  title, 
  subtitle,
  className = ''
}) => {
  return (
    <div className={`dashboard-header ${className}`}>
      <div className="dashboard-header__content">
        <h1 className="dashboard-header__title">{title}</h1>
        {subtitle && <p className="dashboard-header__subtitle">{subtitle}</p>}
      </div>
    </div>
  )
}