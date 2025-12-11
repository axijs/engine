import {FieldSerializer, FieldSnapshot} from './field-serializer';
import {FieldRegistry} from '../field-registry';
import {PolicySerializer} from './policy-serializer';
import {Fields} from '../fields';
import {DefaultFields} from '../default-fields';

/**
 * A plain object representation of a Fields container's state for serialization.
 */
export interface FieldsSnapshot {
  __type: string;
  fields: FieldSnapshot[]
}

/**
 * Orchestrates the serialization and deserialization of `Fields` container instances.
 *
 * This class acts as a high-level composer, responsible for converting an entire `Fields` object
 * into a storable snapshot and back.
 * It delegates the actual serialization of each `Field` and `Policy` to their respective serializers.
 *
 * @todo This implementation is coupled to creating `DefaultFields` instances during hydration.
 *       To make the system fully extensible, this class should be refactored to use a
 *       `FieldsRegistry` (a `ConstructorRegistry<Fields>`). This would allow it to
 *       hydrate any custom `Fields` class (e.g., `ReactiveFields`) based on the `__type`
 *       property in the snapshot, mirroring the pattern used by `FieldSerializer`.
 *
 * @todo Implement a `patch(fields, snapshot)` method. It should perform a non-destructive
 *       update, creating new fields, removing missing ones, and patching existing ones
 *       in place, preserving the container instance itself.
 */
export class FieldsSerializer {
  /**
   * An internal instance of FieldSerializer to handle individual fields.
   * @private
   */
  private readonly fieldSerializer: FieldSerializer;

  /**
   * Creates an instance of FieldsSerializer.
   * @param {FieldRegistry} fieldRegistry - A registry that maps string type names to Field constructors.
   * @param {PolicySerializer} policySerializer - A serializer dedicated to handling Policy instances.
   */
  constructor(
    private readonly fieldRegistry: FieldRegistry,
    private readonly policySerializer: PolicySerializer
  ) {
    this.fieldSerializer = new FieldSerializer(this.fieldRegistry, this.policySerializer);
  }

  /**
   * Creates a serializable snapshot of a `Fields` container.
   *
   * The snapshot includes a `__type` identifier (currently hardcoded) and an array of snapshots
   * for each `Field` within the container.
   * @param {Fields} fields - The `Fields` instance to serialize.
   * @returns {FieldsSnapshot} A plain object ready for JSON serialization.
   */
  snapshot(fields: Fields): FieldsSnapshot {
    const fieldsDump: FieldSnapshot[] = [];
    fields.fields.forEach(field => fieldsDump.push(this.fieldSerializer.snapshot(field)));
    return { __type: 'fields', fields: fieldsDump};
  }

  /**
   * Restores a `Fields` container instance from its snapshot representation.
   *
   * **Limitation:** This method is currently hardcoded to always create an instance of `DefaultFields`.
   * It iterates through the field snapshots and hydrates them individually, adding them to the new container.
   * @param {FieldsSnapshot} snapshot - The plain object snapshot to deserialize.
   * @returns {DefaultFields} A new `DefaultFields` instance populated with the restored fields.
   */
  hydrate(snapshot: FieldsSnapshot): DefaultFields {
    const fields = new DefaultFields(this.fieldRegistry);
    snapshot.fields.forEach(fieldSnapshot => fields.add(this.fieldSerializer.hydrate(fieldSnapshot)));
    return fields;
  }
}
