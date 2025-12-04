import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface UseScrollTriggerProps {
  triggerElement: HTMLElement | null;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
  enabled?: boolean;
  start?: string;
  end?: string;
}

export const useScrollTrigger = ({
  triggerElement,
  onEnter,
  onLeave,
  onEnterBack,
  onLeaveBack,
  enabled = true,
  start = 'top 50%',
  end = 'bottom 50%'
}: UseScrollTriggerProps) => {
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!triggerElement || !enabled) return;

    // Создаем ScrollTrigger
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: triggerElement,
      start,
      end,
      onEnter: () => {
        triggerElement.setAttribute('data-scrolled', 'true');
        onEnter?.();
      },
      onEnterBack: () => {
        triggerElement.setAttribute('data-scrolled', 'true');
        onEnterBack?.();
      },
      onLeave: () => {
        triggerElement.setAttribute('data-scrolled', 'false');
        onLeave?.();
      },
      onLeaveBack: () => {
        triggerElement.setAttribute('data-scrolled', 'false');
        onLeaveBack?.();
      },
      scrub: 0.5,
      toggleActions: "play none none reverse",
      markers: false
    });

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
    };
  }, [triggerElement, enabled, start, end]);

  return scrollTriggerRef.current;
};