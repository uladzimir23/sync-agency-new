import React, { useEffect, useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import styles from './SimpleGridBackground.module.scss';

interface SimpleGridBackgroundProps {
  /** Размер ячейки сетки в пикселях */
  cellSize?: number;
  /** Толщина линий */
  lineWidth?: number;
  /** Цвет линий */
  color?: string;
  /** Прозрачность линий */
  opacity?: number;
  /** Скорость параллакса */
  speed?: number;
  /** Фиксированный фон */
  fixed?: boolean;
  /** Дочерние элементы */
  children?: React.ReactNode;
  /** Дополнительные классы */
  className?: string;
}

export const SimpleGridBackground: React.FC<SimpleGridBackgroundProps> = ({
  cellSize = 60,
  lineWidth = 1,
  color = 'var(--border-color)',
  opacity = 0.1,
  speed = 0.2,
  fixed = true,
  children,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Параллакс эффект
  const y = useTransform(scrollY, [0, 3000], [0, 3000 * speed]);

  // Создаем переменные CSS для сетки
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    container.style.setProperty('--grid-cell-size', `${cellSize}px`);
    container.style.setProperty('--grid-line-width', `${lineWidth}px`);
    container.style.setProperty('--grid-color', color);
    container.style.setProperty('--grid-opacity', `${opacity}`);
  }, [cellSize, lineWidth, color, opacity]);

  return (
    <div 
      ref={containerRef}
      className={`${styles.container} ${fixed ? styles.fixed : styles.relative} ${className}`}
    >
      {/* Сетка */}
      <motion.div 
        className={styles.grid}
        style={{ y }}
      />

      
      {/* Контент */}
      {children && (
        <div className={styles.content}>
          {children}
        </div>
      )}
    </div>
  );
};