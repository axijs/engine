import {Constructor} from '@axi-engine/utils';
import {DefaultBooleanField, DefaultBooleanFieldOptions, Fields} from '@axi-engine/fields';

export function WithBooleanFields<TBase extends Constructor<Fields>>(Base: TBase) {

  return class FieldsWithBoolean extends Base {
    createBoolean(name: string, initialValue: boolean, options?: DefaultBooleanFieldOptions): DefaultBooleanField {
      return this.create(DefaultBooleanField.typeName, name, initialValue, options) as DefaultBooleanField;
    }

    upsetBoolean(name: string, value: boolean, options?: DefaultBooleanFieldOptions): DefaultBooleanField {
      return this.upset(DefaultBooleanField.typeName, name, value, options) as DefaultBooleanField;
    }

    getBoolean(name: string): DefaultBooleanField {
      return this.get(name);
    }
  }
}
