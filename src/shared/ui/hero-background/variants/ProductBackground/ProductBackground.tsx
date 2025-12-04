import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { BaseBackgroundProps } from '../../HeroBackground.types';
import styles from './ProductBackground.module.scss';

export const ProductBackground: React.FC<BaseBackgroundProps> = ({
  speed = 1,
  intensity = 1,
  isHovered = false,
  isActive = false,
  isScrolled = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (!timelineRef.current) {
      const tl = gsap.timeline({ repeat: -1 });
      
      // Параллакс эффект для слоев
      layersRef.current.forEach((layer, index) => {
        tl.to(layer, {
          duration: 3 + index / speed,
          x: `${20 * (index + 1) * intensity}px`,
          y: `${10 * (index + 1) * intensity}px`,
          rotation: (index % 2 === 0 ? 1 : -1) * intensity,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.3,
        }, 0);
      });

      timelineRef.current = tl;
    }

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };
  }, [speed, intensity]);

  useEffect(() => {
    // Управляем скоростью анимации
    if (timelineRef.current) {
      const shouldSpeedUp = isHovered || isActive || isScrolled;
      timelineRef.current.timeScale(shouldSpeedUp ? 1.5 : 1);
    }
  }, [isHovered, isActive, isScrolled]);

  const addToLayers = (el: HTMLDivElement | null) => {
    if (el && !layersRef.current.includes(el)) {
      layersRef.current.push(el);
    }
  };

  return (
    <div 
      ref={containerRef} 
      className={styles.productContainer}
      data-hovered={isHovered}
      data-active={isActive}
      data-scrolled={isScrolled}
    >
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          ref={addToLayers}
          className={styles.layer}
          style={{
            width: `${80 - (i * 15)}%`,
            height: `${70 - (i * 15)}%`,
            borderWidth: `${1 + i * 0.5}px`,
          }}
        />
      ))}
    </div>
  );
};