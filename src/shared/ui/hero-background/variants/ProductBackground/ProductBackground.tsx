import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { BaseBackgroundProps } from '../../HeroBackground.types';
import styles from './ProductBackground.module.scss';

export const ProductBackground: React.FC<BaseBackgroundProps> = ({
  speed = 1,
  intensity = 1
}) => {
  const layersRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Параллакс эффект для слоев
      layersRef.current.forEach((layer, index) => {
        gsap.to(layer, {
          duration: 3 + index / speed,
          x: `${20 * (index + 1) * intensity}px`,
          y: `${10 * (index + 1) * intensity}px`,
          rotation: (index % 2 === 0 ? 1 : -1) * intensity,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.3,
        });
      });
    });

    return () => ctx.revert();
  }, [speed, intensity]);

  const addToLayers = (el: HTMLDivElement | null) => {
    if (el && !layersRef.current.includes(el)) {
      layersRef.current.push(el);
    }
  };

  return (
    <div className={styles.productContainer}>
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