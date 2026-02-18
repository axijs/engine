import {DataSource, ensurePathString, PathType} from '@axi-engine/utils';


/**
 * simple mocked data source
 */
export function createMockDataSource(): DataSource {
  const data = new Map<string, any>([
    ['player/hp', 100],
    ['player/name', 'Alex'],
    ['player/isAlive', true],
    ['config/difficulty', 2],
    ['inventory/etc', {bottles: 10, garbage: 20}]
  ]);

  return {
    get: (path: PathType) => data.get(ensurePathString(path)),
    has: (path: PathType) => data.has(ensurePathString(path))
  };
}
