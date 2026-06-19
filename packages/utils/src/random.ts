import {isNullOrUndefined, throwIf} from '@axijs/ensure';
import {v4 as uuidv4} from 'uuid';

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * @param max
 * @return number
 */
export function randInt(max: number): number;
/**
 * @param min
 * @param max
 * @return number
 */
export function randInt(min: number, max: number): number;
export function randInt(minOrMax: number, possibleMax?: number): number {
  let min: number;
  let max: number;

  if (isNullOrUndefined(possibleMax)) {
    min = 0;
    max = minOrMax;
  } else {
    min = minOrMax;
    max = possibleMax;
  }
  throwIf(min > max, `min (${min}) greater then max (${max}), please check logic`);

  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Generates a unique identifier using uuidv4.
 * @returns A unique string ID.
 */
export function uid() {
  return uuidv4();
}
