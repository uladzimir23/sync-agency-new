import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'

// Регистрируем плагины
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin)
}

// Lightweight GSAP animations для производительности
export class ColabsysAnimations {
  // Базовая анимация появления
  static fadeIn(element: HTMLElement, options = {}) {
    return gsap.fromTo(element,
      { 
        opacity: 0, 
        y: 20 
      },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        ease: "power2.out",
        ...options 
      }
    )
  }

  // Анимация появления с задержкой для списков
  static staggerIn(elements: HTMLElement[], options = {}) {
    return gsap.fromTo(elements,
      { 
        opacity: 0, 
        y: 30 
      },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.4,
        stagger: 0.1,
        ease: "power2.out",
        ...options 
      }
    )
  }

  // Плавное появление через масштаб
  static scaleIn(element: HTMLElement, options = {}) {
    return gsap.fromTo(element,
      { 
        opacity: 0, 
        scale: 0.8 
      },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 0.4,
        ease: "back.out(1.7)",
        ...options 
      }
    )
  }

  // Анимация для кнопок
  static buttonTap(element: HTMLElement) {
    return gsap.to(element, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    })
  }

  // Hover анимации
  static hoverLift(element: HTMLElement) {
    return gsap.to(element, {
      y: -2,
      duration: 0.2,
      ease: "power2.out"
    })
  }

  static hoverReset(element: HTMLElement) {
    return gsap.to(element, {
      y: 0,
      duration: 0.2,
      ease: "power2.out"
    })
  }

  // Анимации скролла
  static scrollReveal(element: HTMLElement, options = {}) {
    return gsap.fromTo(element,
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          ...options
        }
      }
    )
  }

  // Параллакс эффект
  static parallax(element: HTMLElement, speed = 0.5) {
    return gsap.to(element, {
      yPercent: -50 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    })
  }

  // Анимация текста (типинг)
  static typeWrite(element: HTMLElement, text: string, duration = 1) {
    return gsap.to(element, {
      duration: duration,
      text: {
        value: text,
        delimiter: ""
      },
      ease: "none"
    })
  }

  // Микро-анимации для интерактивных элементов
  static microInteraction(element: HTMLElement, type: 'pulse' | 'shake' | 'bounce' = 'pulse') {
    const animations = {
      pulse: () => gsap.to(element, {
        scale: 1.05,
        duration: 0.1,
        yoyo: true,
        repeat: 1
      }),
      shake: () => gsap.to(element, {
        x: 5,
        duration: 0.05,
        yoyo: true,
        repeat: 5
      }),
      bounce: () => gsap.to(element, {
        y: -10,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "bounce.out"
      })
    }

    return animations[type]()
  }
}

// Оптимизированные пресеты анимаций
export const AnimationPresets = {
  pageEnter: {
    opacity: 0,
    y: 30,
    duration: 0.6,
    ease: "power2.out"
  },
  cardStagger: {
    opacity: 0,
    y: 20,
    duration: 0.4,
    stagger: 0.1,
    ease: "power2.out"
  },
  modalEnter: {
    opacity: 0,
    scale: 0.8,
    duration: 0.3,
    ease: "back.out(1.7)"
  },
  tooltipEnter: {
    opacity: 0,
    scale: 0.9,
    duration: 0.2,
    ease: "power2.out"
  }
}