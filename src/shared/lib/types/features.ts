// src/shared/lib/types/features.ts
import { featuresData } from '../data/featuresData'

export type FeatureCategory = keyof typeof featuresData

export const FEATURE_CATEGORIES = {
  'branding-and-identity': 'branding-and-identity',
  'automation-and-infrastructure': 'automation-and-infrastructure',
  'analytics-and-optimization': 'analytics-and-optimization',
  'marketing-strategy': 'marketing-strategy',
  'product-development': 'product-development',
} as const

export type FeatureCategoryKey = keyof typeof FEATURE_CATEGORIES