import {PathType} from '@axi-engine/utils';
import {GroupReference} from './group-reference';
import {CollectionReference} from './collection-reference';
import type {FieldReference} from './field-reference';

export interface GroupReferenceSource {
  getGroup(path: PathType): GroupReference;

  getCollection<T extends FieldReference<any>>(path: PathType): CollectionReference<T>;
}
