// src/shared/ui/simple-grid-background/SimpleGridBackground.tsx
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import styles from './SimpleGridBackground.module.scss';

interface SimpleGridBackgroundProps {
  cellSize?: number;
  lineWidth?: number;
  color?: string;
  opacity?: number;
  speed?: number;
  highlightCount?: number;
  highlightColors?: string[];
  fixed?: boolean;
  children?: React.ReactNode;
  className?: string;
}

interface HighlightSquare {
  id: number;
  col: number;
  row: number;
  color: string;
  size: 1 | 2 | 3;
  type: 'border' | 'fill' | 'pulse';
}

export const SimpleGridBackground: React.FC<SimpleGridBackgroundProps> = ({
  cellSize = 64,
  lineWidth = 1,
  color = 'var(--border-color)',
  opacity = 0.08,
  speed = 0.15,
  highlightCount = 8,
  highlightColors = [
    'rgba(79, 70, 229, 0.1)',
    'rgba(147, 51, 234, 0.1)',
    'rgba(236, 72, 153, 0.1)',
    'rgba(6, 182, 212, 0.1)',
    'rgba(34, 197, 94, 0.1)',
  ],
  fixed = true,
  children,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [highlights, setHighlights] = useState<HighlightSquare[]>([]);
  const resizeTimeoutRef = useRef<NodeJS.Timeout>();

  // Параллакс эффект
  const y = useTransform(scrollY, [0, 10000], [0, 10000 * speed]);

  // Функция для генерации квадратов
  const generateHighlights = useCallback((width: number, height: number) => {
    const cols = Math.ceil(width / cellSize);
    const rows = Math.ceil((height * 4) / cellSize); // x4 для бесконечности

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
  }, [cellSize, highlightCount, highlightColors]);

  // Обновляем размеры контейнера с debounce
  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions(prev => {
          // Обновляем только если размеры действительно изменились
          if (Math.abs(prev.width - rect.width) < 10 && Math.abs(prev.height - rect.height) < 10) {
            return prev;
          }
          return {
            width: rect.width,
            height: rect.height
          };
        });
      }
    };

    // Используем ResizeObserver вместо resize event для большей точности
    const resizeObserver = new ResizeObserver((entries) => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      
      // Дебаунс 500ms для избежания частых обновлений
      resizeTimeoutRef.current = setTimeout(() => {
        updateDimensions();
      }, 500);
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    // Инициализация
    updateDimensions();
    
    return () => {
      resizeObserver.disconnect();
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);

  // Генерируем подсвеченные квадраты только при значительном изменении размеров
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;
    
    // Генерируем только если размеры изменились существенно
    generateHighlights(dimensions.width, dimensions.height);
  }, [dimensions, generateHighlights]);

  // Создаем переменные CSS для сетки
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    container.style.setProperty('--grid-cell-size', `${cellSize}px`);
    container.style.setProperty('--grid-line-width', `${lineWidth}px`);
    container.style.setProperty('--grid-color', color);
    container.style.setProperty('--grid-opacity', `${opacity}`);
  }, [cellSize, lineWidth, color, opacity]);

  // Оптимизация: предотвращаем перерисовку квадратов на мобильных устройствах при таче
  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      // Не делаем ничего, просто предотвращаем частые обновления
    };

    // Добавляем passive: true для улучшения производительности
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    
    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`${styles.container} ${fixed ? styles.fixed : styles.absolute} ${className}`}
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
        className={styles.gridLayer2}
        style={{ 
          y: useTransform(
            scrollY, 
            [0, 10000], 
            [cellSize * 200, 10000 * speed + cellSize * 200]
          ) 
        }}
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