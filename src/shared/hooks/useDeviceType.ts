import { useState, useEffect } from 'react'

export type DeviceType = 'mobile' | 'tablet' | 'desktop'

export const useDeviceType = (): DeviceType => {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop')

  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth
      
      if (width < 768) {
        setDeviceType('mobile')
      } else if (width >= 768 && width < 1024) {
        setDeviceType('tablet')
      } else {
        setDeviceType('desktop')
      }
    }

    checkDeviceType()
    window.addEventListener('resize', checkDeviceType)
    
    return () => {
      window.removeEventListener('resize', checkDeviceType)
    }
  }, [])

  return deviceType
}