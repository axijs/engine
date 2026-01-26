import {PolicySerializer} from './policy-serializer';
import {isNullOrUndefined, throwIfEmpty} from '@axi-engine/utils';
import {FieldRegistry} from '../field-registry';
import {Field} from '../field';
import {Policy} from '../policies';
import {FieldSnapshot} from './field-snapshot';


/**
 * Orchestrates the serialization and deserialization of Field instances.
 *
 * This class acts as a central point for converting complex Field objects into
 * plain, storable data (snapshots) and vice-versa. It uses a `FieldRegistry`
 * to resolve class constructors and a `PolicySerializer` to handle the state
 * of any attached policies.
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
    const Ctor = this.fieldRegistry.getOrThrow(fieldType);
    let policies: Policy<any>[] | undefined = this.hydratePolicies(snapshot);

    return new Ctor(snapshot.name, snapshot.value, {policies}) as Field<any>;
  }

  /**
   * Updates an existing Field instance with data from a snapshot.
   *
   * This method modifies the field in-place, preserving the object reference.
   * It updates the field's value and completely replaces its current policies
   * with the ones defined in the snapshot.
   *
   * @param {Field<any>} field - The existing Field instance to update.
   * @param {FieldSnapshot} snapshot - The snapshot containing the new state.
   */
  patch(field: Field<any>, snapshot: FieldSnapshot) {
    let policies: Policy<any>[] | undefined = this.hydratePolicies(snapshot);
    field.policies.clear();
    if (policies) {
      policies.forEach(p => field.policies.add(p));
    }
    field.value = snapshot.value;
  }

  private hydratePolicies(snapshot: FieldSnapshot) {
    if (isNullOrUndefined(snapshot.policies)) {
      return undefined;
    }
    const policies: Policy<any>[] = [];
    snapshot.policies!.forEach((p: any) => policies!.push(this.policySerializer.hydrate(p)));
    return policies;
  }
}
