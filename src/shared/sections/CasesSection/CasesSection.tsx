import React from 'react'
import { useDeviceType } from '../../hooks/useDeviceType'
import { CasesSectionDesktop } from './components/desktop/CasesSectionDesktop'
import { CasesSectionTablet } from './components/tablet/CasesSectionTablet'
import { CasesSectionMobile } from './components/mobile/CasesSectionMobile'

export const CasesSection: React.FC = () => {
  const deviceType = useDeviceType()

  switch (deviceType) {
    case 'desktop':
      return <CasesSectionDesktop />
    case 'tablet':
      return <CasesSectionTablet />
    case 'mobile':
      return <CasesSectionMobile />
    default:
      return <CasesSectionDesktop />
  }
}