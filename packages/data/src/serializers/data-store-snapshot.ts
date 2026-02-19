import {FieldsSnapshot} from './fields-snapshot';
import {FieldTreeSnapshot} from './field-tree-snapshot';

/**
 * A plain object representation of a DataStore's state, used for serialization.
 *
 * It captures both the detached 'flat' variables (used for stack frames/local scopes)
 * and the hierarchical 'tree' structure (used for global/persistent data).
 */
export interface DataStoreSnapshot {
  /**
   * The type identifier for the store (e.g., 'dataStore').
   * Used for type guards and polymorphic deserialization.
   */
  __type: string;

  /**
   * Snapshot of the independent, root-level variables (CoreFields).
   * Present only if the store contained detached variables.
   */
  variables?: FieldsSnapshot;

  /**
   * Snapshot of the nested data hierarchy (CoreFieldTree).
   * Present only if the store managed a complex tree structure.
   */
  tree?: FieldTreeSnapshot;
}
