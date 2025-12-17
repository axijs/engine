import {CoreBooleanField} from '@axi-engine/fields';
import {createTypedMethodsMixin} from './mixin-factory';

export const WithBooleanFields = createTypedMethodsMixin<
  typeof CoreBooleanField,
  'Boolean'
>(CoreBooleanField.typeName, 'Boolean')
