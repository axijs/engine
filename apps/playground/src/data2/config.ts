import {createFieldTypeRegistry} from './field-type-registry';
import {createReferenceRegistry} from './references';

export const DataSystemConfiguration = {
  typeRegistry: createFieldTypeRegistry(),
  referenceRegistry: createReferenceRegistry()
}

