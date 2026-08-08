import {ReferenceRegistry} from './reference-registry.ts';
import type {ReferenceRegistryConfig} from './types.ts';
import type {FieldName} from '../fields';
import {referenceRegistryDefaultConfig} from './reference-registry-default-config.ts';

export function createReferenceRegistry(userConfig?: ReferenceRegistryConfig): ReferenceRegistry {
  const config = {...referenceRegistryDefaultConfig, ...userConfig};
  const registry = new ReferenceRegistry();

  for (const [key, value] of Object.entries(config)) {
    registry.register(key as FieldName, value);
  }

  return registry;
}
