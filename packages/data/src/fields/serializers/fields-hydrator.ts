import {FieldHydrator} from './field-hydrator';
import {Fields} from '../fields';
import {FieldsFactory} from '../fields-factory';
import {FieldSnapshot} from './field-snapshot';
import {FieldsSnapshot} from './fields-snapshot';

/**
 * Deserialization of `Fields` container instances.
 * Responsible for converting snapshot of `Fields` object into a `Fields` instance.
 */
export class FieldsHydrator<TFields extends Fields> {
  /**
   * Creates an instance of FieldsSerializer.
   * @param {FieldsFactory} fieldsFactory - A registry that maps string type names to Field constructors.
   * @param {FieldHydrator} fieldHydrator - A hydrator of field instances.
   */
  constructor(
    private readonly fieldsFactory: FieldsFactory<TFields>,
    private readonly fieldHydrator: FieldHydrator
  ) {
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
      const restoredField = this.fieldHydrator.hydrate(fieldSnapshot as FieldSnapshot);
      fields.add(restoredField);
    }

    return fields;
  }

  /**
   * Synchronizes an existing `Fields` container with a snapshot.
   *
   * This method performs a "smart update":
   * 1. **Removes** fields from the container that are missing in the snapshot.
   * 2. **Patches** existing fields in-place using {@link FieldHydrator.patch}, preserving object references.
   * 3. **Creates** (hydrates) and adds new fields that exist in the snapshot but not in the container.
   *
   * @param {Fields} fields - The target `Fields` container to update.
   * @param {FieldsSnapshot} snapshot - The source snapshot containing the desired state.
   */
  patch(fields: TFields, snapshot: FieldsSnapshot): void {
    const { __type, ...fieldsData } = snapshot;
    const snapshotKeys = new Set(Object.keys(fieldsData));

    // 1. Identify and remove fields that are not present in the snapshot
    const fieldsToRemove: string[] = Array.from(fields.fields.values())
      .filter(f => !snapshotKeys.has(f.name))
      .map(f => f.name);

    // Batch remove
    fields.remove(fieldsToRemove);

    // 2. Iterate through snapshot data to Patch existing or Create new fields
    for (const fieldName in fieldsData) {
      const fieldSnapshot = fieldsData[fieldName] as FieldSnapshot;
      if (fields.has(fieldName)) {
        // Patch existing field in-place
        const existingField = fields.get(fieldName);
        this.fieldHydrator.patch(existingField, fieldSnapshot);
      } else {
        // Create and add new field
        const newField = this.fieldHydrator.hydrate(fieldSnapshot);
        fields.add(newField);
      }
    }
  }
}
