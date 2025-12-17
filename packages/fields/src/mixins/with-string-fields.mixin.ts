import {
  DefaultBooleanField,
  DefaultStringField,
} from '@axi-engine/fields';
import {createTypedMethodsMixin} from './mixin-factory';

export const WithStringFields = createTypedMethodsMixin<
  typeof DefaultStringField,
  'String'
>(DefaultBooleanField.typeName, 'String')
