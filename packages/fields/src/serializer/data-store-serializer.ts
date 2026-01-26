import {FieldTreeSerializer} from './field-tree-serializer';
import {CoreFields} from '../core-fields';
import {DataStoreSnapshot} from './data-store-snapshot';
import {DataStore} from '../data-store';
import {CoreFieldTree} from '../core-field-tree';
import {isNullOrUndefined} from '@axi-engine/utils';

/**
 * Handles the serialization and deserialization of DataStore instances.
 *
 * This class ensures that both components of a DataStore (the detached variables
 * and the hierarchical tree) are correctly persisted and restored. It delegates
 * the actual serialization of the inner structures to the `FieldTreeSerializer`.
 */
export class DataStoreSerializer {
  /**
   * Creates an instance of DataStoreSerializer.
   * @param {FieldTreeSerializer} fieldTreeSerializer - The serializer used for the underlying tree and fields.
   */
  constructor(private readonly fieldTreeSerializer: FieldTreeSerializer<CoreFields>) {
  }

  /**
   * Captures the current state of a DataStore into a serializable snapshot.
   *
   * It checks for the existence of internal variables and the internal tree,
   * serializing them only if they have been initialized (lazy serialization).
   *
   * @param {DataStore} store - The store instance to serialize.
   * @returns {DataStoreSnapshot} The snapshot object.
   */
  snapshot(store: DataStore): DataStoreSnapshot {
    let snapshot: DataStoreSnapshot = {
      __type: store.typeName,
    }

    const variables = store.getInternalVariables();
    if (variables) {
      snapshot.variables = this.fieldTreeSerializer.fieldsSerializer.snapshot(variables);
    }
    const tree = store.getInternalTree();
    if (tree) {
      snapshot.tree = this.fieldTreeSerializer.snapshot(tree);
    }

    return snapshot;
  }

  /**
   * Reconstructs a DataStore instance from a snapshot.
   *
   * If the snapshot contains a tree, the store is initialized with it.
   * If not, the store is initialized with the factory (lazy mode), and the
   * detached variables are injected if present.
   *
   * @param {DataStoreSnapshot} snapshot - The snapshot to hydrate.
   * @returns {DataStore} A new, fully restored DataStore instance.
   */
  hydrate(snapshot: DataStoreSnapshot): DataStore {
    const tree: CoreFieldTree | undefined = isNullOrUndefined(snapshot.tree) ?
      undefined :
      this.fieldTreeSerializer.hydrate(snapshot.tree);

    const variables: CoreFields | undefined = isNullOrUndefined(snapshot.variables) ?
      undefined :
      this.fieldTreeSerializer.fieldsSerializer.hydrate(snapshot.variables);

    return new DataStore(tree ? tree : this.fieldTreeSerializer.factory, variables);
  }
}
