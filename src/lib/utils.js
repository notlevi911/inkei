/**
 * Combines multiple class names into a single string
 * Utility function for managing Tailwind classes
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}