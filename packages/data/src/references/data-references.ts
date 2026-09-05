import {ReferenceSource} from './reference-source';
import {type PathType} from '@axi-engine/utils';
import {ReferenceRegistry} from '../reference-registry';
import {getDefaultReferenceRegistry, getDefaultFieldTypeRegistry} from '../config';
import {FieldReference} from './field-reference';
import {StoreWithEvents} from './types';
import {FieldReferenceName, FieldReferences} from './field-references';
import {FieldTypeRegistry} from '../field-type-registry';
import {ReadonlyFieldReference} from './readonly-field-reference';

export class DataReferences implements ReferenceSource {

  data: StoreWithEvents;
  fieldTypeRegistry: FieldTypeRegistry;
  referenceRegistry: ReferenceRegistry;

  constructor(data: StoreWithEvents, options?: {
    fieldTypeRegistry?: FieldTypeRegistry,
    referenceRegistry?: ReferenceRegistry,
  }) {
    this.data = data;
    this.fieldTypeRegistry = options?.fieldTypeRegistry ?? getDefaultFieldTypeRegistry();
    this.referenceRegistry = options?.referenceRegistry ?? getDefaultReferenceRegistry();
  }

  get<K extends FieldReferenceName>(type: K, path: PathType): FieldReferences[K] {
    return this.referenceRegistry.create(type, this.data, path);
  }

  getBase<T = unknown>(path: PathType): FieldReference<T> {
    return this.referenceRegistry.create('generic', this.data, path);
  }

  getReadonly<T = unknown>(path: PathType): ReadonlyFieldReference<T> {
    return this.referenceRegistry.create('readonly', this.data, path);
  }

  getAuto<T extends FieldReference<any>>(path: PathType): T {
    const val = this.data.get(path);
    return this.referenceRegistry.create(this.fieldTypeRegistry.getNodeNameByVariable(val), this.data, path) as T;
  }

  createAndRef<R extends FieldReference<any>>(path: PathType, value: R['value']): R {
    this.data.create(path, value);
    return this.getAuto<R>(path);
  }

  upsertAndRef<R extends FieldReference<any>>(path: PathType, value: R['value']): R {
    this.data.upsert(path, value);
    return this.getAuto<R>(path);
  }
}
