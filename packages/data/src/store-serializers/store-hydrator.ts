import {SerializedStore} from './types';
import {Store} from '../store';
import {FieldsHydrator, FieldsHydratorOptions} from '../field-serializers';

export class StoreHydrator {
  hydrator: FieldsHydrator;


  constructor(options: FieldsHydratorOptions) {
    this.hydrator = new FieldsHydrator(options);
  }

  hydrate(snapshot: SerializedStore): Store {
    return new Store({group: this.hydrator.hydrate(snapshot.group)});
  }

  patch(store: Store, snapshot: SerializedStore) {
    const changes = this.hydrator.patch(store.getGroup(), snapshot.group);
    changes.deleted.forEach(e => store.changes.deleted(e.path, e.value));
    changes.changed.forEach(e => store.changes.changed(e.path, e.value, e.oldValue));
    changes.created.forEach(e => store.changes.created(e.path, e.value));
    store.tick();
  }
}
