import {FieldsHydrator} from './fields-hydrator';
import {isString, throwError} from '@axi-engine/utils';
import {Fields} from '../fields';
import {FieldTreeFactory} from '../field-tree-factory';
import {FieldTree} from '../field-tree';
import {FieldTreeSnapshot} from './field-tree-snapshot';
import {FieldsSnapshot} from './fields-snapshot';


/**
 * Orchestrates the recursive deserialization of `FieldTree` instances.
 *
 * This class handles the conversion of an entire `FieldTree` object graph into a
 * plain, storable snapshot and vice-versa. It delegates the processing of `Fields`
 * leaf nodes to a dedicated `FieldsHydrator`.
 * @todo Refactoring: The current implementation uses `if/else` logic in `snapshot` and `hydrate`
 *       to process different node types. A more extensible approach would be to use a
 *       registry of dedicated handlers for each node type.
 *       This would allow new node types to be supported without
 *       modifying this class, adhering to the Open/Closed Principle.
 */
export class FieldTreeHydrator<TFields extends Fields> {

  _factory: FieldTreeFactory<TFields>;
  _fieldsHydrator: FieldsHydrator<TFields>

  get factory() {
    return this._factory;
  }

  get fieldsHydrator() {
    return this._fieldsHydrator;
  }

  constructor(fieldTreeNodeFactory: FieldTreeFactory<TFields>, fieldsHydrator: FieldsHydrator<TFields>) {
    this._factory = fieldTreeNodeFactory;
    this._fieldsHydrator = fieldsHydrator;
  }

  /**
   * Restores the state of the tree from a snapshot.
   * It intelligently creates missing nodes based on `__type` metadata and delegates hydration to child nodes.
   * @param snapshot The snapshot object to load.
   */
  hydrate(snapshot: FieldTreeSnapshot): FieldTree<TFields> {
    const { __type, ...nodes } = snapshot;
    const tree = this._factory.tree();

    for (const key in nodes) {
      const nodeData = nodes[key];
      if (isString(nodeData)) {
        continue;
      }
      this.addNodeFromSnapshot(tree, key, nodeData);
    }
    return tree;
  }

  /**
   * Synchronizes an existing `FieldTree` branch with a snapshot.
   *
   * This method performs a recursive update to match the tree state with the provided snapshot:
   * 1. **Removes** child nodes that are present in the tree but missing in the snapshot.
   * 2. **Creates** new nodes that are present in the snapshot but missing in the tree.
   * 3. **Replaces** nodes if their type has changed (e.g., replacing a `Fields` leaf with a `FieldTree` branch).
   * 4. **Patches** existing matching nodes in-place (recursively).
   *
   * @param {FieldTree} tree - The target tree instance to update.
   * @param {FieldTreeSnapshot} snapshot - The source snapshot containing the desired state.
   */
  patch(tree: FieldTree<TFields>, snapshot: FieldTreeSnapshot) {
    const { __type, ...nodes } = snapshot;

    const snapshotKeys = new Set(Object.keys(nodes));

    // 1. remove nodes not present in the snapshot
    const nodesToRemove = Array.from(tree.nodes.keys())
      .filter(key => !snapshotKeys.has(key));

    tree.removeNode(nodesToRemove);

    // 2. Iterate through snapshot data to Patch or Create nodes
    for (const key in nodes) {
      const nodeData = nodes[key];
      // Skip metadata or invalid entries similar to hydrate logic
      if (isString(nodeData)) {
        continue;
      }

      if (!tree.has(key)) {
        this.addNodeFromSnapshot(tree, key, nodeData);
      } else {
        const treeNode = tree.getNode(key);
        if (treeNode.typeName !== nodeData.__type) {
          tree.removeNode(key);
          this.addNodeFromSnapshot(tree, key, nodeData);
        } else {
          if (nodeData.__type === FieldTree.typeName) {
            this.patch(treeNode as FieldTree<TFields>, nodeData as FieldTreeSnapshot);
          } else if (nodeData.__type === Fields.typeName) {
            this.fieldsHydrator.patch(treeNode as TFields, nodeData as FieldsSnapshot);
          }
        }
      }
    }
  }

  /**
   * Helper method to instantiate and add a new node to the tree based on the snapshot type.
   *
   * It determines whether to create a nested `FieldTree` or a `Fields` container
   * by inspecting the `__type` property of the snapshot, hydrates it, and attaches it to the parent tree.
   *
   * @param {FieldTree} tree - The parent tree instance where the new node will be added.
   * @param {string} key - The name (key) for the new node.
   * @param {FieldsSnapshot | FieldTreeSnapshot} snapshot - The source snapshot data.
   * @throws If the snapshot contains an unsupported or unknown `__type`.
   */
  private addNodeFromSnapshot(tree: FieldTree<TFields>, key: string, snapshot: FieldsSnapshot | FieldTreeSnapshot) {
    if (snapshot.__type === FieldTree.typeName) {
      tree.addNode(key, this.hydrate(snapshot as FieldTreeSnapshot))
    } else if (snapshot.__type === Fields.typeName) {
      tree.addNode(key, this.fieldsHydrator.hydrate(snapshot as FieldsSnapshot));
    } else {
      throwError(`Can't hydrate node with unsupported type: ${snapshot.__type}`);
    }
  }
}
