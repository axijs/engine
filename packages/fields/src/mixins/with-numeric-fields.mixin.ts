import {CoreBooleanField, CoreNumericField} from '@axi-engine/fields';
import {createTypedMethodsMixin} from './mixin-factory';


export const WithNumericFields = createTypedMethodsMixin<
  typeof CoreNumericField,
  'Numeric'
>(CoreBooleanField.typeName, 'Numeric')
