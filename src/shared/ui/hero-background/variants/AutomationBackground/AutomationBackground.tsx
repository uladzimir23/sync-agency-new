import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { BaseBackgroundProps } from '../../HeroBackground.types';
import styles from './AutomationBackground.module.scss';

export const AutomationBackground: React.FC<BaseBackgroundProps> = ({
  speed = 1,
  intensity = 1,
  isHovered = false,
  isActive = false,
  isScrolled = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathsRef = useRef<HTMLDivElement[]>([]);
  const nodesRef = useRef<HTMLDivElement[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (!timelineRef.current) {
      const tl = gsap.timeline({ repeat: -1 });
      
      // Анимация бегущего света по контурам
      pathsRef.current.forEach((path, index) => {
        const light = path.querySelector(`.${styles.lightFlow}`) as HTMLElement;
        if (light) {
          tl.to(light, {
            duration: 8 / speed,
            left: '100%',
            repeat: -1,
            ease: "none",
            delay: index * 3.5,
          }, 0);
        }

        // Пульсация контуров
        tl.to(path, {
          duration: 3 / speed,
          opacity: 0.4 + (0.3 * intensity),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2,
        }, 0);
      });

      // Мигание узлов
      nodesRef.current.forEach((node, index) => {
        tl.to(node, {
          duration: 1.5 / speed,
          scale: 1.5,
          opacity: 1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.3,
        }, 0);
      });

      timelineRef.current = tl;
    }

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };
  }, [speed, intensity]);

  useEffect(() => {
    // Управляем скоростью анимации
    if (timelineRef.current) {
      const shouldSpeedUp = isHovered || isActive || isScrolled;
      timelineRef.current.timeScale(shouldSpeedUp ? 1.5 : 1);
    }
  }, [isHovered, isActive, isScrolled]);

  const addToPaths = (el: HTMLDivElement | null) => {
    if (el && !pathsRef.current.includes(el)) {
      pathsRef.current.push(el);
    }
  };

  const addToNodes = (el: HTMLDivElement | null) => {
    if (el && !nodesRef.current.includes(el)) {
      nodesRef.current.push(el);
    }
  };

  const generatePathStyle = (index: number) => {
    const size = 30 + index * 20;
    const borderRadius = 15 + index * 5;
    
    return {
      width: `${size}%`,
      height: `${size}%`,
      borderRadius: `${borderRadius}px`,
      top: `${35 - index * 10}%`,
      left: `${35 - index * 10}%`,
      borderWidth: `${1 + index * 0.5}px`,
    };
  };

  return (
    <div 
      ref={containerRef} 
      className={styles.automationContainer}
      data-hovered={isHovered}
      data-active={isActive}
      data-scrolled={isScrolled}
    >
      {[...Array(3)].map((_, i) => (
        <div
          key={`path-${i}`}
          ref={addToPaths}
          className={styles.circuitPath}
          style={generatePathStyle(i)}
        >
          <div className={styles.lightFlow} />
        </div>
      ))}

      {[...Array(5)].map((_, i) => (
        <div
          key={`node-${i}`}
          ref={addToNodes}
          className={styles.circuitNode}
          style={{
            top: `${20 + (i * 15)}%`,
            left: `${20 + (i * 15)}%`,
          }}
        />
      ))}
    </div>
  );
};