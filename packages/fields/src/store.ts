import {PathType} from '@axi-engine/utils';
import {Field, FieldOptions} from './field';
import {
  CoreBooleanField,
  CoreBooleanFieldOptions, CoreField, CoreNumericField,
  CoreNumericFieldOptions, CoreStringField,
  CoreStringFieldOptions
} from './field-definitions';
import {CoreFields} from './core-fields';
import {CoreFieldTree} from './core-field-tree';

export interface StoreCreateFieldOptions {
  /** Allows to explicitly specify the field type, overriding the automatic type detection. */
  fieldType?: string
}

/**
 * Defines the primary high-level API for interacting with the state management system.
 * It acts as a facade, simplifying access to the underlying FieldTree and providing
 * both type-safe and dynamic methods for manipulating data.
 */
export interface Store {

  /**
   * Retrieves the raw value of a Field at a specific path.
   * @template T The expected type of the value.
   * @param path The path to the field (e.g., 'player.stats.hp').
   * @returns {T} The raw value stored in the field.
   * @throws An error if the path is invalid or no field exists at the path.
   */
  getValue<T>(path: PathType): T

  /**
   * Strictly sets the value of an *existing* Field at a specific path.
   * @template T The type of the value being set.
   * @param path The path to the existing field.
   * @param val The new value to set.
   * @returns {T} The value that was set.
   * @throws An error if no field exists at the specified path.
   */
  setValue<T>(path: PathType, val:T): T

  /**
   * Creates a new Field at a specified path, inferring its type from the provided value.
   * This is a strict operation and will fail if a node already exists at the target path.
   * @template T The type of the initial value.
   * @param path The full path where the new field will be created.
   * @param val The initial value for the field.
   * @param options Optional configuration, including policies and the ability to override field type.
   * @returns {Field<T>} The newly created Field instance.
   * @throws An error if a node already exists at the path or if the parent path is invalid.
   */
  create<T>(path: PathType, val:T, options?: FieldOptions<T> & StoreCreateFieldOptions): Field<T>

  /**
   * Updates an existing Field's value or creates a new one if it doesn't exist.
   * This is a flexible operation that will create any missing parent nodes in the path.
   * @template T The type of the value.
   * @param path The path to the field to update or create.
   * @param val The value to set.
   * @param options Optional configuration, used only if a new field is created.
   * @returns {Field<T>} The existing or newly created Field instance.
   */
  upset<T>(path: PathType, val: T, options?: FieldOptions<T> & StoreCreateFieldOptions): Field<T>

  /**
   * Creates a new, strongly-typed CoreBooleanField.
   * @throws An error if a node already exists at the path.
   */
  createBoolean(path: PathType, val: boolean, options?: CoreBooleanFieldOptions): CoreBooleanField

  /**
   * Creates a new, strongly-typed CoreNumericField.
   * @throws An error if a node already exists at the path.
   */
  createNumeric(path: PathType, val: number, options?: CoreNumericFieldOptions): CoreNumericField

  /**
   * Creates a new, strongly-typed CoreStringField.
   * @throws An error if a node already exists at the path.
   */
  createString(path: PathType, val: string, options?: CoreStringFieldOptions): CoreStringField

  /**
   * Creates a new, generic CoreField instance for any data type.
   * @throws An error if a node already exists at the path.
   */
  createGeneric<T>(path: PathType, val: T, options?: FieldOptions<T>): CoreField<T>

  /**
   * Retrieves a strongly-typed CoreBooleanField instance.
   * @throws An error if the path is invalid or the field is not of the expected type.
   */
  getBoolean(path: PathType): CoreBooleanField

  /**
   * Retrieves a strongly-typed CoreNumericField instance.
   * @throws An error if the path is invalid or the field is not of the expected type.
   */
  getNumeric(path: PathType): CoreNumericField

  /**
   * Retrieves a strongly-typed CoreStringField instance.
   * @throws An error if the path is invalid or the field is not of the expected type.
   */
  getString(path: PathType): CoreStringField

  /**
   * Retrieves a generic CoreField instance.
   * @throws An error if the path is invalid.
   */
  getGeneric<T>(path: PathType): CoreField<T>

  /**
   * A generic method to retrieve a Field instance with a specific asserted type.
   * @template TField The expected Field class or interface.
   * @throws An error if the path is invalid or the field cannot be cast to the specified type.
   */
  getField<TField extends Field<any>>(path: PathType): TField

  /**
   * Strictly creates a new CoreFields container.
   * Any missing parent nodes in the path will be created automatically.
   * @param path The path where the new Fields container will be created.
   * @returns {CoreFields} The newly created CoreFields instance.
   * @throws An error if a node already exists at the target path.
   */
  createFields(path: PathType): CoreFields

  /**
   * Strictly creates a new CoreFieldTree node.
   * Any missing parent nodes in the path will be created automatically.
   * @param path The path where the new FieldTree node will be created.
   * @returns {CoreFieldTree} The newly created CoreFieldTree instance.
   * @throws An error if a node already exists at the target path.
   */
  createTree(path: PathType): CoreFieldTree

  /**
   * Retrieves an existing CoreFields container.
   * @param path The path to the Fields container.
   * @returns {CoreFields} The found CoreFields instance.
   * @throws An error if the path is invalid or the node at the path is not a Fields container.
   */
  getFields(path: PathType): CoreFields

  /**
   * Retrieves an existing CoreFieldTree node.
   * @param path The path to the FieldTree node.
   * @returns {CoreFieldTree} The found CoreFieldTree instance.
   * @throws An error if the path is invalid or the node at the path is not a FieldTree.
   */
  getTree(path: PathType): CoreFieldTree

  /**
   * Removes the node (Field, Fields, or FieldTree) at the end of the specified path.
   * This method does not remove parent nodes if they become empty.
   * @param path The path to the node to remove.
   */
  remove(path: PathType): void
}
