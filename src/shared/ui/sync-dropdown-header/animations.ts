import { gsap } from 'gsap'

export const dropdownAnimations = {
  open: (element: HTMLElement, isMobile: boolean = false) => {
    const tl = gsap.timeline()
    
    tl.set(element, {
      display: 'block',
      opacity: 0,
      y: -10,
      scale: 0.95
    })
    
    tl.to(element, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: "back.out(1.2)"
    })
    
    return tl
  },
  
  close: (element: HTMLElement, isMobile: boolean = false) => {
    const tl = gsap.timeline()
    
    tl.to(element, {
      opacity: 0,
      y: -10,
      scale: 0.95,
      duration: 0.2,
      ease: "power2.in"
    })
    
    tl.set(element, {
      display: 'none'
    })
    
    return tl
  },
  
  blurIn: (element: HTMLElement) => {
    return gsap.to(element, {
      backdropFilter: 'blur(15px)',
      WebkitBackdropFilter: 'blur(15px)',
      duration: 0.4,
      ease: "power2.out"
    })
  },
  
  blurOut: (element: HTMLElement) => {
    return gsap.to(element, {
      backdropFilter: 'blur(0px)',
      WebkitBackdropFilter: 'blur(0px)',
      duration: 0.3,
      ease: "power2.in"
    })
  }
}