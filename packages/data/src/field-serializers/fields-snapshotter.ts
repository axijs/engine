import {FieldTypeRegistry} from '../field-type-registry';
import {getDefaultSerializerRegistry, getDefaultTypeRegistry} from '../config';
import {Field, FieldGroup, isGroup} from '../fields';
import {SerializedField, SerializedGroup} from './types';
import {SerializerRegistry} from './serializer-registry';

export class FieldsSnapshotter {
  protected typeRegistry: FieldTypeRegistry;
  protected serializerRegistry: SerializerRegistry;

  constructor(options?: { typeRegistry?: FieldTypeRegistry, serializerRegistry?: SerializerRegistry }) {
    this.typeRegistry = options?.typeRegistry ?? getDefaultTypeRegistry();
    this.serializerRegistry = options?.serializerRegistry ?? getDefaultSerializerRegistry();
  }

  snapshot(group: FieldGroup): SerializedGroup {
    const snapshot: SerializedGroup = {
      type: 'group',
      items: {}
    }

    for (const [key, node] of Object.entries(group.items)) {
      snapshot.items[key] = isGroup(node) ? this.snapshot(node) : this.snapshotField(node);
    }
    return snapshot;
  }

  snapshotField(field: Field<any>): SerializedField {
    return {
      type: field.type,
      value: this.serializerRegistry.has(field.type) ?
        this.serializerRegistry.getOrThrow(field.type).serialize(field.value) :
        this.typeRegistry.cloneValue(field.value)
    };
  }
}
