import {GroupPatchResult, NodePatchResult, SerializedField, SerializedGroup, SerializedNode} from './types';
import {Field, FieldGroup, FieldNode, GroupOps, isField, isGroup, NodeName, NodeOps} from '../fields';
import {FieldTypeRegistry} from '../field-type-registry';
import {getDefaultSerializerRegistry, getDefaultTypeRegistry} from '../config';
import {SerializerRegistry} from './serializer-registry';
import {isSerializedGroup} from './guards';
import {ensurePathString} from '@axi-engine/utils';


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
  patch(group: FieldGroup, snapshot: SerializedGroup): GroupPatchResult {
    const patchResult: GroupPatchResult = {
      created: [],
      changed: [],
      deleted: [],
    };

    // 1. collect nodes that should be deleted from current group
    this.clearTarget(group, snapshot);

    // for (const [key, node] of Object.entries(snapshot.items)) {
    //   console.log(key in group.items, key);
    //   if (key in group.items) {
    //     // const pathPool: string[] = [key];
    //     // isSerializedGroup(node) ?
    //     //   this.patchGroup(pathPool, group, node, patchResult) :
    //     //   this.patchField(pathPool, group, node, patchResult);
    //   } else {
    //
    //   }
    // }

    return patchResult;
  }

  patchGroup(path: string[], group: FieldGroup, node: SerializedNode, patchResult: GroupPatchResult) {

  }

  patchField(path: string[], group: FieldGroup, node: SerializedField, patchResult: GroupPatchResult) {
    if (!GroupOps.has(group, path)) {
      // todo: create
    } else {
      const node = GroupOps.get(group, path)!;
      if (isGroup(node)) {
        // todo: delete group and create field
      } else {
        // todo: compare type, if they same - update value, otherwise - recreate
      }
    }

    console.log('patch field: ', path, node);
  }

  private clearTarget(group: FieldGroup, snapshot: SerializedGroup) {
    for (const [key, node] of Object.entries(group.items)) {
      if (!(key in snapshot.items)) {
        const path = [key];


        // this.collectDeletingDetails(group.items[key], [key]);

        // NodeOps.remove(group, key);
        // console.log('remove node or field: ', key, node);
      }
    }

  }

  private collectDeletingDetails(node: FieldNode, path: string[]) {
    const items: NodePatchResult[] = [];
    if (isField(node)) {
      items.push({path: ensurePathString(path), value: this.typeRegistry.cloneNodeValue(node)});
    } else if (isGroup(node)) {
      this.collectDeletingDetails(node, path);
    }
    return items;
  }
}
