import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { BaseBackgroundProps } from '../../HeroBackground.types';
import styles from './DataBackground.module.scss';

export const DataBackground: React.FC<BaseBackgroundProps> = ({
  speed = 1,
  intensity = 1,
  isHovered = false,
  isActive = false,
  isScrolled = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<HTMLDivElement[]>([]);
  const connectionsRef = useRef<HTMLDivElement[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (!timelineRef.current) {
      const tl = gsap.timeline({ repeat: -1 });
      
      // Анимация узлов (дрожание)
      nodesRef.current.forEach((node, index) => {
        tl.to(node, {
          duration: 1 + Math.random() * 2 / speed,
          x: `+=${4 * intensity * (Math.random() - 0.5)}`,
          y: `+=${4 * intensity * (Math.random() - 0.5)}`,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.1,
        }, 0);

        // Пульсация свечения
        tl.to(node, {
          duration: 2 / speed,
          scale: 1 + (0.3 * intensity),
          opacity: 0.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.05,
        }, 0);
      });

      // Анимация соединений (появление/исчезновение)
      connectionsRef.current.forEach((connection, index) => {
        tl.to(connection, {
          duration: 3 / speed,
          opacity: 0.3 + (Math.random() * 0.4),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.15,
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

  const addToNodes = (el: HTMLDivElement | null) => {
    if (el && !nodesRef.current.includes(el)) {
      nodesRef.current.push(el);
    }
  };

  const addToConnections = (el: HTMLDivElement | null) => {
    if (el && !connectionsRef.current.includes(el)) {
      connectionsRef.current.push(el);
    }
  };

  // Генерация случайных позиций для узлов
  const generatePositions = (count: number) => {
    return Array.from({ length: count }, () => ({
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
    }));
  };

  const nodePositions = generatePositions(12);

  return (
    <div 
      ref={containerRef} 
      className={styles.dataContainer}
      data-hovered={isHovered}
      data-active={isActive}
      data-scrolled={isScrolled}
    >
      {/* Соединения между узлами */}
      {nodePositions.slice(0, 8).map((pos, i) => (
        <div
          key={`conn-${i}`}
          ref={addToConnections}
          className={styles.connection}
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            width: `${Math.random() * 100 + 50}px`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}

      {/* Узлы */}
      {nodePositions.map((pos, i) => (
        <div
          key={`node-${i}`}
          ref={addToNodes}
          className={styles.node}
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            width: `${8 + (i % 3) * 4}px`,
            height: `${8 + (i % 3) * 4}px`,
          }}
        />
      ))}
    </div>
  );
};