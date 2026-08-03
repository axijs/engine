import {type DataStorage, ensurePathString, type PathType, Registry} from '@axi-engine/utils';
import type {ComputeFieldConfig, ComputeFunction, FieldGetter} from './compute-field-config.ts';
import {throwIf} from '@axijs/ensure';

/** todo: need to add lazy updating */
export class ComputedManager {

  store: DataStorage;
  fields = new Registry<string, ComputeFieldConfig<unknown>>();

  constructor(store: DataStorage) {
    this.store = store;
  }

  getDependencies(path: PathType) {
    return this.fields.getOrThrow(ensurePathString(path)).dependencies;
  }

  define<T>(path: PathType, func: ComputeFunction<T>) {
    const strPath = ensurePathString(path);

    throwIf(this.store.has(path), `Field with path: ${strPath} already exists in the store`);
    throwIf(this.fields.has(strPath), `Field with path: ${strPath} already registered as computed`);

    this.fields.register(strPath, {
      compute: func,
      dependencies: []
    });
  }

  compute(computePath: PathType) {
    const dependencies: Set<string> = new Set();
    const func: FieldGetter = (path: PathType, fallback?: any) => {
      dependencies.add(ensurePathString(path));
      return this.store.has(path) ? this.store.get(path) : fallback;
    }
    const config = this.fields.getOrThrow(ensurePathString(computePath));
    this.store.upsert(computePath, config.compute(func));
    config.dependencies = [...dependencies];
  }

  has(path: PathType) {
    return this.fields.has(ensurePathString(path));
  }

  delete(path: PathType) {
    this.fields.delete(ensurePathString(path));
  }
}
