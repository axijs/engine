import {isNullOrUndefined} from './guards';

/**
 * Clamps a number between an optional minimum and maximum value.
 * @param val The number to clamp.
 * @param min The minimum value. If null or undefined, it's ignored.
 * @param max The maximum value. If null or undefined, it's ignored.
 * @returns The clamped number.
 */
export function clampNumber(val: number, min?: number | null, max?: number | null): number {
  if (!isNullOrUndefined(min)) val = Math.max(val, min);
  if (!isNullOrUndefined(max)) val = Math.min(val, max);
  return val;
}

/**
 * Calculates a percentage of a given value.
 * @param val The base value.
 * @param percents The percentage to get.
 * @returns The calculated percentage of the value.
 * @example getPercentOf(200, 10); // returns 20
 */
export function getPercentOf(val: number, percents: number) {
  return (percents / 100) * val;
}
