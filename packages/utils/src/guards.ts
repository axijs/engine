import {ScalarType} from './types';
import {isBoolean, isNumber, isString} from '@axijs/ensure';

/**
 * Type guard that checks if a value is a valid ScalarType.
 * @param value The value to check.
 * @returns True if the value is a string, number, or boolean.
 */
export function isScalar(value: unknown): value is ScalarType {
  return isString(value) || isNumber(value) || isBoolean(value);
}

/**
 * Type guard to check if a value is a string that ends with '%'.
 * @param val The value to check.
 * @returns `true` if the value is a percentage string.
 */
export function isPercentageString(val: unknown): val is string {
  return isString(val) && val.endsWith("%");
}
