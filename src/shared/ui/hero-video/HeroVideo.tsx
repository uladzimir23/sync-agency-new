import React, { useRef, useEffect, useState } from 'react';
import { useDeviceType } from '@/shared/hooks/useDeviceType';
import styles from './HeroVideo.module.scss';

interface HeroVideoProps {
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
}

export const HeroVideo: React.FC<HeroVideoProps> = ({
  className = '',
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isMobile, isTablet } = useDeviceType();
  const [isInView, setIsInView] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Выбор видео в зависимости от устройства
  const videoSrc = isMobile || isTablet 
    ? '/src/shared/assets/video/Mobile.webm'
    : '/src/shared/assets/video/Desktop.webm';

  // Intersection Observer для отслеживания видимости
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
          
          if (videoRef.current) {
            if (entry.isIntersecting) {
              // Видео в зоне видимости - воспроизводим
              videoRef.current.play().catch(e => {
                console.log('Auto-play prevented:', e);
              });
            } else {
              // Видео вне зоны видимости - ставим на паузу
              videoRef.current.pause();
            }
          }
        });
      },
      {
        threshold: 0.5, // 50% видимости
        rootMargin: '50px', // Отступы для более плавного переключения
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  // Обработчик загрузки видео
  const handleVideoLoad = () => {
    setIsLoaded(true);
  };

  // Полифил для WebM в Safari (если нужно)
  useEffect(() => {
    const checkSafariSupport = async () => {
      if (typeof document === 'undefined') return;
      
      const video = document.createElement('video');
      const canPlayWebM = video.canPlayType('video/webm; codecs="vp9,opus"');
      
      if (canPlayWebM === '' || canPlayWebM === 'no') {
        console.log('Safari detected - using optimized settings');
      }
    };
    
    checkSafariSupport();
  }, []);

  return (
    <div className={`${styles.videoContainer} ${className}`}>
      {/* Прелоадер */}
      {!isLoaded && (
        <div className={styles.videoLoader}>
          <div className={styles.loaderSpinner}></div>
        </div>
      )}

      {/* Видео элемент */}
      <video
        ref={videoRef}
        className={`${styles.heroVideo} ${isLoaded ? styles.loaded : ''}`}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        preload="metadata" // Оптимизация загрузки
        onLoadedData={handleVideoLoad}
        onCanPlayThrough={handleVideoLoad}
        // Атрибуты для оптимизации производительности
        disablePictureInPicture
        disableRemotePlayback
      >
        <source src={videoSrc} type="video/webm" />
        {/* Можно добавить дополнительные форматы для лучшей совместимости */}
        {/* <source src="/src/shared/assets/video/Desktop.mp4" type="video/mp4" /> */}
        Ваш браузер не поддерживает видео.
      </video>

      {/* Затемнение для лучшей читаемости текста поверх видео */}
      <div className={styles.videoOverlay}></div>
    </div>
  );
};