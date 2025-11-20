import React, { useEffect, useRef, useMemo } from 'react';
import './AnimatedGradient.scss';

interface AnimatedGradientProps {
  size?: string | number;
  borderWidth?: number;
  gradientColors?: string[];
  animationSpeed?: number;
  blurAmount?: number;
  className?: string;
  style?: React.CSSProperties;
  enableRotation?: boolean;
  enablePulse?: boolean;
}

const AnimatedGradient: React.FC<AnimatedGradientProps> = ({
  size = 300,
  borderWidth = 4,
  gradientColors = [
    'hsl(350, 75%, 60%)',
    'hsl(10, 80%, 65%)', 
    'hsl(220, 80%, 65%)',
    'hsl(280, 70%, 60%)'
  ],
  animationSpeed = 15,
  blurAmount = 1,
  className = '',
  style = {},
  enableRotation = true,
  enablePulse = true
}) => {
  const gradientRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);

  const gradientString = useMemo(() => {
    return `linear-gradient(135deg, ${gradientColors.join(', ')})`;
  }, [gradientColors]);

  const conicGradientString = useMemo(() => {
    return `conic-gradient(from 0deg, ${gradientColors.join(', ')})`;
  }, [gradientColors]);

  useEffect(() => {
    if (!gradientRef.current || !borderRef.current) return;

    const updateMousePosition = (ev: MouseEvent) => {
      if (!gradientRef.current) return;
      
      const { left, top, width, height } = gradientRef.current.getBoundingClientRect();
      const x = ((ev.clientX - left) / width) * 100;
      const y = ((ev.clientY - top) / height) * 100;
      
      gradientRef.current.style.setProperty('--mouse-x', `${x}%`);
      gradientRef.current.style.setProperty('--mouse-y', `${y}%`);
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  const rootStyle: React.CSSProperties = {
    '--animation-speed': `${animationSpeed}s`,
    '--blur-amount': `blur(${blurAmount}px)`,
    '--border-width': `${borderWidth}px`,
    width: typeof size === 'number' ? `${size}px` : size,
    height: typeof size === 'number' ? `${size}px` : size,
    ...style
  };

  const gradientStyle: React.CSSProperties = {
    background: gradientString,
  };

  const borderStyle: React.CSSProperties = {
    background: conicGradientString,
    padding: `${borderWidth}px`,
  };

  const wrapperClassNames = [
    'animated-gradient-v2',
    className,
    enableRotation ? 'with-rotation' : '',
    enablePulse ? 'with-pulse' : ''
  ].filter(Boolean).join(' ');

  return (
    <div 
      ref={gradientRef}
      className={wrapperClassNames}
      style={rootStyle}
    >
      <div 
        ref={borderRef}
        className="gradient-border"
        style={borderStyle}
      >
        <div className="gradient-content">
          <div 
            className="main-gradient"
            style={gradientStyle}
          />
        </div>
      </div>
    </div>
  );
};

export default AnimatedGradient;