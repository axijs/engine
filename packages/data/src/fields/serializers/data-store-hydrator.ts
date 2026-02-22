import {FieldTreeHydrator} from './field-tree-hydrator';
import {CoreFields} from '../core-fields';
import {DataStoreSnapshot} from './data-store-snapshot';
import {CoreStore} from '../../store';
import {CoreFieldTree} from '../core-field-tree';
import {isNullOrUndefined} from '@axi-engine/utils';

/**
 *
 */
export class DataStoreHydrator {
  /**
   * Creates an instance of DataStoreSerializer.
   * @param {FieldTreeHydrator} fieldsFieldTreeHydrator - The serializer used for the underlying tree and fields.
   */
  constructor(private readonly fieldsFieldTreeHydrator: FieldTreeHydrator<CoreFields>) {
  }

  /**
   * Reconstructs a DataStore instance from a snapshot.
   *
   * If the snapshot contains a tree, the store is initialized with it.
   * If not, the store is initialized with the factory (lazy mode), and the
   * detached variables are injected if present.
   *
   * @param {DataStoreSnapshot} snapshot - The snapshot to hydrate.
   * @returns {CoreStore} A new, fully restored DataStore instance.
   */
  hydrate(snapshot: DataStoreSnapshot): CoreStore {
    const tree: CoreFieldTree | undefined = isNullOrUndefined(snapshot.tree) ?
      undefined :
      this.fieldsFieldTreeHydrator.hydrate(snapshot.tree);

    const variables: CoreFields | undefined = isNullOrUndefined(snapshot.variables) ?
      undefined :
      this.fieldsFieldTreeHydrator.fieldsHydrator.hydrate(snapshot.variables);

    return new CoreStore(tree ? tree : this.fieldsFieldTreeHydrator.factory, variables);
  }

  /**
   * Synchronizes a DataStore instance with a snapshot.
   *
   * This method ensures the DataStore's internal state matches the snapshot by:
   * 1. **Destroying** internal containers (variables/tree) if they are missing in the snapshot.
   * 2. **Patching** (updating/creating) contents if they exist in the snapshot.
   *
   * This allows for a granular update where only specific parts of the store (e.g., only variables)
   * are modified if the snapshot contains partial data, or a full reset if parts are missing.
   *
   * @param {CoreStore} store - The target DataStore to update.
   * @param {DataStoreSnapshot} snapshot - The source snapshot.
   */
  patch(store: CoreStore, snapshot: DataStoreSnapshot): void {
    if (!snapshot.variables) {
      store.getInternalVariables()?.destroy();
    } else {
      this.fieldsFieldTreeHydrator.fieldsHydrator
        .patch(store.getOrCreateInternalVariables(), snapshot.variables);
    }
    if (!snapshot.tree) {
      store.getInternalTree()?.destroy();
    } else {
      this.fieldsFieldTreeHydrator.patch(store.getOrCreateInternalTree(), snapshot.tree);
    }
  }
}
