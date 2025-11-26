import { v4 as uuidv4 } from 'uuid';

/**
 * Returns a random integer between min (inclusive) and max (exclusive).
 * @param min The minimum integer (inclusive).
 * @param max The maximum integer (exclusive).
 * @returns A random integer.
 * @example randInt(1, 5); // returns 1, 2, 3, or 4
 */
export function randInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Generates a unique identifier using uuidv4.
 * @returns A unique string ID.
 */
export function randId() {
  return uuidv4();
}
