// src/shared/ui/hero-background/variants/MarketingBackground/MarketingBackground.tsx

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { BaseBackgroundProps } from '../../HeroBackground.types';
import { MarketingBackgroundLogos } from './MarketingBackgroundLogos';
import styles from './MarketingBackground.module.scss';

export const MarketingBackground: React.FC<BaseBackgroundProps> = ({
  speed = 10,
  intensity = 10,
  isHovered = false,
  isActive = false,
  isScrolled = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  /**
   * Инициализация фоновой анимации
   * Лёгкие диагональные линии создают ощущение потока / distribution
   */
  useEffect(() => {
    if (!containerRef.current || timelineRef.current) return;

    const tl = gsap.timeline({ repeat: -1 });

    linesRef.current.forEach((line, index) => {
      tl.fromTo(
        line,
        {
          x: 0,
          opacity: 0.15
        },
        {
          x: `${120 * intensity}px`,
          opacity: 0.35,
          duration: (2.5 + index * 0.4) / speed,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: index * 0.15
        },
        0
      );
    });

    timelineRef.current = tl;

    return () => {
      tl.kill();
      timelineRef.current = null;
    };
  }, [speed, intensity]);

  /**
   * Реакция на hover / active / scroll
   */
  useEffect(() => {
    if (!timelineRef.current) return;

    const boosted = isHovered || isActive || isScrolled;

    timelineRef.current.timeScale(boosted ? 1.6 : 1);
    gsap.to(containerRef.current, {
      opacity: boosted ? 1 : 0.85,
      duration: 0.4,
      ease: 'power2.out'
    });
  }, [isHovered, isActive, isScrolled]);

  const registerLine = (el: HTMLDivElement | null) => {
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
      {/* Слой с логотипами платформ */}
      <MarketingBackgroundLogos
        speed={speed}
        intensity={intensity}
        isHovered={isHovered}
        isActive={isActive}
        isScrolled={isScrolled}
      />
    </div>
  );
};

export default MarketingBackground;
