import {DefaultBooleanField} from '@axi-engine/fields';
import {createTypedMethodsMixin} from './mixin-factory';

export const WithBooleanFields = createTypedMethodsMixin<
  typeof DefaultBooleanField,
  'Boolean'
>(DefaultBooleanField.typeName, 'Boolean')
