import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Утилиты для работы с темами
export const themeColors = {
  light: {
    background: 'hsl(0 0% 100%)',
    foreground: 'hsl(222.2 84% 4.9%)',
    primary: 'hsl(221.2 83.2% 53.3%)',
  },
  dark: {
    background: 'hsl(222.2 84% 4.9%)',
    foreground: 'hsl(210 40% 98%)',
    primary: 'hsl(217.2 91.2% 59.8%)',
  }
} as const

// Генератор классов для состояний
export function getInteractionClasses(component: 'button' | 'card' | 'input' = 'button') {
  const baseClasses = {
    button: "transition-all duration-200 ease-smooth",
    card: "transition-shadow duration-300 ease-smooth",
    input: "transition-colors duration-150 ease-smooth"
  }
  
  const hoverClasses = {
    button: "hover:shadow-md hover:-translate-y-0.5",
    card: "hover:shadow-lg hover:border-primary/20",
    input: "hover:border-primary/50"
  }
  
  const focusClasses = {
    button: "focus:ring-2 focus:ring-primary focus:ring-offset-2",
    card: "focus:ring-2 focus:ring-primary focus:ring-offset-2",
    input: "focus:ring-2 focus:ring-primary focus:border-transparent"
  }
  
  return {
    base: baseClasses[component],
    hover: hoverClasses[component],
    focus: focusClasses[component]
  }
}