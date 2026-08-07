import {DataSystemConfiguration} from './config.ts';

export function getDefaultTypeRegistry() {
  return DataSystemConfiguration.typeRegistry;
}

export function getDefaultReferenceRegistry() {
  return DataSystemConfiguration.referenceRegistry;
}
