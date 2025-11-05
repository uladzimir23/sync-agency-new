// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { gsap } from "gsap"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function generateId(): string {
  return `colabsys-${Math.random().toString(36).substr(2, 9)}`
}

// Хелпер для магнитных эффектов
export const MagneticUtils = {
  calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
  },
  
  normalizeValue(value: number, min: number, max: number): number {
    return (value - min) / (max - min)
  },
  
  lerp(start: number, end: number, factor: number): number {
    return start + (end - start) * factor
  }
}

export { gsap }