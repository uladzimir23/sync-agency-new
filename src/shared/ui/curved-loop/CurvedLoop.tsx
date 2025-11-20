import React, { useRef, useEffect, useState, useMemo, useId, useCallback } from 'react';
import './CurvedLoop.scss';

export interface CurvedLoopProps {
  /** Текст для бегущей строки */
  marqueeText?: string;
  /** Скорость анимации (пикселей в кадр) */
  speed?: number;
  /** Дополнительные классы */
  className?: string;
  /** Степень кривизны траектории */
  curveAmount?: number;
  /** Направление движения */
  direction?: 'left' | 'right';
  /** Включение интерактивности (перетаскивание) */
  interactive?: boolean;
  /** Цвет текста (поддерживает CSS переменные) */
  textColor?: string;
  /** Размер шрифта */
  fontSize?: number;
  /** Высота SVG контейнера */
  height?: number;
}

export const CurvedLoop: React.FC<CurvedLoopProps> = ({
  marqueeText = 'Shadcn is great!',
  speed = 2,
  className = '',
  curveAmount = 400,
  direction = 'left',
  interactive = true,
  textColor = 'var(--text-primary)',
  fontSize = 24,
  height = 120
}) => {
  const text = useMemo(() => {
    const hasTrailing = /\s|\u00A0$/.test(marqueeText);
    return (hasTrailing ? marqueeText.replace(/\s+$/, '') : marqueeText) + '\u00A0';
  }, [marqueeText]);

  const measureRef = useRef<SVGTextElement | null>(null);
  const textPathRef = useRef<SVGTextPathElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  
  const [spacing, setSpacing] = useState(0);
  const [offset, setOffset] = useState(0);
  const [isReady, setIsReady] = useState(false);
  
  const uid = useId();
  const pathId = `curve-${uid.replace(/:/g, '')}`;

  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef<'left' | 'right'>(direction);
  const velRef = useRef(0);
  const animationRef = useRef<number>(0);

  // Рассчитываем путь кривой на основе высоты и кривизны
  const pathD = useMemo(() => 
    `M-100,${height / 2} Q500,${height / 2 + curveAmount} 1540,${height / 2}`,
    [height, curveAmount]
  );

  // Количество повторений текста для бесшовной анимации
  const repetitions = useMemo(() => 
    spacing > 0 ? Math.ceil(2000 / spacing) + 3 : 1,
    [spacing]
  );

  const totalText = useMemo(() => 
    Array(repetitions).fill(text).join(''),
    [repetitions, text]
  );

  // Измерение длины текста
  const measureText = useCallback(() => {
    if (measureRef.current) {
      const length = measureRef.current.getComputedTextLength();
      setSpacing(length);
      setIsReady(true);
    }
  }, []);

  // Инициализация анимации
  const initAnimation = useCallback(() => {
    if (!spacing || !isReady) return;
    
    const step = () => {
      if (!dragRef.current && textPathRef.current) {
        const delta = dirRef.current === 'right' ? speed : -speed;
        const currentOffset = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');
        let newOffset = currentOffset + delta;
        
        // Зацикливание смещения для бесшовной анимации
        const wrapPoint = spacing;
        if (dirRef.current === 'left') {
          if (newOffset <= -wrapPoint) newOffset += wrapPoint;
        } else {
          if (newOffset >= wrapPoint) newOffset -= wrapPoint;
        }
        
        textPathRef.current.setAttribute('startOffset', newOffset + 'px');
        setOffset(newOffset);
      }
      animationRef.current = requestAnimationFrame(step);
    };
    
    animationRef.current = requestAnimationFrame(step);
  }, [spacing, speed, isReady]);

  // Обработчики интерактивности
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (!interactive) return;
    dragRef.current = true;
    lastXRef.current = e.clientX;
    velRef.current = 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [interactive]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!interactive || !dragRef.current || !textPathRef.current) return;
    
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current = dx;
    
    const currentOffset = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');
    let newOffset = currentOffset + dx;
    
    const wrapPoint = spacing;
    if (newOffset <= -wrapPoint) newOffset += wrapPoint;
    if (newOffset >= wrapPoint) newOffset -= wrapPoint;
    
    textPathRef.current.setAttribute('startOffset', newOffset + 'px');
    setOffset(newOffset);
  }, [interactive, spacing]);

  const endDrag = useCallback(() => {
    if (!interactive) return;
    dragRef.current = false;
    dirRef.current = velRef.current > 0 ? 'right' : 'left';
  }, [interactive]);

  // Эффекты
  useEffect(() => {
    measureText();
    const timer = setTimeout(measureText, 50);
    return () => clearTimeout(timer);
  }, [measureText, text, className]);

  useEffect(() => {
    if (isReady && textPathRef.current) {
      textPathRef.current.setAttribute('startOffset', '0px');
      setOffset(0);
    }
  }, [isReady]);

  useEffect(() => {
    initAnimation();
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initAnimation]);

  useEffect(() => {
    dirRef.current = direction;
  }, [direction]);

  const cursorStyle = interactive ? (dragRef.current ? 'grabbing' : 'grab') : 'auto';
  const textStyle = {
    fill: textColor,
    fontSize: `${fontSize}px`
  };

  return (
    <div
      className={`curved-loop ${className}`}
      style={{ 
        visibility: isReady ? 'visible' : 'hidden',
        cursor: cursorStyle,
        height: `${height}px`
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      <svg
        className="curved-loop__svg"
        viewBox={`0 0 1440 ${height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Измерительный текст (скрыт) */}
        <text 
          ref={measureRef} 
          className="curved-loop__measure-text"
          style={textStyle}
        >
          {text}
        </text>
        
        <defs>
          <path 
            ref={pathRef} 
            id={pathId} 
            d={pathD} 
            fill="none" 
            stroke="transparent" 
          />
        </defs>
        
        {/* Видимый текст */}
        {isReady && (
          <text className="curved-loop__display-text" style={textStyle}>
            <textPath 
              ref={textPathRef}
              href={`#${pathId}`}
              startOffset={`${offset}px`}
            >
              {totalText}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};

export default CurvedLoop;