import {SerializedField, SerializedGroup} from './types';
import {Field, FieldGroup, NodeName} from '../fields';
import {FieldTypeRegistry} from '../field-type-registry';
import {getDefaultSerializerRegistry, getDefaultTypeRegistry} from '../config';
import {SerializerRegistry} from './serializer-registry';
import {isSerializedGroup} from './guards';

export class FieldsHydrator {

  protected typeRegistry: FieldTypeRegistry;
  protected serializerRegistry: SerializerRegistry;

  constructor(options?: { typeRegistry?: FieldTypeRegistry, serializerRegistry?: SerializerRegistry }) {
    this.typeRegistry = options?.typeRegistry ?? getDefaultTypeRegistry();
    this.serializerRegistry = options?.serializerRegistry ?? getDefaultSerializerRegistry();
  }

  hydrate(snapshot: SerializedGroup): FieldGroup {
    const result: FieldGroup = {type: 'group', items: {}};

    for (const [key, node] of Object.entries(snapshot.items)) {
      result.items[key] = {
        type: node.type as NodeName,
        value: isSerializedGroup(node) ? this.hydrate(node) : this.hydrateField(node)
      };
    }

    return result;
  }

  hydrateField(node: SerializedField): Field<unknown> {
    return {
      type: node.type,
      value: this.serializerRegistry.has(node.type) ?
        this.serializerRegistry.getOrThrow(node.type).deserialize(node.value) :
        this.typeRegistry.cloneValue(node.value)
    }
  }

  /**
   * should return diff - added, changed, deleted fields
   */
  patch(group: FieldGroup, snapshot: SerializedGroup) {

  }
}
