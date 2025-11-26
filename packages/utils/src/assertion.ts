import {isNullOrUndefined} from './guards';

/**
 * Throws an error if the condition is true.
 * @param conditionForThrow - If true, an error will be thrown.
 * @param exceptionMessage - The message for the error.
 * @throws {Error} if the value is true
 */
export function throwIf(conditionForThrow: boolean, exceptionMessage: string): void | never {
  if (conditionForThrow) {
    throw new Error(exceptionMessage);
  }
}

/**
 * Throws an error if the value is null, undefined, or an empty array.
 *
 * @template T The type of the value being checked.
 * @param value The value to check.
 * @param exceptionMessage The message for the error.
 * @throws {Error} if the value is null, undefined, or an empty array.
 *
 * @example
 * // Example with a potentially undefined variable
 * const user: { name: string } | undefined = findUser();
 * throwIfEmpty(user, 'User not found');
 * // From here, TypeScript knows `user` is not undefined.
 * console.log(user.name);
 *
 * @example
 * // Example with an array
 * const items: string[] = getItems();
 * throwIfEmpty(items, 'Items array cannot be empty');
 * // From here, you can safely access items[0] without checking for an empty array again.
 * console.log('First item:', items[0]);
 */
export function throwIfEmpty<T>(
  value: T,
  exceptionMessage: string
): asserts value is NonNullable<T> {
  const isArrayAndEmpty = Array.isArray(value) && value.length === 0;

  if (isNullOrUndefined(value) || isArrayAndEmpty) {
    throw new Error(exceptionMessage);
  }
}
