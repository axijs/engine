import {StoreSnapshotter} from '../store-serializers';
import {CoreScope} from '../scope';
import {ScopeSnapshot} from './types';
import {isUndefined, throwIf} from '@axijs/ensure';

export class ScopeSnapshotter {
  readonly snapshotter: StoreSnapshotter;

  /**
   * @param snapshotter Optional store snapshotter to use.
   */
  constructor(snapshotter?: StoreSnapshotter) {
    this.snapshotter = snapshotter ?? new StoreSnapshotter();
  }

  /**
   * Captures a single scope and its serialized data.
   * 
   * @param scope The scope to snapshot.
   * @returns A snapshot of the scope without child scopes.
   */
  snapshotScope(scope: CoreScope): ScopeSnapshot {
    return {
      uid: scope.uid,
      name: scope.name,
      data: this.snapshotter.snapshot(scope.data)
    };
  }

  /**
   * Captures a scope and all nested child scopes.
   * 
   * @param scope The root scope of the subtree.
   * @returns A snapshot containing the scope data and its child snapshots.
   */
  snapshotSubtree(scope: CoreScope): ScopeSnapshot {
    return {
      uid: scope.uid,
      name: scope.name,
      data: this.snapshotter.snapshot(scope.data),
      children: scope.children.size === 0 ?
        undefined :
        [...scope.children].map(child => this.snapshotSubtree(child))
    };
  }

  /**
   * Captures the full hierarchy from the root ancestor.
   * 
   * @param scope Any scope in the hierarchy.
   * @returns A snapshot of the entire scope tree rooted at the topmost ancestor.
   */
  snapshotHierarchy(scope: CoreScope): ScopeSnapshot {
    const visited = new Set<string>();
    let root = scope;
    while (!isUndefined(root.parent)) {
      throwIf(visited.has(root.uid), `Dependencies in the tree are circular`);
      visited.add(root.uid);
      root = root.parent;
    }
    return this.snapshotSubtree(root);
  }
}
