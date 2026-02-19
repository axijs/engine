import {createTypedMethodsMixin} from './mixin-factory';
import {CoreNumericField} from '../field-definitions';


export const WithNumericFields = createTypedMethodsMixin<
  typeof CoreNumericField,
  'Numeric'
>(CoreNumericField.typeName, 'Numeric')
