import {FieldsSnapshotter, FieldsSnapshotterOptions} from '../field-serializers';
import {Store} from '../store';
import {SerializedStore} from './types';

export class StoreSnapshotter {
  snapshotter: FieldsSnapshotter;
  constructor(options?: FieldsSnapshotterOptions) {
    this.snapshotter = new FieldsSnapshotter(options);
  }

  snapshot(store: Store): SerializedStore {
    return {
      group: this.snapshotter.snapshot(store.getGroup()),
    };
  }
}
