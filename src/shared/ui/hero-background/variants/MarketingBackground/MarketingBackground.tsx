import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { BaseBackgroundProps } from '../../HeroBackground.types';
import styles from './MarketingBackground.module.scss';

export const MarketingBackground: React.FC<BaseBackgroundProps> = ({
  speed = 1,
  intensity = 1,
  isHovered = false,
  isActive = false,
  isScrolled = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (!timelineRef.current) {
      const tl = gsap.timeline({ repeat: -1 });
      
      // Анимация линий потока
      linesRef.current.forEach((line, index) => {
        tl.to(line, {
          duration: 2 + (index * 0.5) / speed,
          x: `${100 * intensity}px`,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2,
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

  const addToLines = (el: HTMLDivElement | null) => {
    if (el && !linesRef.current.includes(el)) {
      linesRef.current.push(el);
    }
  };

  return (
    <div 
      ref={containerRef} 
      className={styles.marketingContainer}
      data-hovered={isHovered}
      data-active={isActive}
      data-scrolled={isScrolled}
    >
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          ref={addToLines}
          className={styles.flowLine}
          style={{
            left: `${i * 15}%`,
            transform: `rotate(${45 + (i * 5)}deg)`,
            opacity: 0.2 + (i * 0.1),
          }}
        />
      ))}
    </div>
  );
};