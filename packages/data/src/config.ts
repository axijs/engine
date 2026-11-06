import {createFieldTypeRegistry, FieldTypeRegistry} from './field-type-registry';
import {createReferenceRegistry, ReferenceRegistry} from './reference-registry';
import {createSerializerRegistry} from './field-serializers';
import {SerializerRegistry} from './field-serializers/serializer-registry';
import {StoreTickParams} from './store/types';

export const DataSystemConfiguration = {
  typeRegistry: createFieldTypeRegistry(),
  referenceRegistry: createReferenceRegistry(),
  serializerRegistry: createSerializerRegistry(),
  storeTickParams: {
    limit: 100,
    isThrowError: true
  }
} satisfies {
  typeRegistry: FieldTypeRegistry;
  referenceRegistry: ReferenceRegistry;
  serializerRegistry: SerializerRegistry;
  storeTickParams: StoreTickParams
};

export function getDefaultFieldTypeRegistry(): FieldTypeRegistry {
  return DataSystemConfiguration.typeRegistry;
}

export function getDefaultReferenceRegistry(): ReferenceRegistry {
  return DataSystemConfiguration.referenceRegistry;
}

export function getDefaultSerializerRegistry(): SerializerRegistry {
  return DataSystemConfiguration.serializerRegistry;
}

export function getDefaultStoreTickParams(): StoreTickParams {
  return DataSystemConfiguration.storeTickParams;
}
