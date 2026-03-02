import {DataSource, ensurePathString, PathType} from '@axi-engine/utils';


/**
 * simple mocked data source
 */
export function createMockDataSource(): DataSource {
  const data = new Map<string, any>([
    [ensurePathString(['player', 'hp']), 100],
    [ensurePathString(['player', 'name']), 'Alex'],
    [ensurePathString(['player', 'isAlive']), true],
    [ensurePathString(['config', 'difficulty']), 2],
    [ensurePathString(['inventory', 'etc']), {bottles: 10, garbage: 20}]
  ]);

  return {
    get: (path: PathType) => data.get(ensurePathString(path)),
    has: (path: PathType) => data.has(ensurePathString(path))
  };
}
