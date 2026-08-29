import {StoreHydrator} from '../store-serializers';
import {ScopeSnapshot} from './types';
import {CoreScope} from '../scope';

/**
 * Resolves a parent scope from its uid stored in a scope snapshot.
 */
export class ScopeHydrator {
  readonly hydrator: StoreHydrator;

  constructor(hydrator?: StoreHydrator) {
    this.hydrator = hydrator ?? new StoreHydrator();
  }

  /**
   * Creates a scope from a snapshot and hydrates its store data.
   *
   * @param {ScopeSnapshot} snapshot
   * @param {CoreScope} [parent]
   *
   * @return CoreScope
   */
  hydrateScope(snapshot: ScopeSnapshot, parent?: CoreScope) {
    return new CoreScope({
      uid: snapshot.uid,
      name: snapshot.name,
      parent: parent,
      data: this.hydrator.hydrate(snapshot.data, parent?.data.typeRegistry)
    });
  }

  /**
   * Applies a snapshot to an existing scope and patches its store data.
   *
   */
  patchScope(scope: CoreScope, snapshot: ScopeSnapshot, parent?: CoreScope) {
    scope.name = snapshot.name;
    if (!!parent) {
      scope.parent = parent;
    }
    this.hydrator.patch(scope.data, snapshot.data);
  }
}
