import {FieldSnapshot} from './field-snapshot';

/**
 * A plain object representation of a Fields container's state for serialization.
 */
export interface FieldsSnapshot {
  __type: string;
  [fieldName: string]: FieldSnapshot | string;
}
