import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './GridParallaxBackground.module.scss';

interface GridParallaxBackgroundProps {
  /** Размер ячейки сетки в пикселях */
  cellSize?: number;
  /** Толщина линий сетки */
  lineWidth?: number;
  /** Цвет линий */
  lineColor?: string;
  /** Цвет точек на пересечениях */
  dotColor?: string;
  /** Размер точек */
  dotSize?: number;
  /** Скорость параллакса (0 = статично, 1 = быстро) */
  parallaxSpeed?: number;
  /** Направление параллакса */
  parallaxDirection?: 'vertical' | 'horizontal' | 'both';
  /** Дополнительный сдвиг при скролле */
  scrollOffset?: number;
  /** Включить анимацию при скролле */
  animateOnScroll?: boolean;
  /** Включить тонкую анимацию линий */
  animateLines?: boolean;
  /** Класс для кастомизации */
  className?: string;
  /** Дочерние элементы */
  children?: React.ReactNode;
}

export const GridParallaxBackground: React.FC<GridParallaxBackgroundProps> = ({
  cellSize = 50,
  lineWidth = 1,
  lineColor = 'var(--border-color)',
  dotColor = 'var(--text-secondary)',
  dotSize = 1,
  parallaxSpeed = 0.2,
  parallaxDirection = 'both',
  scrollOffset = 0,
  animateOnScroll = true,
  animateLines = false,
  className = '',
  children
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollY } = useScroll();
  
  // Параллакс эффект
  const y = useTransform(scrollY, [0, 3000], [0, 3000 * parallaxSpeed]);
  const x = useTransform(scrollY, [0, 3000], [0, 3000 * parallaxSpeed * 0.5]);
  
  // Состояние для управления анимацией
  const [isVisible, setIsVisible] = useState(false);
  const [animationId, setAnimationId] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [gridOffset, setGridOffset] = useState({ x: 0, y: 0 });

  // Инициализация canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      if (!containerRef.current || !canvas) return;
      
      const container = containerRef.current;
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = container.clientWidth * dpr;
      canvas.height = container.clientHeight * dpr;
      canvas.style.width = `${container.clientWidth}px`;
      canvas.style.height = `${container.clientHeight}px`;
      
      ctx.scale(dpr, dpr);
      
      drawGrid();
    };

    const drawGrid = () => {
      if (!ctx || !canvas || !containerRef.current) return;

      const container = containerRef.current;
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      // Очистка canvas
      ctx.clearRect(0, 0, width, height);
      
      // Настройки линий
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = lineWidth;
      ctx.globalAlpha = 0.15;
      
      // Вычисление смещения для параллакса
      const offsetX = parallaxDirection !== 'vertical' ? gridOffset.x : 0;
      const offsetY = parallaxDirection !== 'horizontal' ? gridOffset.y : 0;
      
      // Вертикальные линии
      for (let x = 0; x <= width; x += cellSize) {
        ctx.beginPath();
        ctx.moveTo(x + offsetX, 0);
        ctx.lineTo(x + offsetX, height);
        ctx.stroke();
      }
      
      // Горизонтальные линии
      for (let y = 0; y <= height; y += cellSize) {
        ctx.beginPath();
        ctx.moveTo(0, y + offsetY);
        ctx.lineTo(width, y + offsetY);
        ctx.stroke();
      }
      
      // Точки на пересечениях (опционально)
      if (dotSize > 0) {
        ctx.fillStyle = dotColor;
        ctx.globalAlpha = 0.08;
        
        for (let x = 0; x <= width; x += cellSize) {
          for (let y = 0; y <= height; y += cellSize) {
            ctx.beginPath();
            ctx.arc(x + offsetX, y + offsetY, dotSize, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      
      // Тонкая анимация линий (если включено)
      if (animateLines) {
        ctx.globalAlpha = 0.05;
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth * 2;
        
        // Добавляем второстепенные линии со смещением
        const secondaryOffset = cellSize / 2;
        
        for (let x = secondaryOffset; x <= width; x += cellSize) {
          ctx.beginPath();
          ctx.moveTo(x + offsetX * 0.5, 0);
          ctx.lineTo(x + offsetX * 0.5, height);
          ctx.stroke();
        }
        
        for (let y = secondaryOffset; y <= height; y += cellSize) {
          ctx.beginPath();
          ctx.moveTo(0, y + offsetY * 0.5);
          ctx.lineTo(width, y + offsetY * 0.5);
          ctx.stroke();
        }
      }
    };

    // Обработчик скролла для обновления сетки
    const updateGridOffset = () => {
      if (!animateOnScroll) return;
      
      const newOffset = {
        x: scrollOffset + (parallaxDirection !== 'vertical' ? scrollY.get() * parallaxSpeed : 0),
        y: scrollOffset + (parallaxDirection !== 'horizontal' ? scrollY.get() * parallaxSpeed : 0),
      };
      
      setGridOffset(newOffset);
      drawGrid();
    };

    // Анимация
    const animate = () => {
      if (animateLines) {
        // Медленное движение сетки для живого эффекта
        setGridOffset(prev => ({
          x: prev.x + 0.1,
          y: prev.y + 0.05,
        }));
        drawGrid();
      }
      
      const id = requestAnimationFrame(animate);
      setAnimationId(id);
    };

    // Инициализация
    const init = () => {
      resizeCanvas();
      setIsVisible(true);
      
      if (animateLines) {
        animate();
      } else {
        drawGrid();
      }
      
      // Подписка на скролл
      const unsubscribeY = scrollY.on('change', updateGridOffset);
      
      return () => {
        unsubscribeY();
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
      };
    };

    const cleanup = init();
    
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (cleanup) cleanup();
    };
  }, [
    cellSize, 
    lineColor, 
    dotColor, 
    dotSize, 
    lineWidth, 
    parallaxSpeed, 
    parallaxDirection,
    scrollOffset,
    animateOnScroll,
    animateLines,
    scrollY,
    gridOffset
  ]);

  // Обработчик мыши для интерактивности
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || !animateLines) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    if (animateLines) {
      // Можно добавить эффект при наведении
    }
  };

  const handleMouseLeave = () => {
    if (animateLines) {
      // Возвращаем сетку в исходное состояние
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`${styles.container} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Canvas с сеткой */}
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      />
      
      {/* Дополнительный слой для эффектов */}
      <div className={styles.overlay} />
      
      {/* Контент поверх фона */}
      {children && (
        <motion.div 
          className={styles.content}
          style={{
            y: parallaxDirection !== 'horizontal' ? y : undefined,
            x: parallaxDirection !== 'vertical' ? x : undefined,
          }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};