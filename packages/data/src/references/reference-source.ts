import type {PathType} from '@axi-engine/utils';
import type {FieldReference} from './field-reference';
import type {FieldReferenceName, FieldReferences} from './field-references';
import {ReadonlyFieldReference} from './readonly-field-reference';

export interface ReferenceSource {

  get<K extends FieldReferenceName>(type: K, path: PathType): FieldReferences[K];

  getBase<T = unknown>(path: PathType): FieldReference<T>;

  getReadonly<T = unknown>(path: PathType): ReadonlyFieldReference<T>;

  getAuto<T extends FieldReference<any>>(path: PathType): T;

  /** create field and return auto ref on it */
  createAndRef<R extends FieldReference<any>>(path: PathType, value: R['value']): R;

  /** create or update field and return auto ref on it  */
  upsertAndRef<R extends FieldReference<any>>(path: PathType, value: R['value']): R;
}
