import {Field, FieldRegistry, Policy} from '@axi-engine/fields';
import {PolicySerializer} from './policy-serializer';
import {isNullOrUndefined, throwIfEmpty} from '@axi-engine/utils';


/**
 * A plain object representation of a Field's state for serialization.
 */
export interface FieldSnapshot {
  __type: string;
  name: string;
  value: any;
  policies?: object[];
}

/**
 * Orchestrates the serialization and deserialization of Field instances.
 *
 * This class acts as a central point for converting complex Field objects into
 * plain, storable data (snapshots) and vice-versa. It uses a `FieldRegistry`
 * to resolve class constructors and a `PolicySerializer` to handle the state
 * of any attached policies.
 *
 * @todo Implement a `patch(field, snapshot)` method.
 *       Unlike `hydrate`, which creates a new
 *       instance, `patch` should update the state of an *existing* field instance
 *       without breaking external references to it.
 */
export class FieldSerializer {

  /**
   * Creates an instance of FieldSerializer.
   * @param {FieldRegistry} fieldRegistry - A registry that maps string type names to Field constructors.
   * @param {PolicySerializer} policySerializer - A serializer dedicated to handling Policy instances.
   */
  constructor(
    private readonly fieldRegistry: FieldRegistry,
    private readonly policySerializer: PolicySerializer
  ) {
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
      const serializedPolicies: object[] = [];
      field.policies.items.forEach(policy => serializedPolicies.push(this.policySerializer.snapshot(policy)));
      snapshot.policies = serializedPolicies;
    }

    return snapshot;
  }

  /**
   * Restores a Field instance from its snapshot representation.
   * It uses the `__type` property to find the correct constructor and hydrates
   * the field with its value and all its policies.
   * @param {FieldSnapshot} snapshot - The plain object snapshot to deserialize.
   * @returns {Field<any>} A new, fully functional Field instance.
   * @throws If the snapshot is invalid, missing a `__type`, or if the type is not registered.
   */
  hydrate(snapshot: FieldSnapshot): Field<any> {
    const fieldType = snapshot.__type;
    throwIfEmpty(fieldType, 'Invalid field snapshot: missing "__type" identifier.');
    const Ctor = this.fieldRegistry.get(fieldType);

    let policies: Policy<any>[] | undefined;
    if (!isNullOrUndefined(snapshot.policies)) {
      policies = [];
      snapshot.policies!.forEach((p: any) => policies!.push(this.policySerializer.hydrate(p)));
    }

    return new Ctor(snapshot.name, snapshot.value, {policies}) as Field<any>;
  }
}
