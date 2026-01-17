import {createTypedMethodsMixin} from './mixin-factory';
import {CoreBooleanField} from '../field-definitions';

export const WithBooleanFields = createTypedMethodsMixin<
  typeof CoreBooleanField,
  'Boolean'
>(CoreBooleanField.typeName, 'Boolean')
