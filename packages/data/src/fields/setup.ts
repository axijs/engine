import {FieldRegistry} from './field-registry';
import {CoreBooleanField, CoreField, CoreNumericField, CoreStringField} from './field-definitions';

/**
 * Creates and configures a FieldRegistry with all the core field types.
 * @returns {FieldRegistry} A pre-configured FieldRegistry instance.
 */
export function createCoreFieldRegistry(): FieldRegistry {
  const fieldRegistry = new FieldRegistry();
  fieldRegistry.register(CoreField.typeName, CoreField);
  fieldRegistry.register(CoreNumericField.typeName, CoreNumericField);
  fieldRegistry.register(CoreStringField.typeName, CoreStringField);
  fieldRegistry.register(CoreBooleanField.typeName, CoreBooleanField);
  return fieldRegistry;
}
