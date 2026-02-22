import {DataStoreSnapshot} from './data-store-snapshot';
import {CoreStore} from '../../store';
import {FieldTreeSnapshotter} from './field-tree-snapshotter';

/**
 */
export class DataStoreSnapshotter {
  /**
   * Creates an instance of DataStoreSnapshotter.
   * @param {FieldTreeSnapshotter} treeSnapshotter - The serializer used for the underlying tree and fields.
   */
  constructor(private readonly treeSnapshotter: FieldTreeSnapshotter) {
  }

  /**
   * Captures the current state of a DataStore into a serializable snapshot.
   *
   * It checks for the existence of internal variables and the internal tree,
   * serializing them only if they have been initialized (lazy serialization).
   *
   * @param {CoreStore} store - The store instance to serialize.
   * @returns {DataStoreSnapshot} The snapshot object.
   */
  snapshot(store: CoreStore): DataStoreSnapshot {
    let snapshot: DataStoreSnapshot = {
      __type: store.typeName,
    }

    const variables = store.getInternalVariables();
    if (variables) {
      snapshot.variables = this.treeSnapshotter.fieldsSnapshotter.snapshot(variables);
    }
    const tree = store.getInternalTree();
    if (tree) {
      snapshot.tree = this.treeSnapshotter.snapshot(tree);
    }

    return snapshot;
  }
}
