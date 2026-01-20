import {isNullOrUndefined} from '@axi-engine/utils';
import {Fields} from './fields';
import {FieldTree} from './field-tree';
import {Store} from './store';

/**
 * Type guard that checks if a value is an instance of the `Fields` class.
 * It verifies this by checking the static `typeName` property on the instance.
 *
 * @param value The value to check.
 * @returns {boolean} `true` if the value is a `Fields` instance, otherwise `false`.
 */
export function isFields(value: unknown): value is Fields {
  return value != null && (value as Fields).typeName === Fields.typeName;
}

/**
 * Type guard that checks if a value is an instance of the `FieldTree` class.
 * It verifies this by checking the static `typeName` property on the instance.
 *
 * @param value The value to check.
 * @returns {boolean} `true` if the value is a `FieldTree` instance, otherwise `false`.
 */
export function isFieldTree(value: unknown): value is FieldTree<any> {
  return value != null && (value as FieldTree<any>).typeName === FieldTree.typeName;
}

/**
 * Type guard that checks if an unknown value conforms to the `Store` interface.
 *
 * It performs a structural check (duck typing) by verifying the presence of methods
 * that are unique to the `Store` interface and are not part of the simpler `DataSource`
 * or `DataStorage` contracts, such as `createFields` and `createTree`.
 *
 * @param value The `unknown` value to check.
 * @returns {boolean} `true` if the value is a `Store`-like object, `false` otherwise.
 *
 * @example
 * function processData(source: DataSource) {
 *   if (isStore(source)) {
 *     // Inside this block, TypeScript now knows `source` is a full `Store`.
 *     // We can safely call Store-specific methods like `createFields`.
 *     source.createFields('new.data.group');
 *   } else {
 *     // Fallback logic for simpler data sources that are not a `Store`.
 *     console.warn('Cannot create new groups with a simple data source.');
 *   }
 * }
 */
export function isStore(value: unknown): value is Store {
  return !isNullOrUndefined(value) &&
    typeof (value as Store).createFields === 'function' &&
    typeof (value as Store).createTree === 'function';
}
