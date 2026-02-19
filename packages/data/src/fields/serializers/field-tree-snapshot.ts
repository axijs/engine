import {FieldsSnapshot} from './fields-snapshot';

/**
 * Represents the serializable state of a `FieldTree` container.
 *
 * This type describes a plain object that has:
 * 1. A required `__type` property to identify the tree's class.
 * 2. An arbitrary number of other properties, where each key is the `name`
 *    of a child node, and the value is the snapshot of that child node.
 *    The `| string` is included to ensure compatibility with the `__type` property.
 */
export interface FieldTreeSnapshot {
  __type: string;
  [fieldName: string]: FieldsSnapshot | FieldTreeSnapshot | string;
}
