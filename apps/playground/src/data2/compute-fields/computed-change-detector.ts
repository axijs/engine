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
    const visited = new Set<string>();
    const order: string[] = [];

    // this.changes.getCreatedPaths().forEach(path => this.tracePath(path, visited, order));
    this.changes.getChangedPaths().forEach(path => {
      console.log('changed: ', path);
      this.tracePath(path, visited, order)
    });
    console.log('tracePath:' , visited, order);

    // this.changes.getDeletedPaths().forEach(path => this.tracePath(path, visited, order));

    order
      .reverse()
      .filter(computePath => this.computed.has(computePath))
      .forEach(computePath => this.computed.computeOne(computePath));
  }

  private tracePath(path: string, visited: Set<string>, order: string[]) {
    if (visited.has(path)) {
      return;
    }
    visited.add(path);

    if (this.reversed.has(path)) {
      this.reversed.get(path)!.forEach(relatedPath => this.tracePath(relatedPath, visited, order));
    }

    order.push(path);
  }
}
