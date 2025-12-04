import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { BaseBackgroundProps } from '../../HeroBackground.types';
import styles from './BrandBackground.module.scss';

export const BrandBackground: React.FC<BaseBackgroundProps> = ({
  speed = 1,
  intensity = 0.5,
  isHovered = false,
  isActive = false,
  isScrolled = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement[]>([]);
  const glowRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Создаем анимацию один раз при монтировании
    if (!timelineRef.current) {
      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      
      // Основная форма - мягкое пульсирование
      shapesRef.current.forEach((shape, index) => {
        const delay = index * 0.3;
        
        tl.to(shape, {
          duration: 8 / speed,
          scale: 1 + (0.05 * intensity),
          opacity: 0.4 + (0.2 * intensity),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay,
        }, 0);

        // Легкое вращение по часовой стрелке
        tl.to(shape, {
          duration: 20 / speed,
          rotation: 360,
          repeat: -1,
          ease: "none",
          delay,
        }, 0);

        // Медленный дрейф
        tl.to(shape, {
          duration: 15 / speed,
          x: `+=${20 * intensity}`,
          y: `+=${10 * intensity}`,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay,
        }, 0);
      });

      // Свечение фона - очень мягкое
      if (glowRef.current) {
        tl.to(glowRef.current, {
          duration: 6 / speed,
          opacity: 0.15 * intensity,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        }, 0);
      }

      // Общая легкая вибрация всего фона
      tl.to(containerRef.current, {
        duration: 10 / speed,
        opacity: 0.95,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      }, 0);

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

  const addToShapes = (el: HTMLDivElement | null) => {
    if (el && !shapesRef.current.includes(el)) {
      shapesRef.current.push(el);
    }
  };

  return (
    <div 
      ref={containerRef} 
      className={styles.brandContainer}
      data-hovered={isHovered}
      data-active={isActive}
      data-scrolled={isScrolled}
    >
      {/* Основная форма - абстрактный бренд */}
      <div 
        ref={addToShapes}
        className={`${styles.shape} ${styles.mainShape}`}
      />
      
      {/* Вторичная форма - мягкая тень */}
      <div 
        ref={addToShapes}
        className={`${styles.shape} ${styles.secondaryShape}`}
      />
      
      {/* Третичная форма - акцент */}
      <div 
        ref={addToShapes}
        className={`${styles.shape} ${styles.accentShape}`}
      />
      
      {/* Очень мягкое свечение фона */}
      <div ref={glowRef} className={styles.backgroundGlow} />
      
      {/* Тонкие линии-направляющие */}
      <div className={styles.guideline} style={{ left: '20%', transform: 'rotate(15deg)' }} />
      <div className={styles.guideline} style={{ right: '20%', transform: 'rotate(-15deg)' }} />
    </div>
  );
};