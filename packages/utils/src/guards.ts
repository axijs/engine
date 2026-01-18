import {ScalarType} from './types';

/**
 * Type guard that checks if a value is a valid ScalarType.
 * @param value The value to check.
 * @returns True if the value is a string, number, or boolean.
 */
export function isScalar(value: unknown): value is ScalarType {
  const type = typeof value;
  return type === 'string' || type === 'number' || type === 'boolean';
}

export function isNullOrUndefined(val: unknown): val is null | undefined {
  return val === undefined || val === null;
}

export function isUndefined(val: unknown): val is undefined {
  return typeof val === 'undefined';
}

export function isNumber(val: unknown): val is number {
  return typeof val === "number";
}

export function isBoolean(val: unknown): val is boolean {
  return typeof val === "boolean";
}

export function isString(val: unknown): val is string {
  return typeof val === "string";
}

export function isNull(val: unknown): val is null {
  return val === null;
}

/**
 * Type guard to check if a value is a string that ends with '%'.
 * @param val The value to check.
 * @returns `true` if the value is a percentage string.
 */
export function isPercentageString(val: unknown): val is string {
  return typeof val === "string" && val.endsWith("%");
}
