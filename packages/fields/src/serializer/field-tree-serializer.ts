import {FieldsSerializer} from './fields-serializer';
import {isString} from '@axi-engine/utils';
import {Fields} from '../fields';
import {FieldTreeFactory} from '../field-tree-factory';
import {FieldTree, TreeNode} from '../field-tree';
import {FieldTreeSnapshot} from './field-tree-snapshot';
import {FieldsSnapshot} from './fields-snapshot';


/**
 * Orchestrates the recursive serialization and deserialization of `FieldTree` instances.
 *
 * This class handles the conversion of an entire `FieldTree` object graph into a
 * plain, storable snapshot and vice-versa. It delegates the processing of `Fields`
 * leaf nodes to a dedicated `FieldsSerializer`.
 * @todo Refactoring: The current implementation uses `if/else` logic in `snapshot` and `hydrate`
 *       to process different node types. A more extensible approach would be to use a
 *       registry of dedicated handlers for each node type.
 *       This would allow new node types to be supported without
 *       modifying this class, adhering to the Open/Closed Principle.
 *
 * @todo Implement a `patch(tree, snapshot)` method for recursive, non-destructive
 *       updates. This method should traverse the existing tree and the snapshot,
 *       patching nodes in place to maintain object references.
 */
export class FieldTreeSerializer<TFields extends Fields> {

  _factory: FieldTreeFactory<TFields>;
  _fieldsSerializer: FieldsSerializer<TFields>

  get factory() {
    return this._factory;
  }

  get fieldsSerializer() {
    return this._fieldsSerializer;
  }

  constructor(fieldTreeNodeFactory: FieldTreeFactory<TFields>, fieldsSerializer: FieldsSerializer<TFields>) {
    this._factory = fieldTreeNodeFactory;
    this._fieldsSerializer = fieldsSerializer;
  }

  /**
   * Creates a serializable snapshot of the entire tree and its contained fields.
   * @returns A plain JavaScript object representing the complete state managed by this tree.
   */
  snapshot(tree: FieldTree<TFields>): FieldTreeSnapshot {
    const res: Record<string, any> = {
      __type: tree.typeName
    };

    tree.nodes.forEach((node: TreeNode<TFields>, key: string) => {
      if (node.typeName === tree.typeName) {
        res[key] = this.snapshot(node);
      } else if (node.typeName === Fields.typeName) {
        res[key] = this.fieldsSerializer.snapshot(node);
      }
    });
    return res as FieldTreeSnapshot;
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
      if (nodeData.__type === FieldTree.typeName) {
        tree.addNode(key, this.hydrate(nodeData as FieldTreeSnapshot))
      } else if (nodeData.__type === Fields.typeName) {
        tree.addNode(key, this.fieldsSerializer.hydrate(nodeData as FieldsSnapshot))
      }
    }

    return tree;
  }
}
