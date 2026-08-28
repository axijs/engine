import {StoreSnapshotter} from '../store-serializers';
import {CoreScope} from '../scope';
import {ScopeSnapshot} from './types';

export class ScopeSnapshotter {
  readonly storeSnapshotter: StoreSnapshotter;
  constructor(storeSnapshotter: StoreSnapshotter) {
    this.storeSnapshotter = storeSnapshotter;
  }

  snapshot(scope: CoreScope): ScopeSnapshot {
    return {
      uid: scope.uid,
      name: scope.name,
      parent: scope.parent?.uid,
      data: this.storeSnapshotter.snapshot(scope.data)
    }
  }
}
