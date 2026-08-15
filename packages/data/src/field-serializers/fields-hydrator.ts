import {GroupPatchResult, SerializedField, SerializedGroup} from './types';
import {
  Field,
  FieldGroup,
  FieldNode,
  isField,
  isGroup,
  NodeOps,
  NodeFactory,
  FieldName
} from '../fields';
import {FieldTypeRegistry} from '../field-type-registry';
import {getDefaultSerializerRegistry, getDefaultTypeRegistry} from '../config';
import {SerializerRegistry} from './serializer-registry';
import {isSerializedField, isSerializedGroup} from './guards';
import {joinPathString} from '@axi-engine/utils';


export interface FieldsHydratorOptions {
  typeRegistry?: FieldTypeRegistry;
  serializerRegistry?: SerializerRegistry;
}

export class FieldsHydrator {

  protected typeRegistry: FieldTypeRegistry;
  protected serializerRegistry: SerializerRegistry;

  constructor(options?: FieldsHydratorOptions) {
    this.typeRegistry = options?.typeRegistry ?? getDefaultTypeRegistry();
    this.serializerRegistry = options?.serializerRegistry ?? getDefaultSerializerRegistry();
  }

  hydrate(snapshot: SerializedGroup): FieldGroup {
    const result: FieldGroup = {type: 'group', items: {}};

    for (const [key, node] of Object.entries(snapshot.items)) {
      result.items[key] = isSerializedGroup(node) ? this.hydrate(node) : this.hydrateField(node) as FieldNode;
    }

    return result;
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

    this.patchNode(group, snapshot, '', patchResult);

    return patchResult;
  }

  private hydrateField(node: SerializedField): Field<unknown> {
    return {
      type: node.type,
      value: this.serializerRegistry.has(node.type) ?
        this.serializerRegistry.getOrThrow(node.type).deserialize(node.value) :
        this.typeRegistry.cloneValue(node.value)
    }
  }

  private patchNode(
    group: FieldGroup,
    snapshot: SerializedGroup,
    path: string,
    patchResult: GroupPatchResult
  ) {
    for (const key in group.items) {
      if (!(key in snapshot.items)) {
        this.deleteNodeOnPatch(group, key, path, patchResult);
      } else {
        const node = group.items[key];
        const snapshotNode = snapshot.items[key];
        if (node.type !== snapshotNode.type) {
          this.deleteNodeOnPatch(group, key, path, patchResult);
          this.createFromSnapshot(group, snapshot, key, path, patchResult);
        } else {
          const newPath = joinPathString(path, key);
          if (isGroup(node)) {
            this.patchNode(node, snapshotNode as SerializedGroup, newPath, patchResult);
          } else if (isField(node)) {
            const oldVal = node.value;
            node.value = this.typeRegistry.getDefinition(node.type).cloneValue((snapshotNode as SerializedField).value);
            patchResult.changed.push({
              path: newPath,
              value: node.value,
              oldValue: oldVal
            });
          }
        }
      }
    }
    for (const key in snapshot.items) {
      if (!(key in group.items)) {
        this.createFromSnapshot(group, snapshot, key, path, patchResult);
      }
    }
  }

  private deleteNodeOnPatch(group: FieldGroup, key: string, path: string, patchResult: GroupPatchResult) {
    const nodeToDelete = group.items[key];
    const deleted = this.flatNode(nodeToDelete, key, {});
    patchResult.deleted.push(...Object.keys(deleted).reverse()
      .map(deletedKey => ({path: joinPathString(path, deletedKey), value: deleted[deletedKey]})));

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

  private createFromSnapshot(
    group: FieldGroup,
    snapshot: SerializedGroup,
    key: string,
    path: string,
    patchResult: GroupPatchResult
  ) {
    const snapshotNode = snapshot.items[key];
    const newPath = joinPathString(path, key);
    if (isSerializedField(snapshotNode)) {
      const def = this.typeRegistry.getDefinition(snapshotNode.type as FieldName);
      NodeOps.add(group, key, NodeFactory.raw(snapshotNode.type, def.cloneValue(snapshotNode.value)) as FieldNode);
      patchResult.created.push({
        path: newPath,
        value: def.cloneValue(snapshotNode.value),
      });
    } else if (isSerializedGroup(snapshotNode)) {
      const groupNode = NodeFactory.group({});
      NodeOps.add(group, key, groupNode);
      patchResult.created.push({path: newPath});
      for (const snapshotKey in snapshotNode.items) {
        this.createFromSnapshot(groupNode, snapshotNode, snapshotKey, newPath, patchResult);
      }
    }
  }
}
