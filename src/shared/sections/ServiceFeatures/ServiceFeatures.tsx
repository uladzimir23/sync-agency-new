import React from 'react'
import { ServiceFeaturesDesktop } from './ServiceFeaturesDesktop'
import { ServiceFeaturesMobile } from './ServiceFeaturesMobile'
import { useMediaQuery } from '@/shared/hooks/useMediaQuery'

interface Feature {
  title: string
  description: string
  detailedDescription: string
  exampleDescription: string
  icon?: string
}

interface ServiceFeaturesProps {
  title: string
  subtitle: string
  features: Feature[]
}

export const ServiceFeatures: React.FC<ServiceFeaturesProps> = (props) => {
  const isMobile = useMediaQuery('(max-width: 768px)')

  if (isMobile) {
    return <ServiceFeaturesMobile {...props} />
  }

  return <ServiceFeaturesDesktop {...props} />
}