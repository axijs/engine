import {SerializedStore} from './types';
import {Store} from '../store';
import {FieldsHydrator} from '../field-serializers';
import {FieldTypeRegistry} from '../field-type-registry';
import {ReferenceRegistry} from '../reference-registry';

export class StoreHydrator {
  hydrator: FieldsHydrator;

  constructor(hydrator?: FieldsHydrator) {
    this.hydrator = hydrator ?? new FieldsHydrator();
  }

  hydrate(
    snapshot: SerializedStore,
    options?: {
      typeRegistry?: FieldTypeRegistry;
      referenceRegistry?: ReferenceRegistry;
    }): Store {
    return new Store({
      group: this.hydrator.hydrate(snapshot.group),
      typeRegistry: options?.typeRegistry,
      referenceRegistry: options?.referenceRegistry
    });
  }

  patch(store: Store, snapshot: SerializedStore) {
    const changes = this.hydrator.patch(store.getGroup(), snapshot.group);
    changes.deleted.forEach(e => store.changes.deleted(e.path, e.value));
    changes.changed.forEach(e => store.changes.changed(e.path, e.value, e.oldValue));
    changes.created.forEach(e => store.changes.created(e.path, e.value));
    store.tick();
  }
}
