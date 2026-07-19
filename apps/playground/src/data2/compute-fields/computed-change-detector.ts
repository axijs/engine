import {StoreChangeBuffer} from '../store-change-buffer.ts';
import {ComputedManager} from './computed-manager.ts';
import {ensurePathString, type PathType} from '@axi-engine/utils';
import type {ComputedFieldConfig} from './computed-field-config.ts';
import {isObject} from '@axijs/ensure';


export class ComputedChangeDetector {
  changes: StoreChangeBuffer;
  computed: ComputedManager;

  // key - path to the field, array of strings - paths to computed fields
  reversed = new Map<string, string[]>();

  constructor(changes: StoreChangeBuffer, computed: ComputedManager) {
    this.changes = changes;
    this.computed = computed;
  }

  append(path: PathType, config: ComputedFieldConfig<any>) {
    const strPathComputed = ensurePathString(path);
    config.dependencies.forEach(dependency => {
      const strFieldPath = !isObject(dependency) ?
        ensurePathString(dependency) :
        ensurePathString(dependency.path);

      if (!this.reversed.has(strFieldPath)) {
        this.reversed.set(strFieldPath, []);
      }
      this.reversed.get(strFieldPath)?.push(strPathComputed);
    });
    console.log(this.reversed);
  }

  remove(path: PathType, config: ComputedFieldConfig<any>) {
    // todo:
    console.log(path, config);
  }

  compute() {
    this.changes._changed.forEach(path => {
      console.log(path);
    });
  }
}
