import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './AutomationBackground.module.scss';


interface AutomationBackgroundProps {
  speed?: number;
  intensity?: number;
}

export const AutomationBackground: React.FC<AutomationBackgroundProps> = ({
  speed = 1,
  intensity = 1
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathsRef = useRef<HTMLDivElement[]>([]);
  const nodesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Анимация бегущего света по контурам
      pathsRef.current.forEach((path, index) => {
        const light = path.querySelector(`.${styles.lightFlow}`) as HTMLElement;
        if (light) {
          gsap.to(light, {
            duration: 4 / speed,
            left: '100%',
            repeat: -1,
            ease: "none",
            delay: index * 0.5,
          });
        }

        // Пульсация контуров
        gsap.to(path, {
          duration: 3 / speed,
          opacity: 0.4 + (0.3 * intensity),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2,
        });
      });

      // Мигание узлов
      nodesRef.current.forEach((node, index) => {
        gsap.to(node, {
          duration: 1.5 / speed,
          scale: 1.5,
          opacity: 1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.3,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [speed, intensity]);

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
    const size = 60 + index * 20;
    const borderRadius = 20 + index * 10;
    
    return {
      width: `${size}%`,
      height: `${size}%`,
      borderRadius: `${borderRadius}px`,
      top: `${20 - index * 5}%`,
      left: `${20 - index * 5}%`,
      borderWidth: `${1 + index * 0.5}px`,
    };
  };

  return (
    <div ref={containerRef} className={styles.automationContainer}>
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