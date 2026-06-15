import type {DataStorage, PathType} from '@axi-engine/utils';

export class Store implements DataStorage {

  get<T>(path: PathType): T {

  }

  has(path: PathType): boolean {
    return false;
  }

  set(path: PathType, value: unknown): void {

  }

  create(path: PathType, value: unknown): void {

  }

  upsert(path: PathType, value: unknown): void {

  }

  delete(path: PathType): void {

  }

  clear(): void {

  }

  destroy() {
  }

}
