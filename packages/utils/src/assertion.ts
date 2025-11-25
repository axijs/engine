/**
 * Throws an error if the condition is true.
 * @param conditionForThrow - If true, an error will be thrown.
 * @param exceptionMessage - The message for the error.
 */
export function throwIf(conditionForThrow: boolean, exceptionMessage: string): void | never {
  if (conditionForThrow) {
    throw new Error(exceptionMessage);
  }
}
