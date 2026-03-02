import {isNullOrUndefined, isUndefined} from './guards';


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
 * @param precision Optional number of decimal places to round the result to.
 * @returns The calculated percentage of the value.
 * @example getPercentOf(200, 12.5); // returns 25
 * @example getPercentOf(100, 33.333, 2); // returns 33.33
 */
export function getPercentOf(val: number, percents: number, precision?: number) {
  const result = (percents / 100) * val;
  if (!isUndefined(precision)) {
    return Number(result.toFixed(precision));
  }
  return result;
}
