import type {FieldName} from '../fields';
import {FieldTypeRegistry} from './field-type-registry.ts';
import type {FieldTypeDefinition} from './field-type-definition.ts';
import {fieldTypeDefaultDefinitions} from './field-type-default-definitions.ts';

export function createFieldTypeRegistry(userConfig?: Partial<Record<FieldName, FieldTypeDefinition>>): FieldTypeRegistry {
  const config = { ...fieldTypeDefaultDefinitions, ...userConfig };

  const registry = new FieldTypeRegistry();
  for (const [key, value] of Object.entries(config)) {
    registry.register(key as FieldName, value);
  }

  return registry;
}
