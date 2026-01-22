export type HeroBackgroundType = 
  | 'brand' 
  | 'marketing' 
  | 'product' 
  | 'data' 
  | 'automation'
  | 'performance';

  // | 'pixel';

export interface HeroBackgroundProps {
  type: HeroBackgroundType;
  className?: string;
  speed?: number;
  intensity?: number;
  isHovered?: boolean;
  isActive?: boolean;
  isScrolled?: boolean;
}

export interface BaseBackgroundProps {
  speed?: number;
  intensity?: number;
  isHovered?: boolean;
  isActive?: boolean;
  isScrolled?: boolean;
}