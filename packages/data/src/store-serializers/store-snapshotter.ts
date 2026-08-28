import {FieldsSnapshotter} from '../field-serializers';
import {Store} from '../store';
import {SerializedStore} from './types';

export class StoreSnapshotter {
  snapshotter: FieldsSnapshotter;
  constructor(snapshotter?: FieldsSnapshotter) {
    this.snapshotter = snapshotter ?? new FieldsSnapshotter();
  }

  snapshot(store: Store): SerializedStore {
    return {
      group: this.snapshotter.snapshot(store.getGroup()),
    };
  }
}
