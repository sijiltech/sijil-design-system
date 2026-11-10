import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names, resolving conflicting Tailwind utilities so that the
 * **last** class wins. This is the single mechanism every component uses to
 * combine its own classes with the consumer's `className` override.
 *
 * @param inputs - Class values (strings, arrays, objects, falsy values).
 * @returns The merged class string.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

