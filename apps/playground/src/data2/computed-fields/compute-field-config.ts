import type {PathType} from '@axi-engine/utils';

export type FieldGetter = <T>(path: PathType, fallback?: T) => T;

export type ComputeFunction<T> = (get: FieldGetter) => T;

export interface ComputeFieldConfig<T> {
  dependencies: string[];
  compute: ComputeFunction<T>;
}

