import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { gsap } from "gsap";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Re-export gsap для удобства
export { gsap };