import {FieldsSnapshotter, FieldsSnapshotterOptions, SerializedGroup} from '../field-serializers';
import {Store} from '../store';

export class StoreSnapshotter {
  snapshotter: FieldsSnapshotter;
  constructor(options?: FieldsSnapshotterOptions) {
    this.snapshotter = new FieldsSnapshotter(options);
  }

  snapshot(store: Store): {group: SerializedGroup, readonlyPaths: string[]} {
    return {
      group: this.snapshotter.snapshot(store.getGroup()),
      readonlyPaths: store.readonlyPaths,
    };
  }
}
