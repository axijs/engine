import {createFieldTypeRegistry} from './field-type-registry';
import {createReferenceRegistry} from './reference-registry';

export const DataSystemConfiguration = {
  typeRegistry: createFieldTypeRegistry(),
  referenceRegistry: createReferenceRegistry()
}

