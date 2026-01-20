import React, { useEffect, useRef, useState } from 'react';
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
  /** Количество подсвеченных квадратов */
  highlightCount?: number;
  /** Цвета для подсветки */
  highlightColors?: string[];
  /** Дочерние элементы */
  children?: React.ReactNode;
  /** Дополнительные классы */
  className?: string;
}

interface HighlightSquare {
  id: number;
  col: number;
  row: number;
  color: string;
  size: 1 | 2 | 3; // 1x1, 2x2, 3x3
  type: 'border' | 'fill' | 'pulse';
}

export const SimpleGridBackground: React.FC<SimpleGridBackgroundProps> = ({
  cellSize = 60,
  lineWidth = 1,
  color = 'var(--border-color)',
  opacity = 0.08,
  speed = 0.15,
  highlightCount = 8,
  highlightColors = [
    'rgba(79, 70, 229, 0.1)',    // indigo
    'rgba(147, 51, 234, 0.1)',   // purple
    'rgba(236, 72, 153, 0.1)',   // pink
    'rgba(6, 182, 212, 0.1)',    // cyan
    'rgba(34, 197, 94, 0.1)',    // green
    'rgba(249, 115, 22, 0.1)',   // orange
    'rgba(239, 68, 68, 0.1)',    // red
  ],
  children,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [highlights, setHighlights] = useState<HighlightSquare[]>([]);

  // Параллакс эффект
  const y = useTransform(scrollY, [0, 10000], [0, 10000 * speed]);

  // Обновляем размеры контейнера
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: rect.height
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Генерируем подсвеченные квадраты
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const cols = Math.ceil(dimensions.width / cellSize);
    const rows = Math.ceil(dimensions.height / cellSize) * 2; // x2 для бесконечности

    const newHighlights: HighlightSquare[] = [];
    
    for (let i = 0; i < highlightCount; i++) {
      const col = Math.floor(Math.random() * cols);
      const row = Math.floor(Math.random() * rows);
      const color = highlightColors[Math.floor(Math.random() * highlightColors.length)];
      const size = Math.floor(Math.random() * 3) + 1 as 1 | 2 | 3;
      const type = Math.random() > 0.5 ? 'border' : Math.random() > 0.5 ? 'fill' : 'pulse';
      
      newHighlights.push({
        id: i,
        col,
        row,
        color,
        size,
        type
      });
    }

    setHighlights(newHighlights);
  }, [dimensions, cellSize, highlightCount, highlightColors]);

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
      className={`${styles.container} ${className}`}
    >
      {/* Основная сетка (первый слой) */}
      <motion.div 
        className={styles.gridLayer}
        style={{ y }}
      >
        <div className={styles.grid} />
      </motion.div>

      {/* Второй слой сетки (смещенный для бесконечности) */}
      <motion.div 
        className={styles.gridLayer}
        style={{ y: useTransform(scrollY, [0, 10000], [cellSize * 10, 10000 * speed + cellSize * 10]) }}
      >
        <div className={styles.grid} />
      </motion.div>

      {/* Подсвеченные квадраты */}
      <motion.div 
        className={styles.highlightsLayer}
        style={{ y }}
      >
        {highlights.map((highlight) => {
          const top = highlight.row * cellSize;
          const left = highlight.col * cellSize;
          const width = highlight.size * cellSize;
          const height = highlight.size * cellSize;

          return (
            <div
              key={highlight.id}
              className={`${styles.highlightSquare} ${styles[highlight.type]}`}
              style={{
                top: `${top}px`,
                left: `${left}px`,
                width: `${width}px`,
                height: `${height}px`,
                '--highlight-color': highlight.color,
                '--highlight-size': highlight.size,
              } as React.CSSProperties}
            />
          );
        })}
      </motion.div>

      {/* Контент */}
      {children && (
        <div className={styles.content}>
          {children}
        </div>
      )}
    </div>
  );
};