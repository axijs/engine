import {ReferenceSource} from './reference-source';
import {type PathType} from '@axi-engine/utils';
import {ReferenceRegistry} from '../reference-registry';
import {getDefaultReferenceRegistry} from '../config';
import {FieldReference, ReadonlyFieldReference} from './field-reference';
import {StoreWithEvents} from './types';
import {FieldReferenceName, FieldReferences} from './field-references';

export class DataReferences implements ReferenceSource {

  data: StoreWithEvents;
  referenceRegistry: ReferenceRegistry;

  constructor(options: {data: StoreWithEvents, referenceRegistry?: ReferenceRegistry}) {
    this.data = options.data;
    this.referenceRegistry = this.referenceRegistry = options?.referenceRegistry ?? getDefaultReferenceRegistry();
  }

  getRef<T = unknown>(path: PathType): FieldReference<T> {
    return this.referenceRegistry.create('generic', this.data, path);
  }

  getReadonlyRef<T = unknown>(path: PathType): ReadonlyFieldReference<T> {
    return this.referenceRegistry.create('readonly', this.data, path);
  }

  getTypedRef<K extends FieldReferenceName>(type: K, path: PathType): FieldReferences[K] {
    return this.referenceRegistry.create(type, this.data, path);
  }

  // getAutoRef<T extends FieldReference<any>>(path: PathType): T {
  //   // const val = this.data.get(path);
  //   // return this.referenceRegistry.create(this.referenceRegistry.registry.fieldType, this.data, path) as T;
  // }

  // createAndRef<R extends FieldReference<any>>(path: PathType, value: R['value']): R {
  //   this.data.create(path, value);
  //   return this.getAutoRef<R>(path);
  // }
  //
  // upsertAndRef<R extends FieldReference<any>>(path: PathType, value: R['value']): R {
  //   this.data.upsert(path, value);
  //   return this.getAutoRef<R>(path);
  // }
}
