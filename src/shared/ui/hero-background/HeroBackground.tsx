import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { HeroBackgroundProps } from './HeroBackground.types';
import { BrandBackground } from './variants/BrandBackground/BrandBackground';
import { MarketingBackground } from './variants/MarketingBackground/MarketingBackground';
import { ProductBackground } from './variants/ProductBackground/ProductBackground';
import { DataBackground } from './variants/DataBackground/DataBackground';
import { AutomationBackground } from './variants/AutomationBackground/AutomationBackground';
import styles from './HeroBackground.module.scss';


export const HeroBackground: React.FC<HeroBackgroundProps> = ({
    type,
    className = '',
    speed = 1,
    intensity = 1,
    isHovered = false,
    isActive = false,
    isScrolled = false
  }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<gsap.core.Tween | null>(null);
  
    useEffect(() => {
      if (!containerRef.current) return;
  
      // Создаем анимацию один раз при монтировании
      if (!animationRef.current) {
        animationRef.current = gsap.to(containerRef.current, {
          duration: 4,
          opacity: 0.9,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          paused: false
        });
      }
  
      // Управляем скоростью анимации
      if (animationRef.current) {
        // Для мобильных: если активен (по скроллу), ускоряем
        // Для десктопа: если наведен, ускоряем
        const shouldSpeedUp = isHovered || isActive || isScrolled;
        animationRef.current.timeScale(shouldSpeedUp ? 1.5 : 1);
      }
  
      return () => {
        // Не убиваем анимацию при размонтировании
        // Она будет убита автоматически при размонтировании компонента
      };
    }, [isHovered, isActive, isScrolled]); // Добавляем все зависимости
  
    const renderBackground = () => {
      const commonProps = { 
        speed, 
        intensity,
        isHovered,
        isActive,
        isScrolled 
      };
  
      switch (type) {
        case 'brand':
          return <BrandBackground {...commonProps} />;
        case 'marketing':
          return <MarketingBackground {...commonProps} />;
        case 'product':
          return <ProductBackground {...commonProps} />;
        case 'data':
          return <DataBackground {...commonProps} />;
        case 'automation':
          return <AutomationBackground {...commonProps} />;
        default:
          return <BrandBackground {...commonProps} />;
      }
    };
  
    return (
      <div 
        ref={containerRef} 
        className={`${styles.container} ${className}`}
        data-type={type}
        data-hovered={isHovered}
        data-active={isActive}
        data-scrolled={isScrolled}
      >
        {renderBackground()}
      </div>
    );
  };