import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';
import { BaseBackgroundProps } from '../../HeroBackground.types';
import styles from './PerformanceBackground.module.scss';
import {
  FaBolt,
  FaChartLine,
  FaCheckCircle,
  FaCircle,
  FaRunning,
  FaDesktop,
  FaBrain,
  FaHdd,
  FaSatelliteDish,
  FaLink,
  FaEnvelope,
  FaStopwatch,
  FaSyncAlt,
  FaCogs,
  FaNetworkWired,
  FaServer,
  FaDatabase,
  FaTachometerAlt,
  FaExclamationTriangle,
  FaCaretUp,
  FaCaretDown,
  FaMinus
} from 'react-icons/fa';
import { GiProcessor } from 'react-icons/gi';
import { MdSpeed, MdMemory, MdSecurity } from 'react-icons/md';

interface PerformanceMetric {
  id: string;
  category: 'latency' | 'throughput' | 'errors' | 'uptime' | 'response' | 'cpu' | 'memory' | 'cache' | 'bandwidth' | 'connections' | 'requests' | 'queue' | 'availability';
  label: string;
  value: string;
  unit: string;
  change: {
    value: string;
    direction: 'up' | 'down' | 'neutral';
  };
  status: 'optimal' | 'good' | 'warning';
  color: string;
  icon: React.ReactNode;
}

