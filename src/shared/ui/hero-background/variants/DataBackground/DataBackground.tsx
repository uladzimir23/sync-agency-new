import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './DataBackground.module.scss';

interface DataBackgroundProps {
  speed?: number;
  intensity?: number;
}

export const DataBackground: React.FC<DataBackgroundProps> = ({
  speed = 1,
  intensity = 1
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<HTMLDivElement[]>([]);
  const connectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Анимация узлов (дрожание)
      nodesRef.current.forEach((node, index) => {
        gsap.to(node, {
          duration: 1 + Math.random() * 2 / speed,
          x: `+=${4 * intensity * (Math.random() - 0.5)}`,
          y: `+=${4 * intensity * (Math.random() - 0.5)}`,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.1,
        });

        // Пульсация свечения
        gsap.to(node, {
          duration: 2 / speed,
          scale: 1 + (0.3 * intensity),
          opacity: 0.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.05,
        });
      });

      // Анимация соединений (появление/исчезновение)
      connectionsRef.current.forEach((connection, index) => {
        gsap.to(connection, {
          duration: 3 / speed,
          opacity: 0.3 + (Math.random() * 0.4),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.15,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [speed, intensity]);

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
    <div ref={containerRef} className={styles.dataContainer}>
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