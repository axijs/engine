import {type DataStorage, ensurePathString, type PathType, Registry} from '@axi-engine/utils';
import type {ComputedFieldConfig} from './computed-field-config.ts';
import {isObject, throwIf} from '@axijs/ensure';

/** todo: need to add lazy updating */
export class ComputedManager {

  store: DataStorage;
  fields = new Registry<string, ComputedFieldConfig<unknown>>();

  constructor(store: DataStorage) {
    this.store = store;
  }

  define<T>(path: PathType, config: ComputedFieldConfig<T>) {
    const strPath = ensurePathString(path);

    throwIf(this.store.has(path), `Field with path: ${strPath} already exists in the store`);
    throwIf(this.fields.has(strPath), `Field with path: ${strPath} already registered as computed`);

    this.fields.register(strPath, config);
    this.computeConfig(path, config);
  }

  computeAll() {
    this.fields.forEach((config, key) => this.computeConfig(key, config));
  }

  computeOne(path: PathType) {
    this.computeConfig(path, this.fields.getOrThrow(ensurePathString(path)));
  }

  delete(path: PathType) {
    this.fields.delete(ensurePathString(path));
  }

  private computeConfig(path: PathType, config: ComputedFieldConfig<unknown>) {
    const params = config.dependencies.map(dep => {
      if (!isObject(dep)) {
        return this.store.get(dep);
      }
      return this.store.has(dep.path) ? this.store.get(dep.path) : dep.fallback;
    });
    this.store.upsert(path, config.compute(...params));
  }
}
