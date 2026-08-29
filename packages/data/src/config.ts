import {createFieldTypeRegistry} from './field-type-registry';
import {createReferenceRegistry} from './reference-registry';
import {createSerializerRegistry} from './field-serializers';

export const DataSystemConfiguration = {
  typeRegistry: createFieldTypeRegistry(),
  referenceRegistry: createReferenceRegistry(),
  serializerRegistry: createSerializerRegistry()
}

export function getDefaultFieldTypeRegistry() {
  return DataSystemConfiguration.typeRegistry;
}

export function getDefaultReferenceRegistry() {
  return DataSystemConfiguration.referenceRegistry;
}

export function getDefaultSerializerRegistry() {
  return DataSystemConfiguration.serializerRegistry;
}
