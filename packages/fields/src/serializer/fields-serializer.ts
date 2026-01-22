import {FieldSerializer} from './field-serializer';
import {Fields} from '../fields';
import {FieldsFactory} from '../fields-factory';
import {FieldSnapshot} from './field-snapshot';
import {FieldsSnapshot} from './fields-snapshot';

/**
 * Orchestrates the serialization and deserialization of `Fields` container instances.
 *
 * This class acts as a high-level composer, responsible for converting an entire `Fields` object
 * into a storable snapshot and back.
 * It delegates the actual serialization of each `Field` and `Policy` to their respective serializers.
 *
 * @todo Implement a `patch(fields, snapshot)` method. It should perform a non-destructive
 *       update, creating new fields, removing missing ones, and patching existing ones
 *       in place, preserving the container instance itself.
 */
export class FieldsSerializer<TFields extends Fields> {
  /**
   * Creates an instance of FieldsSerializer.
   * @param {FieldsFactory} fieldsFactory - A registry that maps string type names to Field constructors.
   * @param {FieldSerializer} fieldSerializer - A serializer of field instances.
   */
  constructor(
    private readonly fieldsFactory: FieldsFactory<TFields>,
    private readonly fieldSerializer: FieldSerializer
  ) {
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
    const res: FieldsSnapshot = {
      __type: fields.typeName,
    };

    fields.fields.forEach(field => res[field.name] = this.fieldSerializer.snapshot(field));
    return res;
  }

  /**
   * Restores a `Fields` container instance from its snapshot representation.
   *
   * It iterates through the field snapshots and hydrates them individually, adding them to the new container.
   * @param {FieldsSnapshot} snapshot - The plain object snapshot to deserialize.
   * @returns {Fields} A new `DefaultFields` instance populated with the restored fields.
   */
  hydrate(snapshot: FieldsSnapshot): TFields {
    const { __type, ...fieldsData } = snapshot;
    const fields = this.fieldsFactory.fields();

    for (const fieldName in fieldsData) {
      const fieldSnapshot = fieldsData[fieldName];
      const restoredField = this.fieldSerializer.hydrate(fieldSnapshot as FieldSnapshot);
      fields.add(restoredField);
    }

    return fields;
  }
}
