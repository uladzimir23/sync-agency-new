import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { BaseBackgroundProps } from '../../HeroBackground.types';
import styles from './PixelBackground.module.scss';

export const PixelBackground: React.FC<BaseBackgroundProps> = ({
  speed = 1,
  intensity = 1,
  isHovered = false,
  isActive = false,
  isScrolled = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);
  
  // Фиксированные размеры сетки: 26 колонок, автоматические строки
  const [rows, setRows] = useState(20);
  const [cols] = useState(26);
  
  // Паттерны начинаются с 8-й строки
  const PATTERN_OFFSET = 9; // Начинаем с 8-й строки (0-индексация)
  
  // Разные паттерны для смены
  const patterns = [
    // Плюс большой
    [
      [0, 12], [0, 13],
      [1, 12], [1, 13],
      [2, 10], [2, 11], [2, 12], [2, 13], [2, 14], [2, 15],
      [3, 10], [3, 11], [3, 12], [3, 13], [3, 14], [3, 15],
      [4, 12], [4, 13],
      [5, 12], [5, 13]
    ],
    
    // Стрелка вправо
    [
      [0, 10], [0, 11], [0, 12],
      [1, 13],
      [2, 14],
      [3, 15],
      [4, 14],
      [5, 13],
      [6, 10], [6, 11], [6, 12]
    ],
    
    // Сердце
    [
      [0, 11], [0, 12], [0, 13], [0, 14],
      [1, 10], [1, 15],
      [2, 9], [2, 16],
      [3, 10], [3, 15],
      [4, 11], [4, 12], [4, 13], [4, 14],
      [5, 12], [5, 13]
    ],
    
    // Крестик
    [
      [0, 12], [0, 13],
      [1, 11], [1, 14],
      [2, 10], [2, 15],
      [3, 10], [3, 15],
      [4, 11], [4, 14],
      [5, 12], [5, 13]
    ],
    
    // Круг/смайлик
    [
      [0, 11], [0, 12], [0, 13], [0, 14],
      [1, 10], [1, 15],
      [2, 10], [2, 15],
      [3, 10], [3, 15],
      [4, 10], [4, 15],
      [5, 11], [5, 12], [5, 13], [5, 14],
      [7, 9], [7, 10],
      [7, 15], [7, 16]
    ]
  ];

  const [currentPatternIndex, setCurrentPatternIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Применяем смещение к паттерну (начинаем с 8-й строки)
  const getOffsetPattern = useCallback((pattern: number[][]) => {
    return pattern.map(([row, col]) => [row + PATTERN_OFFSET, col]);
  }, []);

  // Функция для создания волнового эффекта
  const createWave = useCallback((x: number, y: number) => {
    if (waveRef.current) {
      waveRef.current.style.setProperty('--x', `${x}%`);
      waveRef.current.style.setProperty('--y', `${y}%`);
      
      gsap.fromTo(waveRef.current,
        { opacity: 0.8, scale: 0 },
        {
          opacity: 0,
          scale: 2,
          duration: 1.5 / speed,
          ease: "expo.out"
        }
      );
    }
  }, [speed]);

  // Запускаем смену паттернов
  useEffect(() => {
    // Очищаем предыдущий интервал
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Создаем волну при первой загрузке
    createWave(50, 50);

    // Запускаем интервал для смены паттернов
    intervalRef.current = setInterval(() => {
      setCurrentPatternIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % patterns.length;
        
        // Создаем волну в случайном месте при смене паттерна
        createWave(
          30 + Math.random() * 40, // 30-70%
          30 + Math.random() * 40  // 30-70%
        );
        
        return nextIndex;
      });
    }, 3000 / speed); // Меняем паттерн каждые 6 секунд

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [speed, createWave]);

  // Эффект при активации (hover/scroll)
  useEffect(() => {
    if (isHovered || isActive || isScrolled) {
      // Ускоряем смену паттернов
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
          setCurrentPatternIndex((prevIndex) => {
            const nextIndex = (prevIndex + 1) % patterns.length;
            createWave(50, 50);
            return nextIndex;
          });
        }, 1500 / speed); // В 2 раза быстрее при активации
      }
      
      // Создаем дополнительную волну
      if (Math.random() > 0.7) {
        createWave(
          Math.random() * 100,
          Math.random() * 100
        );
      }
    } else {
      // Возвращаем нормальную скорость
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
          setCurrentPatternIndex((prevIndex) => {
            const nextIndex = (prevIndex + 1) % patterns.length;
            createWave(50, 50);
            return nextIndex;
          });
        }, 3000 / speed);
      }
    }
  }, [isHovered, isActive, isScrolled, speed, createWave]);

  // Адаптация количества строк
  useEffect(() => {
    const updateRows = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        
        // Вычисляем размер ячейки на основе ширины и количества колонок
        const cellSize = width / cols;
        
        // Вычисляем количество строк на основе высоты и размера ячейки
        // Добавляем запас для паттерна (PATTERN_OFFSET + высота паттерна ~ 8 + 6 = 14 строк)
        const calculatedRows = Math.max(20, Math.ceil(height / cellSize));
        
        setRows(calculatedRows);
      }
    };

    updateRows();
    const resizeObserver = new ResizeObserver(updateRows);
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    return () => {
      resizeObserver.disconnect();
    };
  }, [cols]);

  // Текущий паттерн со смещением
  const currentPattern = getOffsetPattern(patterns[currentPatternIndex]);

  // Оптимизированный рендеринг сетки
  const renderGrid = useCallback(() => {
    const cells = [];
    const totalCells = rows * cols;

    for (let i = 0; i < totalCells; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;
      
      // Проверяем, находится ли ячейка в текущем паттерне
      const isActive = currentPattern.some(([patternRow, patternCol]) => 
        patternRow === row && patternCol === col
      );

      cells.push(
        <div
          key={`${row}-${col}`}
          className={`${styles.cell} ${isActive ? styles.active : ''}`}
          data-row={row}
          data-col={col}
          data-active={isActive}
          style={{
            animationDelay: `${(row * 0.1 + col * 0.05) % 2}s`
          }}
        />
      );
    }

    return cells;
  }, [rows, cols, currentPattern]);

  return (
    <div 
      ref={containerRef} 
      className={styles.pixelContainer}
      data-hovered={isHovered}
      data-active={isActive}
      data-scrolled={isScrolled}
      data-pattern={currentPatternIndex}
    >
      <div 
        className={styles.matrixGrid}
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`
        }}
      >
        {renderGrid()}
      </div>
      
      {/* Элемент для волновых эффектов */}
      <div ref={waveRef} className={styles.waveEffect} />
    </div>
  );
};