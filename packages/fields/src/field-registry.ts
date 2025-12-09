import {DefaultField} from './field-definitions';
import {DefaultNumericField} from './field-definitions';
import {DefaultBooleanField} from './field-definitions';
import {DefaultStringField} from './field-definitions';
import {ConstructorRegistry} from './constructor-registry';
import {Field} from './types';

export interface FieldConstructorRegistry {
  generic: typeof DefaultField,
  numeric: typeof DefaultNumericField,
  boolean: typeof DefaultBooleanField,
  string: typeof DefaultStringField
}

export const defaultFieldFactoryRegistry: FieldConstructorRegistry = {
  generic: DefaultField,
  numeric: DefaultNumericField,
  boolean: DefaultBooleanField,
  string: DefaultStringField,
};

export class FieldRegistry extends ConstructorRegistry<Field<any>> { }
