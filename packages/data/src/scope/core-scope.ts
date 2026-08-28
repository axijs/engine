import {ensurePathArray, ensurePathString, PathType, uid} from '@axi-engine/utils';
import {throwError} from '@axijs/ensure';
import {Scope} from './scope';
import {Store} from '../store'
import {ScopeError} from './errors';
import {SCOPE_SYSTEM_CONFIG} from './config';

export interface ScopeOptions {
  uid?: string;
  name?: string;
  parent?: CoreScope;
  data?: Store;
}

export class CoreScope implements Scope {
  readonly uid: string;
  name?: string;
  parent?: CoreScope;
  data: Store;

  constructor(options: ScopeOptions) {
    this.uid = options.uid ?? uid();
    this.name = options.name;
    this.parent = options.parent;
    this.data = options.data ?? new Store();
  }

  extend(childName?: string): CoreScope {
    return new CoreScope({
      name: childName,
      parent: this,
      data: new Store({
        referenceRegistry: this.data.referenceRegistry,
        typeRegistry: this.data.typeRegistry
      }),
    });
  }

  get<T = any>(name: PathType): T {
    try {
      const pathAndScope = this.tracePath(name);
      if (pathAndScope.scope !== this) {
        return pathAndScope.scope.data.get<T>(pathAndScope.path);
      }
      if (this.data.has(pathAndScope.path)) {
        return this.data.get<T>(pathAndScope.path);
      }
      if (this.parent) {
        return this.parent.get<T>(pathAndScope.path);
      }
      throwError(`Variable not found in scope chain`);
    } catch (e) {
      throw new ScopeError(`Can't get variable by path: ${ensurePathString(name)}`, {cause: e});
    }
  }

  set<T>(name: PathType, value: T): void {
    try {
      const pathAndScope = this.tracePath(name);
      if (pathAndScope.scope !== this) {
        pathAndScope.scope.data.set<T>(pathAndScope.path, value);
        return;
      }
      if (this.data.has(pathAndScope.path)) {
        this.data.set<T>(pathAndScope.path, value);
        return;
      }
      if (this.parent) {
        this.parent.set<T>(pathAndScope.path, value);
        return;
      }
      throwError(`Variable not found in scope chain`);
    } catch (e) {
      throw new ScopeError(`Can't set variable by path: ${ensurePathString(name)}`, {cause: e});
    }
  }

  /**
   * working only for clearly resolved path to variable
   */
  upsert<T>(name: PathType, value: T) {
    try {
      const pathAndScope = this.tracePath(name);
      pathAndScope.scope.data.upsert(pathAndScope.path, value);
    } catch (e) {
      throw new ScopeError(`Can't create or update variable by path: ${ensurePathString(name)}`, {cause: e});
    }
  }

  /**
   * working only for clearly resolved path to variable
   */
  create<T>(name: PathType, value: T) {
    try {
      const pathAndScope = this.tracePath(name);
      pathAndScope.scope.data.create(pathAndScope.path, value);
    } catch (e) {
      throw new ScopeError(`Can't create variable by path: ${ensurePathString(name)}`, {cause: e});
    }
  }

  /**
   * working only for clearly resolved path to variable
   */
  delete(name: PathType) {
    try {
      const pathAndScope = this.tracePath(name);
      pathAndScope.scope.data.delete(pathAndScope.path);
    } catch (e) {
      throw new ScopeError(`Can't delete variable by path: ${ensurePathString(name)}`, {cause: e});
    }
  }

  clear() {
    this.data.clear();
  }

  destroy() {
    this.data.clear();
    this.parent = undefined;
  }

  has(name: PathType): boolean {
    const pathAndScope = this.tracePath(name);
    if (pathAndScope.scope !== this) {
      return pathAndScope.scope.data.has(pathAndScope.path);
    }
    if (this.data.has(pathAndScope.path)) {
      return true;
    }
    return !!this.parent?.has(name);
  }

  /**
   * Resolves the target scope node and the relative path for a variable operation.
   *
   * This method disambiguates between accessing nested objects within the current scope
   * and accessing variables defined in named parent scopes.
   *
   * Resolution Logic:
   * 1. **Single Segment (`var`):** Always targets the current scope.
   * 2. **`this` Keyword (`this.var`):** (SCOPE_SYSTEM_CONFIG.currentScopeKeyword) Explicitly targets the current scope (used to bypass naming conflicts).
   * 3. **Parent Scope Name (`global.var`):** If the first segment matches a parent's name, targets that parent scope.
   * 4. **Complex Path (`obj.prop`):** If no match is found, treats it as a nested path within the current scope.
   *
   * @param path The full path to the variable.
   * @returns An object containing the target scope (`node`) and the adjusted path (`path`) relative to that node.
   */
  tracePath(path: PathType): { scope: CoreScope, path: PathType } {
    const pathArr = ensurePathArray(path);
    if (pathArr.length === 1) {
      return {
        scope: this,
        path: pathArr,
      }
    }
    const [rootKey, ...pathSegments] = pathArr;
    if (rootKey === SCOPE_SYSTEM_CONFIG.currentScopeKeyword) {
      return {
        scope: this,
        path: pathSegments
      }
    }
    const targetParent = this.findScopeByName(rootKey);
    if (targetParent) {
      return {
        scope: targetParent,
        path: pathSegments
      }
    }
    return {
      scope: this,
      path: pathArr
    }
  }

  /**
   * Recursively searches for the nearest scope with the specified name,
   * traversing up the hierarchy chain.
   *
   * @param name The name of the scope to find.
   * @returns The matching scope, or `undefined` if the root is reached without a match.
   */
  findScopeByName(name: string): CoreScope | undefined {
    if (this.name === name) {
      return this;
    }
    return this.parent?.findScopeByName(name);
  }
}
