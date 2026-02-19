import {Fields} from '../fields';
import {FieldsSnapshot} from './fields-snapshot';
import {FieldSnapshotter} from './field-snapshotter';

/**
 * The serialization of `Fields` container instances.
 *
 * This class responsible for converting an entire `Fields` object
 * into a storable snapshot.
 */
export class FieldsSnapshotter {
  /**
   * Creates an instance of FieldsSnapshotter.
   * @param {FieldSnapshotter} fieldSnapshotter - A serializer of field instances.
   */
  constructor(private readonly fieldSnapshotter: FieldSnapshotter) { }

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

    fields.fields.forEach(field => res[field.name] = this.fieldSnapshotter.snapshot(field));
    return res;
  }
}
