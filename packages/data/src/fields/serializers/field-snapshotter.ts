import {FieldSnapshot} from './field-snapshot';
import {Field} from '../field';

export class FieldSnapshotter {
  /**
   * Creates a serializable snapshot of a Field instance.
   * The snapshot includes the field's type, name, current value, and the state of all its policies.
   * @param {Field<any>} field - The Field instance to serialize.
   * @returns {FieldSnapshot} A plain object ready for JSON serialization.
   */
  snapshot(field: Field<any>): FieldSnapshot {
    return {
      __type: field.typeName,
      name: field.name,
      value: field.value,
    };
  }
}
