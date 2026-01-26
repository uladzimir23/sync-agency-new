import React, { useEffect, useState } from 'react';
import styles from './ThemeTransitionMask.module.scss';

interface ThemeTransitionMaskProps {
  isTransitioning: boolean;
  direction: 'light-to-dark' | 'dark-to-light';
  onTransitionEnd?: () => void;
}

export const ThemeTransitionMask: React.FC<ThemeTransitionMaskProps> = ({
  isTransitioning,
  direction,
  onTransitionEnd
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isTransitioning) {
      setIsVisible(true);
      // Небольшая задержка для начала анимации
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    } else {
      setIsAnimating(false);
      // Ждем окончания анимации перед скрытием
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const handleAnimationEnd = () => {
    if (!isTransitioning && onTransitionEnd) {
      onTransitionEnd();
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`${styles.themeTransitionMask} ${isAnimating ? styles.animating : ''} ${direction === 'light-to-dark' ? styles.toDark : styles.toLight}`}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className={styles.maskLayer} />
      <div className={styles.gradientLayer} />
    </div>
  );
};