import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  onCtaClick?: () => void;
  backgroundType: HeroBackgroundType;
  className?: string;
  id?: string;
  // Новые пропсы для навигации
  navigateTo?: string;
  onClick?: () => void;
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
  id,
  navigateTo,
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolledTriggered, setIsScrolledTriggered] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const isMobile = typeof window !== 'undefined' ? window.innerWidth <= 767 : false;

  // Получаем цветовую схему на основе типа фона
  const colorScheme = useMemo(() => COLOR_SCHEMES[backgroundType] || 'blue', [backgroundType]);

  // Определяем классы для subtitle
  const subtitleClasses = useMemo(() => {
    const baseClass = styles.subtitle;
    const sizeClass = styles.medium;
    
    const isActive = isHovered || isScrolledTriggered;
    const colorClass = isActive ? `${colorScheme}Color` : '';
    
    return `${baseClass} ${sizeClass} ${colorClass}`.trim();
  }, [colorScheme, isHovered, isScrolledTriggered]);

  // Обработчик клика по всему компоненту
  const handleContainerClick = () => {
    if (onClick) {
      onClick();
    } else if (navigateTo) {
      navigate(navigateTo);
    } else if (onCtaClick) {
      onCtaClick();
    }
  };

  // Обработчик клика по кнопке CTA
  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onCtaClick) {
      onCtaClick();
    } else {
      handleContainerClick();
    }
  };

  // Эффект для ScrollTrigger
  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return;

    const container = containerRef.current;
    const mm = gsap.matchMedia();
    
    mm.add("(max-width: 767px)", () => {
      const trigger = ScrollTrigger.create({
        trigger: container,
        start: "top 20%",
        end: "bottom 80%",
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

  const isActive = isHovered || isScrolledTriggered;

  return (
    <section
      ref={containerRef}
      className={`${styles.container} ${className}`}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onTouchStart={() => isMobile && setIsHovered(true)}
      onTouchEnd={() => isMobile && setTimeout(() => setIsHovered(false), 100)}
      onClick={handleContainerClick}
      data-type={backgroundType}
      data-color-scheme={colorScheme}
      data-hovered={isHovered}
      data-scrolled={isScrolledTriggered}
      data-active={isActive}
      id={id}
      style={{ cursor: 'pointer' }}
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

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <span className={subtitleClasses}>{subtitle}</span>
            <div className={`${styles.arrowContainer} ${isActive ? styles.arrowVisible : ''}`}>
              <div className={styles.arrow}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M0 14.0904L0 10.6205H16.3636C15.2253 9.55926 14.6453 8.92032 13.3636 6.86145C12.4743 5.43281 12 3.10241 11.7273 1.65663L14.7273 0.5C15.4545 2.33133 15.7727 4.54819 18.2727 7.72892C19.8636 9.75301 21.8182 10.3313 24 10.6205V14.0904C21.5455 14.3795 19.5415 15.1087 17.7273 17.8494C15.913 20.5901 15.1818 22.9578 14.7273 24.5L11.7273 23.0542C12.1818 21.8976 12.664 19.9352 13.6364 18.1386C14.6087 16.3419 15.6364 14.9578 16.3636 14.0904H0Z"/>
                </svg>
              </div>
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