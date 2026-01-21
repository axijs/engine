import { PathType } from './types';

/**
 * A read-only contract for any system that can provide data by path.
 */
export interface DataSource {

  get(path: PathType): unknown;

  /**
   * Checks if a path valid.
   * @param {PathType} path The path to the node.
   * @returns {boolean} `true` if the node exists, otherwise `false`.
   */
  has(path: PathType): boolean;
}

/**
 * A write-only contract for any system that can accept or mutate data by path.
 *
 * This interface is the counterpart to `DataSource` and represents the "write" side
 * of a complete data storage system. It provides a standard set of methods for
 * creating, updating, and deleting data, abstracting away the underlying
 * implementation details.
 *
 * @interface
 */
export interface DataSink {
  /**
   * Strictly updates the value at an *existing* path.
   * This operation should typically fail or throw an error if no value exists at the path.
   *
   * @param path The path to the value to be updated.
   * @param value The new value to set.
   */
  set(path: PathType, value: unknown): void;

  /**
   * Strictly creates a new value at the specified path.
   * This operation should typically fail or throw an error if a value already exists
   * at the path.
   *
   * @param path The full path where the new value will be created.
   * @param value The initial value to create.
   */
  create(path: PathType, value: unknown): void;

  /**
   * Updates a value at a specified path if it exists, or creates it if it does not.
   * This is a convenient and non-strict combination of the `set` and `create` operations.
   *
   * @param path The path to the value to be created or updated.
   * @param value The value to set.
   */
  upset(path: PathType, value: unknown): void;

  /**
   * Deletes the value at the specified path.
   *
   * @param path The path to the value to be deleted.
   */
  delete(path: PathType): void;
}

/**
 * A full CRUD contract for systems that provide complete data management.
 * Combines both reading and writing capabilities.
 */
export interface DataStorage extends DataSource, DataSink {
}
