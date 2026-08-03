import {StoreChangeBuffer} from '../store-change-buffer.ts';
import {ComputedManager} from './computed-manager.ts';
import {ensurePathString, type PathType} from '@axi-engine/utils';


export class ComputedChangeDetector {
  changes: StoreChangeBuffer;
  computed: ComputedManager;

  // key - path to the field, array of strings - paths to computed fields
  reversed = new Map<string, string[]>();

  constructor(changes: StoreChangeBuffer, computed: ComputedManager) {
    this.changes = changes;
    this.computed = computed;
  }

  register(path: PathType) {
    const pathStr = ensurePathString(path);
    const oldDependencies: string[] = this.computed.getDependencies(pathStr);
    this.computed.compute(path);
    const newDependencies: string[] = this.computed.getDependencies(pathStr);
    console.log('old / new Dependencies: ', oldDependencies, newDependencies);

    // newDependencies.forEach(dependency => {
    //   if (!this.reversed.has(dependency)) {
    //     this.reversed.set(dependency, []);
    //   }
    //   this.reversed.get(dependency)?.push(pathStr);
    // });
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
      .forEach(computePath => this.computed.compute(computePath));
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
