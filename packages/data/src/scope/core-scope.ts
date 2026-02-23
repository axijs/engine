import {Scope} from './scope';
import {CoreStore} from '../store'
import {ensurePathArray, ensurePathString, PathType} from '@axi-engine/utils';
import {ScopeError} from './errors';
import {SCOPE_SYSTEM_CONFIG} from './config';

export interface ScopeOptions {
  data: CoreStore,
  name?: string,
  parent?: CoreScope
}

export class CoreScope implements Scope {
  data: CoreStore;
  name?: string;
  parent?: CoreScope;

  constructor(options: ScopeOptions) {
    this.data = options.data;
    this.name = options.name;
    this.parent = options.parent;
  }

  extend(childName?: string): Scope {
    return new CoreScope({data: this.data.createIsolated(), parent: this, name: childName});
  }

  get<T extends unknown>(name: PathType): T {
    try {
      const path = ensurePathArray(name);
      if (path.length === 1) {
        return this.data.get(path) as T;
      }
      const [root, ...pathPart] = path;
      console.log('test:', root, pathPart);
    } catch (e) {
      throw new ScopeError(`Can't get variable by path: ${ensurePathString(name)}`, {cause: e});
    }

    return undefined as T;
    // const {path, keys} = this.normalizeKeysAndPath(name);
    // let res: unknown | undefined;
    // for (let key of keys) {
    //   res = this.layers.get(key)!.find(path);
    //   if (!isUndefined(res)) {
    //     break;
    //   }
    // }
    // throwIf(isUndefined(res), `Can't find variable '${ensurePathString(name)}'`);
    // return res as unknown;
  }

  set<T extends unknown>(name: PathType, value: T) {
    // console.log('scope: set', name, value);
    //
    // const path = ensurePathArray(name);
    // if (path.length === 1) {
    //   if (this.data.has(path)) {
    //     return this.data.set(path, value);
    //   } else {
    //     return this.parent?.set(name, value);
    //   }
    // }

    // const {path, keys} = this.normalizeKeysAndPath(name);
    // for (let key of keys) {
    //   if (this.layers.get(key)!.modify(path, value)) {
    //     return;
    //   }
    // }
    // throwError(`Can't modify field '${ensurePathString(name)}', field does not exists`);
  }

  upset<T extends unknown>(name: PathType, value: T) {
    console.log('scope: upset: ', ensurePathString(name), JSON.stringify(value));
    const path = ensurePathArray(name);
    /**
     * if path has only one segment - store data in current layer fields store
     *
     */
    if (path.length === 1) {
      this.data?.upset(path, value);
      console.log('one segment: after upset data: ', this.data);
    } else {

    }
    // const {path, keys} = this.normalizeKeysAndPath(name);
  }

  create<T extends unknown>(name: PathType, value: T) {
    console.log('scope: create variable: ', ensurePathString(name), value);
    const pathAndScope = this.tracePath(name);
    try {
      // if (path.length === 1) {
      //   this.data.create(path, value);
      // } else {
      //
      // }
    } catch (e) {
      throw new ScopeError(`Can't create variable by path: ${ensurePathString(name)}`, {cause: e});
    }

    // const {path, keys} = this.normalizeKeysAndPath(name);
    // console.log('create: ', name, value, path, keys);
    // for (let key of keys) {
    //   if (this.layers.get(key)!.create(path, value)) {
    //     return;
    //   }
    // }
    // throwError(`Can't create field '${ensurePathString(name)}', check scope configuration`);
  }

  delete(name: PathType) {
    // todo: logic
  }

  has(name: PathType) {
    console.log('scope: has:', ensurePathString(name));

    return false;
    // const {path, keys} = this.normalizeKeysAndPath(name);
    // for (let key of keys) {
    //   if (this.layers.get(key)!.has(path)) {
    //     return true;
    //   }
    // }
    // return false;
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
  tracePath(path: PathType): { node: CoreScope, path: PathType } {
    const pathArr = ensurePathArray(path);
    if (pathArr.length === 1) {
      return {
        node: this,
        path: pathArr,
      }
    }
    const [root, ...pathSegments] = pathArr;
    if (root === SCOPE_SYSTEM_CONFIG.currentScopeKeyword) {
      return {
        node: this,
        path: pathSegments
      }
    }
    const targetParent = this.findParentScopeByName(root);
    if (targetParent) {
      return {
        node: targetParent,
        path: pathSegments
      }
    }
    return {
      node: this,
      path: pathArr
    }
  }

  /**
   * Recursively searches for the nearest parent scope with the specified name,
   * traversing up the hierarchy chain.
   *
   * @param name The name of the scope to find.
   * @returns The matching scope, or `undefined` if the root is reached without a match.
   */
  findParentScopeByName(name: string): CoreScope | undefined {
    if (!this.parent) {
      return undefined;
    }
    if (this.parent.name === name) {
      return this.parent;
    }
    return this.parent.findParentScopeByName(name);
  }
}
