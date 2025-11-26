/**
 * Generates an array of numbers from 0 to length-1.
 * @param length The desired length of the array.
 * @returns An array of sequential numbers.
 * @example genArray(3); // returns [0, 1, 2]
 */
export function genArray(length: number) {
  return Array.from({length}, (_v, i) => i);
}

/**
 * Creates a new array with its elements shuffled in a random order.
 * This function does not mutate the original array.
 * @template T The type of elements in the array.
 * @param array The array to shuffle.
 * @returns A new, shuffled array.
 */
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Checks if the first array is a sequential starting subset of the second array.
 * @param arr1 The potential subset array.
 * @param arr2 The array to check against.
 * @returns `true` if arr1 is a sequential start of arr2, otherwise `false`.
 * @example
 * isSequentialStart([1, 2], [1, 2, 3]); // true
 * isSequentialStart([1, 3], [1, 2, 3]); // false
 */
export function isSequentialStart<T>(arr1: T[], arr2: T[]): boolean {
  if (arr1.length > arr2.length) {
    return false;
  }
  return arr1.every((element, index) => element === arr2[index]);
}

/**
 * Checks if two arrays contain the same elements, ignoring order.
 * Works for arrays of primitives like strings or numbers.
 * @template T The type of elements in the array.
 * @param arr1 The first array.
 * @param arr2 The second array.
 * @returns `true` if both arrays contain the same elements, otherwise `false`.
 * @example
 * haveSameElements(['a', 'b'], ['b', 'a']); // true
 * haveSameElements([1, 2, 3], [3, 1, 2]); // true
 * haveSameElements(['a', 'b'], ['a', 'c']); // false
 */
export function haveSameElements<T>(arr1?: T[], arr2?: T[]): boolean {
  if (!arr1 && !arr2) return true;
  if (!arr1 || !arr2) return false;
  if (arr1.length !== arr2.length) return false;

  // Create sorted copies to compare
  const sortedArr1 = [...arr1].sort();
  const sortedArr2 = [...arr2].sort();

  return sortedArr1.every((value, index) => value === sortedArr2[index]);
}

/**
 * Checks if two arrays are strictly equal (same elements in the same order).
 * @template T The type of elements in the array.
 * @param arr1 The first array.
 * @param arr2 The second array.
 * @returns `true` if the arrays are strictly equal, otherwise `false`.
 * @example
 * areArraysEqual(['a', 'b'], ['a', 'b']); // true
 * areArraysEqual(['a', 'b'], ['b', 'a']); // false
 * areArraysEqual([1, 2], [1, 2, 3]);    // false
 */
export function areArraysEqual<T>(arr1?: T[], arr2?: T[]): boolean {
  if (!arr1 && !arr2) return true;
  if (!arr1 || !arr2) return false;
  if (arr1.length !== arr2.length) return false;

  return arr1.every((value, index) => value === arr2[index]);
}

/**
 * Gets the last element of an array.
 * @template T The type of elements in the array.
 * @param array The array to query.
 * @returns The last element of the array, or `undefined` if the array is empty.
 */
export function last<T>(array: T[]): T | undefined {
  return array[array.length - 1];
}

/**
 * Creates a duplicate-free version of an array.
 * @template T The type of elements in the array.
 * @param array The array to process.
 * @returns A new array with only unique elements.
 */
export function unique<T>(array: T[]): T[] {
  return [...new Set(array)];
}

/**
 * Gets a random element from an array.
 * @template T The type of elements in the array.
 * @param array The array to choose from.
 * @returns A random element from the array, or `undefined` if the array is empty.
 */
export function getRandomElement<T>(array: T[]): T | undefined {
  if (array.length === 0) {
    return undefined;
  }
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}
