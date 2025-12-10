import {Constructor} from '@axi-engine/utils';
import {Fields} from '../fields';
import {DefaultStringField, DefaultStringFieldOptions} from '@axi-engine/fields';

export function WithStringFields<TBase extends Constructor<Fields>>(Base: TBase) {

  return class FieldsWithString extends Base {
    createString(name: string, initialValue: string, options?: DefaultStringFieldOptions): DefaultStringField {
      return this.create(DefaultStringField.typeName, name, initialValue, options);
    }

    upsetString(name: string, value: string, options?: DefaultStringFieldOptions): DefaultStringField {
      return this.upset(DefaultStringField.typeName, name, value, options);
    }

    getString(name: string): DefaultStringField {
      return this.get(name);
    }
  }
}
