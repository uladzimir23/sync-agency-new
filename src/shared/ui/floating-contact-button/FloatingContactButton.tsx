import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';
import './FloatingContactButton.scss';

export interface FloatingContactButtonProps {
  /** Текст для круговой анимации */
  circularText?: string;
  /** Длительность вращения кругового текста */
  spinDuration?: number;
  /** Поведение при наведении */
  onHover?: 'slowDown' | 'speedUp' | 'pause' | 'goBonkers';
  /** Дополнительные классы */
  className?: string;
  /** Обработчик клика */
  onClick?: () => void;
  /** Радиус кругового текста */
  radius?: number;
  /** Размер шрифта кругового текста */
  fontSize?: number;
}

export const FloatingContactButton: React.FC<FloatingContactButtonProps> = ({
  circularText = "Get in touch • ",
  spinDuration = 20,
  onHover = 'slowDown',
  className = '',
  onClick,
  radius = 90,
  fontSize = 14
}) => {
  const letters = Array.from(circularText);
  const controls = useAnimation();
  const rotation = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const getRotationTransition = (duration: number, from: number, loop: boolean = true) => ({
    from,
    to: from + 360,
    ease: 'linear',
    duration,
    type: 'tween' as const,
    repeat: loop ? Infinity : 0
  });

  const getTransition = (duration: number, from: number) => ({
    rotate: getRotationTransition(duration, from),
    scale: {
      type: 'spring',
      damping: 20,
      stiffness: 300
    }
  });

  useEffect(() => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start)
    });
  }, [spinDuration, circularText, controls, rotation]);

  const handleHoverStart = () => {
    if (!onHover) return;
    
    setIsHovered(true);
    const start = rotation.get();

    let transitionConfig: any;
    let scaleVal = 1;

    switch (onHover) {
      case 'slowDown':
        transitionConfig = getTransition(spinDuration * 2, start);
        break;
      case 'speedUp':
        transitionConfig = getTransition(spinDuration / 4, start);
        break;
      case 'pause':
        transitionConfig = {
          rotate: { type: 'spring', damping: 20, stiffness: 300 },
          scale: { type: 'spring', damping: 20, stiffness: 300 }
        };
        break;
      case 'goBonkers':
        transitionConfig = getTransition(spinDuration / 20, start);
        scaleVal = 0.8;
        break;
      default:
        transitionConfig = getTransition(spinDuration, start);
    }

    controls.start({
      rotate: start + 360,
      scale: scaleVal,
      transition: transitionConfig
    });
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start)
    });
  };

  const handleClick = () => {
    // Добавляем микровзаимодействие при клике
    if (buttonRef.current) {
      buttonRef.current.style.transform = 'scale(0.95)';
      setTimeout(() => {
        if (buttonRef.current) {
          buttonRef.current.style.transform = 'scale(1)';
        }
      }, 150);
    }
    
    if (onClick) {
      onClick();
    } else {
      // Дефолтное поведение - скролл к контактам или открытие модалки
      console.log('Get in touch clicked!');
    }
  };

  return (
    <div className={`floating-contact-button ${className}`}>
      <div className="floating-contact-button__container">
        {/* Круговой текст */}
        <motion.div
          className="floating-contact-button__circular-text"
          style={{ 
            rotate: rotation,
            width: radius * 2,
            height: radius * 2
          }}
          initial={{ rotate: 0 }}
          animate={controls}
          onMouseEnter={handleHoverStart}
          onMouseLeave={handleHoverEnd}
        >
          {letters.map((letter, i) => {
            const rotationDeg = (360 / letters.length) * i;
            const rad = (rotationDeg * Math.PI) / 180;
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius;
            
            const transform = `translate3d(${x}px, ${y}px, 0) rotateZ(${rotationDeg}deg)`;

            return (
              <span
                key={i}
                className="floating-contact-button__letter"
                style={{ 
                  transform,
                  fontSize: `${fontSize}px`,
                  color: 'var(--text-primary)'
                }}
              >
                {letter}
              </span>
            );
          })}
        </motion.div>

        {/* Центральная кнопка */}
        <button
          ref={buttonRef}
          className="floating-contact-button__button"
          onClick={handleClick}
          onMouseEnter={handleHoverStart}
          onMouseLeave={handleHoverEnd}
          aria-label="Get in touch"
        >
          <div className="floating-contact-button__icon">
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0034 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.9C9.87812 3.30493 11.1801 2.99656 12.5 3H13C15.0843 3.11499 17.053 3.99477 18.5291 5.47087C20.0052 6.94696 20.885 8.91565 21 11V11.5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          
          {/* Всплывающий текст при ховере */}
          <div className={`floating-contact-button__tooltip ${isHovered ? 'floating-contact-button__tooltip--visible' : ''}`}>
            <span>Get in touch</span>
            <div className="floating-contact-button__tooltip-arrow"></div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default FloatingContactButton;