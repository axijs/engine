import {isFunction} from '@axijs/ensure';
import {StoreHydrator} from '../store-serializers';
import {ScopeSnapshot} from './types';
import {CoreScope} from '../scope';

export type ScopeParentGetter = ((parentId: string | undefined) => CoreScope | undefined);

/**
 * Resolves a parent scope from its uid stored in a scope snapshot.
 */
export class ScopeHydrator {
  readonly storeHydrator: StoreHydrator;
  
  constructor(storeHydrator: StoreHydrator) {
    this.storeHydrator = storeHydrator;
  }

  /**
   * Creates a scope from a snapshot and hydrates its store data.
   *
   * The parent can be provided directly as a scope or resolved from the
   * snapshot parent uid by passing a {@link ScopeParentGetter} function.
   */
  hydrate(snapshot: ScopeSnapshot, parent?: CoreScope |  ScopeParentGetter) {
    return new CoreScope({
      uid: snapshot.uid,
      name: snapshot.name,
      parent: isFunction(parent) ? parent(snapshot.parent) : parent,
      data: this.storeHydrator.hydrate(snapshot.data)
    });
  }

  /**
   * Applies a snapshot to an existing scope and patches its store data.
   *
   * By default, the scope's current parent is preserved. To update it, pass
   * the new parent directly or provide a {@link ScopeParentGetter} function
   * to resolve it from the snapshot parent uid.
   */
  patch(scope: CoreScope, snapshot: ScopeSnapshot, parent?: CoreScope | ScopeParentGetter) {
    scope.name = snapshot.name;
    if (!!parent) {
      scope.parent = isFunction(parent) ? parent(snapshot.parent) : parent;
    }
    this.storeHydrator.patch(scope.data, snapshot.data);
  }
}
