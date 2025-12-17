import {
  CoreBooleanField,
  CoreStringField,
} from '@axi-engine/fields';
import {createTypedMethodsMixin} from './mixin-factory';

export const WithStringFields = createTypedMethodsMixin<
  typeof CoreStringField,
  'String'
>(CoreBooleanField.typeName, 'String')
