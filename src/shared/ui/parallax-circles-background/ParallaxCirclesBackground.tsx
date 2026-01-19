import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import styles from './ParallaxCirclesBackground.module.scss';

interface ParallaxCirclesBackgroundProps {
  circleCount?: number;
  minSize?: number;
  maxSize?: number;
  color?: string;
  opacity?: number;
  parallaxSpeed?: number;
  animateIn?: boolean;
  interactive?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const ParallaxCirclesBackground: React.FC<ParallaxCirclesBackgroundProps> = ({
  circleCount = 50,
  minSize = 2,
  maxSize = 10,
  color = 'var(--primary-color)',
  opacity = 0.1,
  parallaxSpeed = 0.2,
  animateIn = true,
  interactive = true,
  className = '',
  children
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [mounted, setMounted] = useState(false);
  const [circles, setCircles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    speed: number;
    initialY: number;
  }>>([]);

  const [contentHeight, setContentHeight] = useState(0);

  // Обновляем высоту контента при изменении
  useEffect(() => {
    const updateContentHeight = () => {
      if (contentRef.current) {
        const height = contentRef.current.scrollHeight;
        setContentHeight(height);
      }
    };

    updateContentHeight();
    window.addEventListener('resize', updateContentHeight);
    
    return () => window.removeEventListener('resize', updateContentHeight);
  }, []);

  // Генерация кругов с учетом высоты контента
  useEffect(() => {
    if (!containerRef.current) return;

    const newCircles = [];
    // Генерируем больше кругов для бесконечного эффекта
    const totalCircles = circleCount * 2;
    
    for (let i = 0; i < totalCircles; i++) {
      // Распределяем круги по всей высоте контента
      const yPercent = Math.random() * 200 - 50; // От -50% до 150% для бесконечности
      const initialY = (contentHeight * yPercent) / 100;
      
      newCircles.push({
        id: i,
        x: Math.random() * 100,
        y: yPercent,
        size: Math.random() * (maxSize - minSize) + minSize,
        speed: Math.random() * 0.5 + 0.5,
        initialY: initialY
      });
    }
    setCircles(newCircles);
    setMounted(true);
  }, [circleCount, minSize, maxSize, contentHeight]);

  // Эффект параллакса с учетом высоты контента
  const y = useTransform(scrollY, [0, contentHeight], [0, contentHeight * parallaxSpeed]);

  // Интерактивность
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!interactive || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });
  }, [interactive]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // Функция для расчета позиции круга с учетом параллакса
  const getCircleStyle = useCallback((circle: typeof circles[0], parallaxY: number) => {
    const mouseDistance = interactive && isHovered 
      ? Math.sqrt(
          Math.pow(mousePosition.x - circle.x, 2) + 
          Math.pow(mousePosition.y - circle.y, 2)
        )
      : 100;
    
    const mouseInfluence = Math.max(0, (30 - mouseDistance) / 30);
    
    // Позиция с учетом параллакса
    const currentY = circle.initialY - (parallaxY * circle.speed);
    
    return {
      position: 'absolute' as const,
      width: `${circle.size}px`,
      height: `${circle.size}px`,
      left: `${circle.x}%`,
      top: `${currentY}px`,
      transform: `translate(-50%, -50%) scale(${1 + mouseInfluence * 0.2})`,
      zIndex: 1,
    };
  }, [interactive, isHovered, mousePosition]);

  return (
    <div 
      style={{ 
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      {/* Фон с кругами - фиксирован на всю страницу */}
      <div
        ref={containerRef}
        className={`${styles.backgroundContainer} ${className}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      >
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            y,
          }}
        >
          {circles.map((circle) => {
            const circleStyle = getCircleStyle(circle, scrollY.get());
            
            return (
              <motion.div
                key={circle.id}
                style={{
                  ...circleStyle,
                  borderRadius: '50%',
                  backgroundColor: color,
                  opacity: opacity,
                }}
                initial={animateIn ? { 
                  scale: 0, 
                  opacity: 0,
                } : undefined}
                animate={mounted ? { 
                  scale: 1, 
                  opacity: opacity,
                  transition: {
                    delay: circle.id * 0.005,
                    duration: 0.8,
                    type: 'spring',
                    stiffness: 100,
                  }
                } : undefined}
                whileHover={interactive ? {
                  opacity: opacity * 2,
                  scale: 1.2,
                  transition: { duration: 0.2 }
                } : undefined}
              />
            );
          })}
        </motion.div>
      </div>

      {/* Контент поверх фона */}
      <div 
        ref={contentRef}
        className={styles.content}
        style={{ 
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
        }}
      >
        {children}
      </div>
    </div>
  );
};