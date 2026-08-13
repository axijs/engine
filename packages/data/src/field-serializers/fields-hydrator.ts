import {GroupPatchResult, SerializedField, SerializedGroup, SerializedNode} from './types';
import {Field, FieldGroup, FieldNode, isField, isGroup, NodeName, NodeOps} from '../fields';
import {FieldTypeRegistry} from '../field-type-registry';
import {getDefaultSerializerRegistry, getDefaultTypeRegistry} from '../config';
import {SerializerRegistry} from './serializer-registry';
import {isSerializedGroup} from './guards';
import {joinPathString} from '@axi-engine/utils';


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

    for (const key in group.items) {
      if (!(key in snapshot.items)) {
        this.deleteNodeOnPatch(group, key, patchResult);
      } else {
        const node = group.items[key];
        const snapshotNode = snapshot.items[key];
        this.patchNode(node, snapshotNode, key, patchResult);
      }
    }

    return patchResult;
  }

  patchNode(
    node: FieldNode,
    snapshotNode: SerializedNode,
    path: string,
    patchResult: GroupPatchResult
  ) {

    // if (node.type !== snapshotNode.type) {
    //   this.deleteNodeOnPatch(group, key, patchResult);
    //   this.createFromSnapshot(group, key, snapshotNode, patchResult);
    // } else {
    //   if (isField(node)) {
    //     const oldVal = node.value;
    //     node.value = this.typeRegistry.getDefinition(node.type).cloneValue((snapshotNode as SerializedField).value);
    //     patchResult.changed.push({path: key, value: node.value, oldValue: oldVal});
    //   } else if (isGroup(node)) {
    //
    //   }
    // }
  }

  private deleteNodeOnPatch(group: FieldGroup, key: string, patchResult: GroupPatchResult) {
    const nodeToDelete = group.items[key];
    const deleted = this.flatNode(nodeToDelete, key, {});
    patchResult.deleted.push(...Object.keys(deleted).reverse()
      .map(deletedKey => ({path: deletedKey, value: deleted[deletedKey]})));

    NodeOps.remove(group, key);
  }

  private flatNode(
    node: FieldNode,
    nodePath: string,
    record: Record<string, unknown>
  ) {
    record[nodePath] = undefined;
    if (isField(node)) {
      record[nodePath] = this.typeRegistry.cloneNodeValue(node);
    } else if (isGroup(node)) {
      for (const key in node.items) {
        this.flatNode(node.items[key], joinPathString(nodePath, key), record);
      }
    }
    return record;
  }

  createFromSnapshot(group: FieldGroup, key: string, snapshotNode: SerializedNode, patchResult: GroupPatchResult) {

  }

}
