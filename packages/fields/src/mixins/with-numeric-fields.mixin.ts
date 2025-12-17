import {DefaultBooleanField, DefaultNumericField} from '@axi-engine/fields';
import {createTypedMethodsMixin} from './mixin-factory';


export const WithNumericFields = createTypedMethodsMixin<
  typeof DefaultNumericField,
  'Numeric'
>(DefaultBooleanField.typeName, 'Numeric')
