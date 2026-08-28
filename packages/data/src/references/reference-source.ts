import type {PathType} from '@axi-engine/utils';
import type {FieldReference, ReadonlyFieldReference} from './field-reference';
import type {FieldReferenceName, FieldReferences} from './field-references';

export interface ReferenceSource {
  getRef<T = unknown>(path: PathType): FieldReference<T>;

  getReadonlyRef<T = unknown>(path: PathType): ReadonlyFieldReference<T>;

  getTypedRef<K extends FieldReferenceName>(type: K, path: PathType): FieldReferences[K];

  // getAutoRef<T extends FieldReference<any>>(path: PathType): T;
}
