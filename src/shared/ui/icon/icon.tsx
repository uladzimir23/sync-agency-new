// src/components/ui/icon/icon.tsx
import React from 'react'

// Типы для иконок
export type IconName = 'calendar'


export interface IconProps {
  name: IconName
  size?: number
  className?: string
  alt?: string
}

export const Icon: React.FC<IconProps> = ({ 
  name, 
  size = 24, 
  className = '',
  alt = ''
}) => {
  // Пути к иконкам
  const iconPaths = {
    calendar: '/src/assets/svg/Iconly/Glass/Calendar.svg',
    gallery: '/src/assets/svg/Iconly/Glass/Gallery.svg',
    heart: '/src/assets/svg/Iconly/Glass/Heart.svg',
    show: '/src/assets/svg/Iconly/Glass/Show.svg',
    star: '/src/assets/svg/Iconly/Glass/Star.svg',
    video: '/src/assets/svg/Iconly/Glass/Video.svg'


  }

  return (
    <img 
      src={iconPaths[name]}
      alt={alt || `${name} icon`}
      className={`icon icon--${name} ${className}`}
      style={{ 
        width: size, 
        height: size 
      }}
    />
  )
}