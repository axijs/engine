import { PathType } from './types';

/**
 * A read-only contract for any system that can provide data by path.
 */
export interface DataSource {
  get(path: PathType): unknown;
  has(path: PathType): boolean;
}

/**
 * A write-only contract for any system that can accept data by path.
 */
export interface DataSink {
  set(path: PathType, value: unknown): void;
  create(path: PathType, value: unknown): void;
  delete(path: PathType): void;
}

/**
 * A full CRUD contract for systems that provide complete data management.
 * Combines both reading and writing capabilities.
 */
export interface DataStorage extends DataSource, DataSink {
}
