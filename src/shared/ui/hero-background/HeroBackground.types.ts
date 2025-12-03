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
  isHovered?: boolean; // Добавляем пропс для состояния ховера
}

export interface BaseBackgroundProps {
  speed?: number;
  intensity?: number;
  isHovered?: boolean; // Добавляем пропс для состояния ховера
}