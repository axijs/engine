import {createFieldTypeRegistry} from './field-type-registry';
import {createReferenceRegistry} from './reference-registry';
import {createSerializerRegistry} from './field-serializers/setup';

export const DataSystemConfiguration = {
  typeRegistry: createFieldTypeRegistry(),
  referenceRegistry: createReferenceRegistry(),
  serializerRegistry: createSerializerRegistry()
}

export function getDefaultTypeRegistry() {
  return DataSystemConfiguration.typeRegistry;
}

export function getDefaultReferenceRegistry() {
  return DataSystemConfiguration.referenceRegistry;
}

export function getDefaultSerializerRegistry() {
  return DataSystemConfiguration.serializerRegistry;
}
