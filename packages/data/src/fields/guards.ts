import {isNullOrUndefined} from '@axi-engine/utils';
import {Fields} from './fields';
import {FieldTree} from './field-tree';
import {DataStore} from '../store/data-store';

/**
 * Type guard that checks if a value is an instance of the `Fields` class.
 * It verifies this by checking the static `typeName` property on the instance.
 *
 * @param value The value to check.
 * @returns {boolean} `true` if the value is a `Fields` instance, otherwise `false`.
 */
export function isFields(value: unknown): value is Fields {
  return !isNullOrUndefined(value) && (value as Fields).typeName === Fields.typeName;
}

/**
 * Type guard that checks if a value is an instance of the `FieldTree` class.
 * It verifies this by checking the static `typeName` property on the instance.
 *
 * @param value The value to check.
 * @returns {boolean} `true` if the value is a `FieldTree` instance, otherwise `false`.
 */
export function isFieldTree(value: unknown): value is FieldTree<any> {
  return !isNullOrUndefined(value) && (value as FieldTree<any>).typeName === FieldTree.typeName;
}

/**
 * Type guard that checks if a value is an instance of the `DataStore` class.
 * It verifies this by checking the static `typeName` property on the instance.
 *
 * @param value The `unknown` value to check.
 * @returns {boolean} `true` if the value is a `DataStore` instance, otherwise `false`.
 *
 * @example
 * function processData(source: DataStore) {
 *   if (isDataStore(source)) {
 *     // Inside this block, TypeScript now knows `source` is a full `Store`.
 *     // We can safely call Store-specific methods like `createFields`.
 *     source.createFields('new.data.group');
 *   } else {
 *     // Fallback logic for simpler data sources that are not a `Store`.
 *     console.warn('Cannot create new groups with a simple data source.');
 *   }
 * }
 */
export function isDataStore(value: unknown): value is DataStore {
  return !isNullOrUndefined(value) && (value as DataStore).typeName === DataStore.typeName;
}
