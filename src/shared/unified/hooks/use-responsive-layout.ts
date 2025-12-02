import { useDeviceType } from '@/shared/hooks/useDeviceType'

export type LayoutMode = 'two-column' | 'single-column' | 'accordion'
export type DeviceBreakpoints = {
  desktop?: LayoutMode
  tablet?: LayoutMode
  mobile?: LayoutMode
}

export const useResponsiveLayout = (
  breakpoints: DeviceBreakpoints = {
    desktop: 'two-column',
    tablet: 'two-column',
    mobile: 'single-column'
  }
) => {
  const deviceType = useDeviceType()
  
  const getLayoutMode = (): LayoutMode => {
    switch (deviceType) {
      case 'desktop':
        return breakpoints.desktop || 'two-column'
      case 'tablet':
        return breakpoints.tablet || 'two-column'
      case 'mobile':
        return breakpoints.mobile || 'single-column'
      default:
        return 'single-column'
    }
  }

  const layoutMode = getLayoutMode()
  
  return {
    deviceType,
    layoutMode,
    isTwoColumn: layoutMode === 'two-column',
    isSingleColumn: layoutMode === 'single-column',
    isAccordion: layoutMode === 'accordion',
    isDesktop: deviceType === 'desktop',
    isTablet: deviceType === 'tablet',
    isMobile: deviceType === 'mobile'
  }
}