import {Scope} from './scope';
import {DataStore} from '../store'
import {ensurePathArray, ensurePathString, PathType} from '@axi-engine/utils';

export interface ScopeOptions {
  data: DataStore,
  name?: string,
  parent?: Scope
}

export class CoreScope implements Scope {
  data: DataStore;
  name?: string;
  parent?: Scope;

  constructor(options: ScopeOptions) {
    this.data = options.data;
    this.name = options.name;
    this.parent = options.parent;
  }

  extend(childName?: string): Scope {
    return new CoreScope({data: this.data.createIsolated(), parent: this, name: childName});
  }

  get<T extends unknown>(name: PathType): T {
    console.log('scope: get:', ensurePathString(name));
    const path = ensurePathArray(name);
    if (path.length === 1) {
      if (this.data.has(path)) {
        return this.data.get(path) as T;
      } else {
        return this.parent?.get(name) as T;
      }
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
    console.log('scope: set', name, value);

    const path = ensurePathArray(name);
    if (path.length === 1) {
      if (this.data.has(path)) {
        return this.data.set(path, value);
      } else {
        return this.parent?.set(name, value);
      }
    }

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

  private normalizeKeysAndPath(rawPath: PathType) {
    const path = ensurePathArray(rawPath);
    // if (path.length > 1 && keys.includes(path[0])) {
    //   keys = [path[0]];
    //   path.shift();
    // }
    // return {path, keys};
  }
}
