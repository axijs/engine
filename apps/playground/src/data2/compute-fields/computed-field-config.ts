import type {PathType} from '@axi-engine/utils';

export type ComputeSource<T = unknown> = PathType | { path: PathType, fallback: T };

export interface ComputedFieldConfig<T> {
  dependencies: ComputeSource[];
  compute: (...args: any[]) => T;
}

