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

  define<T>(path: PathType, func: ComputeFunction<T>) {
    const strPath = ensurePathString(path);

    throwIf(this.store.has(path), `Field with path: ${strPath} already exists in the store`);
    throwIf(this.fields.has(strPath), `Field with path: ${strPath} already registered as computed`);

    const config: ComputeFieldConfig<T> = {
      compute: func,
      dependencies: []
    };
    this.fields.register(strPath, config);
    this.computeConfig(path, config);
  }

  computeAll() {
    this.fields.forEach((config, key) => this.computeConfig(key, config));
  }

  computeOne(path: PathType) {
    this.computeConfig(path, this.fields.getOrThrow(ensurePathString(path)));
  }

  has(path: PathType) {
    return this.fields.has(ensurePathString(path));
  }

  delete(path: PathType) {
    this.fields.delete(ensurePathString(path));
  }

  private computeConfig(path: PathType, config: ComputeFieldConfig<unknown>) {
    const dependencies: string[] = [];
    const func: FieldGetter = (path: PathType, fallback?: any) => {
      dependencies.push(ensurePathString(path));
      return this.store.has(path) ? this.store.get(path) : fallback;
    }

    this.store.upsert(path, config.compute(func));
    console.log('dependencies: ', dependencies);
  }
}
