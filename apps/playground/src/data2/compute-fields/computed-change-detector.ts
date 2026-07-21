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
  }

  delete(path: PathType) {
    // todo:
    console.log(path);
  }

  compute() {
    this.changes.getChangedPaths().forEach(path => this.computePath(path));
    this.changes.getDeletedPaths().forEach(path => {this.computePath(path)});
  }

  computePath(path: string) {
    const buffer: string[] = [];
    this.collectFields(path, buffer);
    if (!buffer.length) {
      return;
    }
    console.log('buffer: ', buffer);
    buffer.forEach(computePath => this.computed.computeOne(computePath));
  }

  private collectFields(path: string, buffer: string[]) {
    if (this.reversed.has(path)) {
      const computedFieldPaths = this.reversed.get(path)!;
      buffer.push(...computedFieldPaths);
      computedFieldPaths.forEach(computedPath => this.collectFields(computedPath, buffer));
    }
  }
}
