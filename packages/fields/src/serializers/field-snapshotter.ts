import {PolicySerializer} from './policy-serializer';
import {FieldSnapshot} from './field-snapshot';
import {Field} from '../field';

export class FieldSnapshotter {
  constructor(public readonly policySerializer: PolicySerializer) {
  }

  /**
   * Creates a serializable snapshot of a Field instance.
   * The snapshot includes the field's type, name, current value, and the state of all its policies.
   * @param {Field<any>} field - The Field instance to serialize.
   * @returns {FieldSnapshot} A plain object ready for JSON serialization.
   */
  snapshot(field: Field<any>): FieldSnapshot {
    let snapshot: any = {
      __type: field.typeName,
      name: field.name,
      value: field.value,
    }

    if (!field.policies.isEmpty()) {
      snapshot.policies = Array.from(field.policies.items.values())
        .map(policy => this.policySerializer.snapshot(policy));
    }

    return snapshot;
  }
}
