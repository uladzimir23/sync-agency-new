import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { BaseBackgroundProps } from '../../HeroBackground.types';
import styles from './BrandBackground.module.scss';

export const BrandBackground: React.FC<BaseBackgroundProps> = ({
  speed = 1,
  intensity = 1,
  isHovered = false,
  isActive = false,
  isScrolled = false
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  // Компактные элементы брендинга
  const brandElements = useMemo(() => [
    {
      type: 'font',
      content: 'Aa',
      description: 'TASA Orbiter',
      color: 'var(--page-title-cyan-text)',
      size: '2rem'
    },
    {
      type: 'color',
      content: '#569cfe',
      description: 'Primary Blue',
      color: '#569cfe',
      size: '1.5rem'
    },
    {
      type: 'font',
      content: 'Аа',
      description: 'TikTok Sans',
      color: 'var(--page-title-purple-text)',
      size: '2rem'
    },
    {
      type: 'color',
      content: '#48bb78',
      description: 'Success Green',
      color: '#48bb78',
      size: '1.5rem'
    },
    {
      type: 'font',
      content: '012',
      description: 'Numerals',
      color: 'var(--page-title-green-text)',
      size: '1.8rem'
    }
  ], []);

  // Автоматическое переключение
  useEffect(() => {
    const intervalTime = 2500 / speed;
    
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % brandElements.length);
    }, intervalTime);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [speed, brandElements.length]);

  // Ускорение при активности
  useEffect(() => {
    if (isHovered || isActive || isScrolled) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
          setCurrentIndex((prev) => (prev + 1) % brandElements.length);
        }, 1200 / speed);
      }
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
          setCurrentIndex((prev) => (prev + 1) % brandElements.length);
        }, 2500 / speed);
      }
    }
  }, [isHovered, isActive, isScrolled, speed, brandElements.length]);

  const currentElement = brandElements[currentIndex];

  return (
    <div 
      className={styles.brandContainer}
      data-hovered={isHovered}
      data-active={isActive}
      data-scrolled={isScrolled}
    >
      {/* Фоновый градиент */}
      <div className={styles.backgroundGradient} />
      
      {/* Центральный элемент */}
      <motion.div 
        className={styles.centralElement}
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.2 }}
        transition={{ duration: 0.5 }}
        style={{
          color: currentElement.color,
          fontSize: currentElement.size
        }}
      >
        <div className={styles.elementContent}>
          {currentElement.type === 'color' ? (
            <div 
              className={styles.colorCircle}
              style={{ backgroundColor: currentElement.color }}
            />
          ) : (
            <div className={styles.fontSample}>
              {currentElement.content}
            </div>
          )}
        </div>
        
        {/* Описание */}
        <motion.div 
          className={styles.elementDescription}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {currentElement.description}
        </motion.div>
      </motion.div>

      {/* Индикаторы */}
      <div className={styles.indicators}>
        {brandElements.map((_, index) => (
          <div
            key={index}
            className={`${styles.indicatorDot} ${index === currentIndex ? styles.active : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};