import { DataStorage, Destroyable, PathType } from '@axi-engine/utils';


export interface Scope extends DataStorage, Destroyable {
  readonly uid: string;
  readonly name?: string;
  parent?: Scope;

  /**
   * create child Scope with optional name
   */
  extend(name?: string): Scope;

  /**
   * Reads a value from this scope or, when it is not found locally, from its
   * parent scope chain.
   *
   * A multi-segment path can also address a named scope, for example
   * `global.settings.debug`.
   */
  get<T = any>(name: PathType): T;

  /**
   * Updates an existing value in the nearest scope where it is found.
   *
   * A multi-segment path addressing a named scope updates that scope directly.
   */
  set<T = any>(name: PathType, value: T): void;

  /**
   * Updates an existing value or creates a new one in the scope resolved by the
   * path. A plain name is therefore created in the current scope.
   */
  upsert<T = any>(name: PathType, value: T): void;

  /**
   * Creates a new value in the scope resolved by the path.
   */
  create<T = any>(name: PathType, value: T): void

  /**
   * Deletes a value from the scope resolved by the path.
   */
  delete(name: PathType): void

  /**
   * Checks whether a value exists in this scope or anywhere in its parent scope
   * chain.
   */
  has(name: PathType): boolean
}
