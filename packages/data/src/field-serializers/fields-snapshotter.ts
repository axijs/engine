import {FieldTypeRegistry} from '../field-type-registry';
import {getDefaultTypeRegistry} from '../config';
import {Field, FieldGroup, isGroup} from '../fields';
import {SerializedGroup} from './types';

export class FieldsSnapshotter {
  protected typeRegistry: FieldTypeRegistry;

  constructor(typeRegistry?: FieldTypeRegistry) {
    this.typeRegistry = typeRegistry ?? getDefaultTypeRegistry();
  }

  snapshot(group: FieldGroup): SerializedGroup {
    const snapshot: SerializedGroup = {
      type: 'group',
      items: {}
    }

    for (const [key, node] of Object.entries(group.items)) {
      snapshot.items[key] = {
        type: node.type,
        value: isGroup(node) ? this.snapshot(node) : this.snapshotField(node)
      };
    }
    return snapshot;
  }

  snapshotField(field: Field<any>) {
    return this.typeRegistry.snapshotFieldValue(field);
  }
}
