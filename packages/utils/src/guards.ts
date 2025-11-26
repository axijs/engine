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

/**
 * Type guard to check if a value is a string that ends with '%'.
 * @param val The value to check.
 * @returns `true` if the value is a percentage string.
 */
export function isPercentageString(val: unknown): val is string {
  return typeof val === "string" && val.endsWith("%");
}
