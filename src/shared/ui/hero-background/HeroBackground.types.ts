export type HeroBackgroundType = 
  | 'brand' 
  | 'marketing' 
  | 'product' 
  | 'data' 
  | 'automation';

export interface HeroBackgroundProps {
  type: HeroBackgroundType;
  className?: string;
  speed?: number;
  intensity?: number;
  isHovered?: boolean;
  isActive?: boolean; // Добавляем для мобильных
  isScrolled?: boolean; // Добавляем для мобильных
}

export interface BaseBackgroundProps {
  speed?: number;
  intensity?: number;
  isHovered?: boolean;
  isActive?: boolean; // Добавляем для мобильных
  isScrolled?: boolean; // Добавляем для мобильных
}