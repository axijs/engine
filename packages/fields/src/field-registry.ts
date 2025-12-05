import {DefaultField} from './default-fields';
import {DefaultNumericField} from './default-fields';
import {DefaultBooleanField} from './default-fields';
import {DefaultStringField} from './default-fields';

export interface FieldConstructorRegistry {
  default: typeof DefaultField,
  numeric: typeof DefaultNumericField,
  boolean: typeof DefaultBooleanField,
  string: typeof DefaultStringField
}

export const defaultFieldFactoryRegistry: FieldConstructorRegistry = {
  default: DefaultField,
  numeric: DefaultNumericField,
  boolean: DefaultBooleanField,
  string: DefaultStringField
};
