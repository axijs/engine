import {Fields} from '../fields';
import {TreeNode} from '../field-tree';
import {FieldTreeSnapshot} from './field-tree-snapshot';
import {FieldsSnapshotter} from './fields-snapshotter';
import {CoreFieldTree} from '../core-field-tree';


/**
 */
export class FieldTreeSnapshotter {

  constructor(public readonly fieldsSnapshotter: FieldsSnapshotter) {
  }

  /**
   * Creates a serializable snapshot of the entire tree and its contained fields.
   * @returns A plain JavaScript object representing the complete state managed by this tree.
   */
  snapshot(tree: CoreFieldTree): FieldTreeSnapshot {
    const res: Record<string, any> = {
      __type: tree.typeName
    };

    tree.nodes.forEach((node: TreeNode<any>, key: string) => {
      if (node.typeName === tree.typeName) {
        res[key] = this.snapshot(node);
      } else if (node.typeName === Fields.typeName) {
        res[key] = this.fieldsSnapshotter.snapshot(node);
      }
    });
    return res as FieldTreeSnapshot;
  }
}
