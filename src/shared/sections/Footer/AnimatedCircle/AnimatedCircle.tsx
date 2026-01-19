import React, { useEffect, useRef } from 'react';
import styles from './AnimatedCircle.module.scss';

export const AnimatedCircle: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Создание частиц
    const createParticles = () => {
      if (!particlesRef.current) return;
      
      particlesRef.current.innerHTML = '';
      const particleCount = 30;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = styles.particle;
        
        const size = Math.random() * 4 + 1;
        const left = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = 15 + Math.random() * 15;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        particlesRef.current.appendChild(particle);
      }
    };

    // Динамические эффекты
    const updateDynamicEffects = () => {
      if (!wrapperRef.current) return;
      
      const randomScale = 0.94 + Math.random() * 0.05;
      wrapperRef.current.style.setProperty('--wrapper-scale', randomScale.toString());
    };

    createParticles();
    
    const scaleInterval = setInterval(updateDynamicEffects, 8000);
    
    return () => {
      clearInterval(scaleInterval);
    };
  }, []);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <div className={styles.siriStyle}>
        <div className={styles.ssCoreOcean}>
          {[...Array(6)].map((_, index) => (
            <div 
              key={index}
              className={styles.ssLayerOcean}
              style={{
                transform: `translateZ(-${index * 40}px) scale(${1 - index * 0.04})`,
                opacity: 1 - index * 0.1,
              }}
            />
          ))}
        </div>
      </div>
      <div className={styles.particles} ref={particlesRef} />
    </div>
  );
};