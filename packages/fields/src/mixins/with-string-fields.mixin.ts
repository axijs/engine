import {createTypedMethodsMixin} from './mixin-factory';
import {CoreStringField} from '../field-definitions';

export const WithStringFields = createTypedMethodsMixin<
  typeof CoreStringField,
  'String'
>(CoreStringField.typeName, 'String')
