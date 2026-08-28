import {StoreSnapshotter} from '../store-serializers';
import {CoreScope} from '../scope';
import {ScopeSnapshot} from './types';

export class ScopeSnapshotter {
  readonly snapshotter: StoreSnapshotter;
  constructor(snapshotter?: StoreSnapshotter) {
    this.snapshotter = snapshotter ?? new StoreSnapshotter();
  }

  snapshot(scope: CoreScope): ScopeSnapshot {
    return {
      uid: scope.uid,
      name: scope.name,
      parent: scope.parent?.uid,
      data: this.snapshotter.snapshot(scope.data)
    }
  }
}
