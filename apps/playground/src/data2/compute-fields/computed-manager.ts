import {type DataStorage, ensurePathString, type PathType} from '@axi-engine/utils';
import type {ComputedFieldConfig} from './computed-field-config.ts';
import {throwIf} from '@axijs/ensure';

export class ComputedManager {

  store: DataStorage;

  constructor(store: DataStorage) {
    this.store = store;
  }

  define<T>(path: PathType, config: ComputedFieldConfig<T>) {
    throwIf(this.store.has(path), `Field with path: ${ensurePathString(path)} already exists`);

    console.log(path, config);
  }


}
