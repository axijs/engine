import {throwIf} from './assertion';
import {isObject} from './guards';

/**
 * Returns the first key of an object.
 * @param obj The object from which to get the key.
 * @returns The first key of the object as a string.
 * @throws {Error} If the argument is not a valid object.
 */
export function firstKeyOf(obj: any) {
  throwIf(!isObject(obj), `firstKeyOf: Expected an object, got ${typeof obj}`);
  return Object.keys(obj)[0];
}
