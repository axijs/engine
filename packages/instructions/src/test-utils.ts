import {DataStorage, ensurePathString, PathType} from '@axi-engine/utils';
import {throwIf} from '@axijs/ensure'

/**
 * simple mocked data store
 */
export function createMockDataStore(): DataStorage {
  const data = new Map<string, any>([
    [ensurePathString(['player', 'hp']), 100],
    [ensurePathString(['player', 'name']), 'Alex'],
    [ensurePathString(['player', 'isAlive']), true],
    [ensurePathString(['config', 'difficulty']), 'hard'],
    [ensurePathString(['inventory', 'etc']), {bottles: 10, garbage: 20}]
  ]);

  return {
    get: (path: PathType) => data.get(ensurePathString(path)),
    has: (path: PathType) => data.has(ensurePathString(path)),
    create: (path: PathType, value: unknown) => {
      const key = ensurePathString(path);
      throwIf(data.has(key), `Variable '${key}' already exists`);
      data.set(key, value);
    },
    set: (path: PathType, value: unknown) => {
      const key = ensurePathString(path);
      throwIf(!data.has(key), `Variable '${key}' does not exist`);
      data.set(key, value);
    },
    upsert: (path: PathType, value: unknown) => {
      data.set(ensurePathString(path), value);
    },
    delete: (path: PathType) => {
      data.delete(ensurePathString(path));
    },
    clear() {
    }
  };
}
