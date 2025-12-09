import {DefaultField} from './field-definitions';
import {DefaultNumericField} from './field-definitions';
import {DefaultBooleanField} from './field-definitions';
import {DefaultStringField} from './field-definitions';
import {Constructor, throwIf, throwIfEmpty} from '@axi-engine/utils';

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

export class FieldRegistry {
  items = new Map<string, Constructor>();
  register(fieldType: string, constructor: Constructor) {
    throwIf(this.items.has(fieldType), `A constructor for field with fieldType '${fieldType}' is already registered.`);
    this.items.set(fieldType, constructor);
    return this;
  }

  get(fieldType: string) {
    const Ctr = this.items.get(fieldType);
    throwIfEmpty(Ctr, `Can't find constructor for field ${fieldType}`);
    return Ctr;
  }
}
