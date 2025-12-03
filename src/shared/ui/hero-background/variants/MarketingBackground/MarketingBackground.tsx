import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { BaseBackgroundProps } from '../../HeroBackground.types';
import styles from './MarketingBackground.module.scss';

export const MarketingBackground: React.FC<BaseBackgroundProps> = ({
  speed = 1,
  intensity = 1
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Анимация линий потока
      linesRef.current.forEach((line, index) => {
        gsap.to(line, {
          duration: 2 + (index * 0.5) / speed,
          x: `${100 * intensity}px`,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [speed, intensity]);

  const addToLines = (el: HTMLDivElement | null) => {
    if (el && !linesRef.current.includes(el)) {
      linesRef.current.push(el);
    }
  };

  return (
    <div ref={containerRef} className={styles.marketingContainer}>
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