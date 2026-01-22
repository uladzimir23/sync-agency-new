import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { BaseBackgroundProps } from '../../HeroBackground.types';
import styles from './AutomationBackground.module.scss';
import {
  FaRobot,
  FaBrain,
  FaBolt,
  FaLink,
  FaCogs,
  FaCloud,
  FaCode,
  FaNetworkWired,
  FaServer,
  FaDatabase,
  FaMicrochip,
  FaSync
} from 'react-icons/fa';
import { SiOpenai, SiZapier, SiSlack } from 'react-icons/si';

interface AutomationItem {
  id: string;
  icon: React.ReactNode;
  name: string;
  color: string;
  size?: string;
}

export const AutomationBackground: React.FC<BaseBackgroundProps> = ({
  speed = 1,
  intensity = 1,
  isHovered = false,
  isActive = false,
  isScrolled = false
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout>();

  // Автоматизация иконок
  const automationItems: AutomationItem[] = useMemo(() => [
    {
      id: 'openai',
      icon: <SiOpenai />,
      name: 'OpenAI',
      color: '#10a37f',
      size: '5rem'
    },
    {
      id: 'zapier',
      icon: <SiZapier />,
      name: 'Zapier',
      color: '#ff4a00',
      size: '5rem'
    },
    {
      id: 'slack',
      icon: <SiSlack />,
      name: 'Slack',
      color: '#4a154b',
      size: '5rem'
    },
    {
      id: 'robot',
      icon: <FaRobot />,
      name: 'AI Agent',
      color: '#569cfe',
      size: '5rem'
    },
    {
      id: 'brain',
      icon: <FaBrain />,
      name: 'LLM',
      color: '#8a4baf',
      size: '5rem'
    },
    {
      id: 'bolt',
      icon: <FaBolt />,
      name: 'Automation',
      color: '#ffc107',
      size: '5rem'
    },
    {
      id: 'link',
      icon: <FaLink />,
      name: 'Integration',
      color: '#20c997',
      size: '5rem'
    },
    {
      id: 'cogs',
      icon: <FaCogs />,
      name: 'Workflow',
      color: '#6f42c1',
      size: '5rem'
    }
  ], []);

  // Автоматическое переключение
  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = 2500 / speed;
    
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % automationItems.length);
    }, intervalTime);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, speed, automationItems.length]);

  // Ускорение при активности
  useEffect(() => {
    if (isHovered || isActive || isScrolled) {
      setIsPlaying(false);
      
      // Быстрая навигация при активности
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      const fastInterval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % automationItems.length);
      }, 1200 / speed);
      
      intervalRef.current = fastInterval;
      
      return () => {
        if (fastInterval) clearInterval(fastInterval);
      };
    } else {
      setIsPlaying(true);
    }
  }, [isHovered, isActive, isScrolled, speed, automationItems.length]);

  // Расчет боковых индексов
  const getSideIndex = useCallback((offset: number) => {
    const length = automationItems.length;
    return (currentIndex + offset + length) % length;
  }, [currentIndex, automationItems.length]);

  const currentItem = automationItems[currentIndex];

  return (
    <div 
      className={styles.automationContainer}
      data-hovered={isHovered}
      data-active={isActive}
      data-scrolled={isScrolled}
    >
      {/* Фоновый градиент */}
      <div className={styles.backgroundGradient} />
      
      {/* Контейнер галереи */}
      <div className={styles.galleryContainer}>
        {/* Левый боковой элемент (предыдущий) */}
        <div 
          className={styles.sideItem}
          style={{ 
            color: automationItems[getSideIndex(-1)].color
          }}
          onClick={() => setCurrentIndex(getSideIndex(-1))}
        >
          <div className={styles.sideIcon}>
            {automationItems[getSideIndex(-1)].icon}
          </div>
          {/* <div className={styles.sideName}>
            {automationItems[getSideIndex(-1)].name}
          </div> */}
        </div>

        {/* Центральный элемент */}
        <div className={styles.centralArea}>
          <motion.div 
            className={styles.centralElement}
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.5 }}
            style={{
              color: currentItem.color,
              fontSize: currentItem.size
            }}
          >
            <div className={styles.elementContent}>
              <div className={styles.elementIcon}>
                {currentItem.icon}
              </div>
            </div>
            
            {/* Название */}
            <motion.div 
              className={styles.elementName}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {currentItem.name}
            </motion.div>
          </motion.div>
        </div>

        {/* Правый боковой элемент (следующий) */}
        <div 
          className={styles.sideItem}
          style={{ 
            color: automationItems[getSideIndex(1)].color
          }}
          onClick={() => setCurrentIndex(getSideIndex(1))}
        >
          <div className={styles.sideIcon}>
            {automationItems[getSideIndex(1)].icon}
          </div>
          {/* <div className={styles.sideName}>
            {automationItems[getSideIndex(1)].name}
          </div> */}
        </div>
      </div>

      {/* Индикаторы */}
      <div className={styles.indicators}>
        {automationItems.map((_, index) => (
          <button
            key={index}
            className={`${styles.indicatorDot} ${index === currentIndex ? styles.active : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to item ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};