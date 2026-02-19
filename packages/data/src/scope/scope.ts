import {DataStorage, PathType} from '@axi-engine/utils';

export interface Scope extends DataStorage {

  /**
   *
   */
  extend(name?: string): Scope;

  /** hierarchically read value from context */
  get<T = any>(name: PathType): T;

  /**
   * hierarchically set value to field with name
   * searching target variable from top frame or context to bottom
   */
  set<T = any>(name: PathType, value: T): void

  upset<T = any>(name: PathType, value: T): void;

  /**
   * hierarchically create variable with name and value
   * will create variable in the top context block or frame
   */
  create<T = any>(name: PathType, value: T): void

  /**
   * hierarchically delete variable with name, manual deleting can be dangerous!
   * deleting works only with variables in local scope
   * */
  delete(name: PathType): void

  has(name: PathType): boolean
}