export const PerformanceBackground: React.FC<BaseBackgroundProps> = ({
  speed = 1,
  intensity = 1,
  isHovered = false,
  isActive = false,
  isScrolled = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [isAnimatingDown, setIsAnimatingDown] = useState(true);
  const [currentCycle, setCurrentCycle] = useState(0);

  // Большой набор данных производительности с иконками
  const performanceData: PerformanceMetric[] = useMemo(() => [
    {
      id: 'latency',
      category: 'latency',
      label: 'API Latency',
      value: '12',
      unit: 'ms',
      change: { value: '2.4', direction: 'down' },
      status: 'optimal',
      color: 'var(--page-title-cyan-text)',
      icon: <FaBolt />
    },
    {
      id: 'throughput',
      category: 'throughput',
      label: 'Throughput',
      value: '4.2',
      unit: 'k/s',
      change: { value: '0.8k', direction: 'up' },
      status: 'good',
      color: 'var(--page-title-green-text)',
      icon: <FaChartLine />
    },
    {
      id: 'errors',
      category: 'errors',
      label: 'Error Rate',
      value: '0.02',
      unit: '%',
      change: { value: '0.01', direction: 'down' },
      status: 'optimal',
      color: 'var(--page-title-green-text)',
      icon: <FaCheckCircle />
    },
    {
      id: 'uptime',
      category: 'uptime',
      label: 'Service Uptime',
      value: '99.98',
      unit: '%',
      change: { value: '0.02', direction: 'up' },
      status: 'optimal',
      color: 'var(--page-title-blue-text)',
      icon: <FaCircle />
    },
    {
      id: 'response',
      category: 'response',
      label: 'Response Time',
      value: '45',
      unit: 'ms',
      change: { value: '8ms', direction: 'down' },
      status: 'good',
      color: 'var(--page-title-purple-text)',
      icon: <MdSpeed />
    },
    {
      id: 'cpu',
      category: 'cpu',
      label: 'CPU Usage',
      value: '32',
      unit: '%',
      change: { value: '5%', direction: 'down' },
      status: 'good',
      color: 'var(--page-title-cyan-text)',
      icon: <GiProcessor />
    },
    {
      id: 'memory',
      category: 'memory',
      label: 'Memory',
      value: '58',
      unit: '%',
      change: { value: '3%', direction: 'up' },
      status: 'warning',
      color: '#ffc107',
      icon: <MdMemory />
    },
    {
      id: 'cache',
      category: 'cache',
      label: 'Cache Hit',
      value: '94',
      unit: '%',
      change: { value: '2%', direction: 'up' },
      status: 'optimal',
      color: 'var(--page-title-green-text)',
      icon: <FaDatabase />
    },
    {
      id: 'bandwidth',
      category: 'bandwidth',
      label: 'Bandwidth',
      value: '1.8',
      unit: 'Gbps',
      change: { value: '0.4', direction: 'up' },
      status: 'good',
      color: 'var(--page-title-blue-text)',
      icon: <FaTachometerAlt />
    },
    {
      id: 'connections',
      category: 'connections',
      label: 'Connections',
      value: '8.7',
      unit: 'k',
      change: { value: '1.2k', direction: 'up' },
      status: 'good',
      color: 'var(--page-title-purple-text)',
      icon: <FaNetworkWired />
    },
    {
      id: 'requests',
      category: 'requests',
      label: 'Requests',
      value: '12.4',
      unit: 'k/s',
      change: { value: '3.1k', direction: 'up' },
      status: 'optimal',
      color: 'var(--page-title-cyan-text)',
      icon: <FaEnvelope />
    },
    {
      id: 'queue',
      category: 'queue',
      label: 'Queue Depth',
      value: '0.8',
      unit: 'ms',
      change: { value: '0.3', direction: 'down' },
      status: 'optimal',
      color: 'var(--page-title-green-text)',
      icon: <FaStopwatch />
    },
    {
      id: 'availability',
      category: 'availability',
      label: 'Availability',
      value: '99.95',
      unit: '%',
      change: { value: '0.05', direction: 'up' },
      status: 'optimal',
      color: 'var(--page-title-blue-text)',
      icon: <FaSyncAlt />
    }
  ], []);

  // Состояние для анимированных значений
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>(
    performanceData.reduce((acc, metric) => ({
      ...acc,
      [metric.id]: 0
    }), {})
  );

  // Группируем метрики по 4 для отображения
  const [visibleMetrics, setVisibleMetrics] = useState<PerformanceMetric[]>([]);
  
  // Индекс для карусели
  const [currentIndex, setCurrentIndex] = useState(0);

  // Форматирование значений с анимацией
  const formatAnimatedValue = useCallback((metric: PerformanceMetric): string => {
    const value = animatedValues[metric.id] || 0;
    
    if (metric.unit === 'k' || metric.unit === 'k/s') {
      return (value / 1000).toFixed(1) + metric.unit;
    }
    
    if (metric.id === 'errors' || metric.id === 'uptime' || metric.id === 'availability' || metric.category === 'cache') {
      return value.toFixed(2) + metric.unit;
    }
    
    return Math.round(value) + metric.unit;
  }, [animatedValues]);

  // Анимация счетчиков для видимых метрик
  useEffect(() => {
    visibleMetrics.forEach(metric => {
      const targetValue = parseFloat(metric.value);
      const duration = 1.2 / speed;
      
      gsap.to(animatedValues, {
        [metric.id]: targetValue,
        duration: duration,
        ease: 'power2.out',
        onUpdate: () => {
          setAnimatedValues({ ...animatedValues });
        }
      });
    });
  }, [speed, visibleMetrics]);

  // Инициализация карусели
  useEffect(() => {
    // Начинаем с первых 4 метрик
    setVisibleMetrics(performanceData.slice(0, 4));
  }, [performanceData]);

  // Карусель автоматической прокрутки
  useEffect(() => {
    if (!carouselRef.current || performanceData.length === 0) return;

    // Очищаем предыдущую анимацию
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const tl = gsap.timeline({ 
      repeat: -1,
      onRepeat: () => {
        setCurrentCycle(prev => prev + 1);
      }
    });

    // Анимация скролла вниз
    const scrollDown = () => {
      setIsAnimatingDown(true);
      
      // Находим следующий набор метрик (4 штуки)
      const nextIndex = (currentIndex + 4) % performanceData.length;
      const nextMetrics = performanceData.slice(nextIndex, nextIndex + 4);
      
      // Если не хватает метрик, добавляем с начала
      if (nextMetrics.length < 4) {
        const remaining = 4 - nextMetrics.length;
        nextMetrics.push(...performanceData.slice(0, remaining));
      }
      
      // Анимация исчезновения текущих метрик
      tl.to(carouselRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.4 / speed,
        ease: 'power2.in',
        onComplete: () => {
          setVisibleMetrics(nextMetrics);
          setCurrentIndex(nextIndex);
        }
      });
      
      // Появление новых метрик
      tl.to(carouselRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.4 / speed,
        ease: 'power2.out'
      }, '-=0.2');
    };

    // Анимация скролла вверх
    const scrollUp = () => {
      setIsAnimatingDown(false);
      
      // Находим предыдущий набор метрик
      let prevIndex = currentIndex - 4;
      if (prevIndex < 0) {
        prevIndex = performanceData.length + prevIndex;
      }
      
      const prevMetrics = performanceData.slice(prevIndex, prevIndex + 4);
      
      // Если не хватает метрик, добавляем с конца
      if (prevMetrics.length < 4) {
        const remaining = 4 - prevMetrics.length;
        prevMetrics.push(...performanceData.slice(-remaining));
      }
      
      // Анимация исчезновения текущих метрик
      tl.to(carouselRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.4 / speed,
        ease: 'power2.in',
        onComplete: () => {
          setVisibleMetrics(prevMetrics);
          setCurrentIndex(prevIndex);
        }
      });
      
      // Появление новых метрик
      tl.to(carouselRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.4 / speed,
        ease: 'power2.out'
      }, '-=0.2');
    };

    // Задержка перед началом анимации
    tl.to({}, {
      duration: 3 / speed
    });

    // Чередуем направление скролла
    if (currentCycle % 2 === 0) {
      scrollDown();
    } else {
      scrollUp();
    }

    // Пауза между циклами
    tl.to({}, {
      duration: 3 / speed
    });

    timelineRef.current = tl;

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [speed, currentCycle, currentIndex, performanceData]);

  // Реакция на hover/active/scroll
  useEffect(() => {
    if (!containerRef.current) return;

    const shouldAnimate = isHovered || isActive || isScrolled;
    
    gsap.to(containerRef.current, {
      opacity: shouldAnimate ? 1 : 0.9,
      scale: shouldAnimate ? 1.02 : 1,
      duration: 0.2,
      ease: 'power2.out'
    });

    // Управление анимацией карусели
    if (timelineRef.current) {
      if (shouldAnimate) {
        timelineRef.current.timeScale(2 * speed); // Ускоряем при взаимодействии
        gsap.to(`.${styles.performanceMetric}`, {
          background: 'rgba(86, 156, 254, 0.05)',
          duration: 0.2,
          ease: 'power2.out',
          stagger: 0.05
        });
      } else {
        timelineRef.current.timeScale(1 * speed);
        gsap.to(`.${styles.performanceMetric}`, {
          background: 'transparent',
          duration: 0.2,
          ease: 'power2.out'
        });
      }
    }
  }, [isHovered, isActive, isScrolled, speed]);

  // Получение класса для статуса
  const getStatusClass = useCallback((status: string): string => {
    switch (status) {
      case 'optimal': return styles.statusOptimal;
      case 'good': return styles.statusGood;
      default: return styles.statusWarning;
    }
  }, []);

  // Получение класса для изменения значения
  const getChangeClass = useCallback((direction: 'up' | 'down' | 'neutral'): string => {
    switch (direction) {
      case 'up': return styles.changePositive;
      case 'down': return styles.changeNegative;
      default: return styles.changeNeutral;
    }
  }, []);

  // Получение иконки для направления изменения
  const getChangeIcon = useCallback((direction: 'up' | 'down' | 'neutral'): React.ReactNode => {
    switch (direction) {
      case 'up': return <FaCaretUp />;
      case 'down': return <FaCaretDown />;
      default: return <FaMinus />;
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className={styles.performanceContainer}
      data-hovered={isHovered}
      data-active={isActive}
      data-scrolled={isScrolled}
      data-direction={isAnimatingDown ? 'down' : 'up'}
    >

      {/* Карусель метрик */}
      <div 
        ref={carouselRef}
        className={styles.carouselContainer}
      >
        {visibleMetrics.map((metric) => (
          <div
            key={metric.id}
            className={styles.performanceMetric}
            data-category={metric.category}
            data-status={metric.status}
          >
            {/* Левая часть: Иконка и метка */}
            <div className={styles.metricLeft}>
              <span 
                className={styles.metricIcon}
                style={{ color: metric.color }}
              >
                {metric.icon}
              </span>
              <span className={styles.metricLabel}>{metric.label}</span>
            </div>

            {/* Центральная часть: Значение */}
            <div className={styles.metricCenter}>
              <span 
                className={styles.metricValue}
                style={{ color: metric.color }}
              >
                {formatAnimatedValue(metric)}
              </span>
            </div>

            {/* Правая часть: Изменение и статус */}
            <div className={styles.metricRight}>
              <span className={`${styles.changeValue} ${getChangeClass(metric.change.direction)}`}>
                <span className={styles.changeIcon}>
                  {getChangeIcon(metric.change.direction)}
                </span>
                {metric.change.value}
              </span>
              <div className={`${styles.statusBadge} ${getStatusClass(metric.status)}`}>
                <span className={styles.statusDot} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};