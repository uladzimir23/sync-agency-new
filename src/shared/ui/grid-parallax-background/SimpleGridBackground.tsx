import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './SimpleGridBackground.module.scss';

interface SimpleGridBackgroundProps {
  cellSize?: number;
  lineColor?: string;
  opacity?: number;
  parallaxSpeed?: number;
  className?: string;
  children?: React.ReactNode;
}

export const SimpleGridBackground: React.FC<SimpleGridBackgroundProps> = ({
  cellSize = 50,
  lineColor = 'var(--border-color)',
  opacity = 0.1,
  parallaxSpeed = 0.3,
  className = '',
  children
}) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 1000 * parallaxSpeed]);

  return (
    <div className={`${styles.container} ${className}`}>
      {/* Фоновая сетка */}
      <div 
        className={styles.grid}
        style={{
          '--cell-size': `${cellSize}px`,
          '--line-color': lineColor,
          '--grid-opacity': opacity,
        } as React.CSSProperties}
      >
        {/* Движущийся слой для параллакса */}
        <motion.div 
          className={styles.gridLayer}
          style={{ y }}
        />
        <div className={styles.gridLayerStatic} />
      </div>
      
      {/* Контент */}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};