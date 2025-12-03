import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { BaseBackgroundProps } from '../../HeroBackground.types';
import styles from './BrandBackground.module.scss';

export const BrandBackground: React.FC<BaseBackgroundProps> = ({
  speed = 1,
  intensity = 0.5
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement[]>([]);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Основная форма - мягкое пульсирование
      shapesRef.current.forEach((shape, index) => {
        const delay = index * 0.3;
        
        // Медленное дыхание формы
        gsap.to(shape, {
          duration: 8 / speed,
          scale: 1 + (0.05 * intensity),
          opacity: 0.4 + (0.2 * intensity),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay,
        });

        // Легкое вращение по часовой стрелке
        gsap.to(shape, {
          duration: 20 / speed,
          rotation: 360,
          repeat: -1,
          ease: "none",
          delay,
        });

        // Медленный дрейф
        gsap.to(shape, {
          duration: 15 / speed,
          x: `+=${20 * intensity}`,
          y: `+=${10 * intensity}`,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay,
        });
      });

      // Свечение фона - очень мягкое
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          duration: 6 / speed,
          opacity: 0.15 * intensity,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Общая легкая вибрация всего фона
      gsap.to(containerRef.current, {
        duration: 10 / speed,
        opacity: 0.95,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [speed, intensity]);

  const addToShapes = (el: HTMLDivElement | null) => {
    if (el && !shapesRef.current.includes(el)) {
      shapesRef.current.push(el);
    }
  };

  return (
    <div ref={containerRef} className={styles.brandContainer}>
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