import React, { useState, useMemo, useRef, useEffect } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroBackground, HeroBackgroundType } from '@/shared/ui/hero-background';
import { Button } from '@/shared/ui/button';
import styles from './ProductHeroSection.module.scss';

// Регистрируем плагин ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface ProductHeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  onCtaClick: () => void;
  backgroundType: HeroBackgroundType;
  className?: string;
  id?: string;
}

// Маппинг типов фона к цветовым схемам
const COLOR_SCHEMES: Record<HeroBackgroundType, string> = {
  brand: 'blue',
  marketing: 'red',
  product: 'green',
  data: 'cyan',
  automation: 'purple',
} as const;

export const ProductHeroSection: React.FC<ProductHeroSectionProps> = ({
  title,
  subtitle,
  description,
  ctaText,
  onCtaClick,
  backgroundType,
  className = '',
  id
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolledTriggered, setIsScrolledTriggered] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const isMobile = typeof window !== 'undefined' ? window.innerWidth <= 767 : false;

  // Получаем цветовую схему на основе типа фона
  const colorScheme = useMemo(() => COLOR_SCHEMES[backgroundType] || 'blue', [backgroundType]);

  // Определяем классы для subtitle
  const subtitleClasses = useMemo(() => {
    const baseClass = styles.subtitle;
    const sizeClass = styles.medium;
    
    // Добавляем цветной класс только при активности
    const isActive = isHovered || isScrolledTriggered;
    const colorClass = isActive ? (styles[`${colorScheme}Color`] || '') : '';
    
    return `${baseClass} ${sizeClass} ${colorClass}`;
  }, [colorScheme, isHovered, isScrolledTriggered]);

  // Эффект для ScrollTrigger на мобильных устройствах
  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return;

    const container = containerRef.current;
    const mm = gsap.matchMedia();
    
    // Только для мобильных устройств (max-width: 767px)
    mm.add("(max-width: 767px)", () => {
      const trigger = ScrollTrigger.create({
        trigger: container,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => {
          setIsScrolledTriggered(true);
          container.setAttribute('data-scrolled', 'true');
          container.setAttribute('data-active', 'true');
        },
        onEnterBack: () => {
          setIsScrolledTriggered(true);
          container.setAttribute('data-scrolled', 'true');
          container.setAttribute('data-active', 'true');
        },
        onLeave: () => {
          setIsScrolledTriggered(false);
          container.setAttribute('data-scrolled', 'false');
          container.setAttribute('data-active', 'false');
        },
        onLeaveBack: () => {
          setIsScrolledTriggered(false);
          container.setAttribute('data-scrolled', 'false');
          container.setAttribute('data-active', 'false');
        },
        scrub: 0.5,
        toggleActions: "play none none reverse",
        markers: false,
      });

      return () => {
        trigger.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  // Общее состояние активности
  const isActive = isHovered || isScrolledTriggered;

  return (
    <section
      ref={containerRef}
      className={`${styles.container} ${className}`}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onTouchStart={() => isMobile && setIsHovered(true)}
      onTouchEnd={() => isMobile && setTimeout(() => setIsHovered(false), 100)}
      data-type={backgroundType}
      data-color-scheme={colorScheme}
      data-hovered={isHovered}
      data-scrolled={isScrolledTriggered}
      data-active={isActive}
      id={id}
    >
      <div className={styles.backgroundWrapper}>
        <HeroBackground 
          type={backgroundType} 
          speed={1}
          intensity={1}
          isHovered={isHovered}
          isActive={isActive}
          isScrolled={isScrolledTriggered}
        />
      </div>

      {/* Стрелка в правом верхнем углу */}

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <span className={subtitleClasses}>{subtitle}</span>
              <div className={`${styles.arrowContainer} ${isActive ? styles.arrowVisible : ''}`}>
              <FiArrowUpRight className={styles.arrow} />
              </div>
          </div>

          <h1 className={styles.title}>{title}</h1>
        </div>
        
        <div className={`${styles.description} ${isActive ? styles.descriptionVisible : ''}`}>
          {description}
        </div>
        
      </div>
    </section>
  );
};