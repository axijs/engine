import {FieldTree} from '@axi-engine/fields';

export class FieldTreeSerializer {

  /**
   * Creates a serializable snapshot of the entire tree and its contained fields.
   * @returns A plain JavaScript object representing the complete state managed by this tree.
   */
  snapshot(tree: FieldTree) {
    // const dump: Record<string, any> = {
    //   __type: FieldsNodeType.fieldTree
    // };
    // this._items.forEach((node, key) => dump[key] = node.snapshot());
    // return dump;
  }

  /**
   * Restores the state of the tree from a snapshot.
   * It intelligently creates missing nodes based on `__type` metadata and delegates hydration to child nodes.
   * @param snapshot The snapshot object to load.
   */
  hydrate(snapshot: any) {
    // for (const key in snapshot) {
    //   if (key === '__type') {
    //     continue;
    //   }
    //
    //   const field = snapshot[key];
    //   const type = field?.__type;
    //
    //   let node: TreeOrFieldsContainer | undefined = this._items.get(key);
    //   if (!node) {
    //     if (type === FieldsNodeType.fields) {
    //       node = this.createFields(key);
    //     } else if (type === FieldsNodeType.fieldTree) {
    //       node = this.createFieldTree(key);
    //     } else {
    //       console.warn(`Node '${key}' in snapshot has no __type metadata. Skipping.`);
    //     }
    //   }
    //   node?.hydrate(field);
    // }
  }
}
