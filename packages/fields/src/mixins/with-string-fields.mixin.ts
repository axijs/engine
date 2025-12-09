import {Constructor} from '@axi-engine/utils';
import {Fields} from '../fields';
import {DefaultStringField, DefaultStringFieldOptions, Field} from '@axi-engine/fields';

export function WithStringFields<TBase extends Constructor<Fields>>(Base: TBase) {

  return class FieldsWithString extends Base {
    createString(
      name: string,
      initialValue: string,
      options?: DefaultStringFieldOptions
    ): DefaultStringField {
      const Ctor = this._fieldRegistry.get(DefaultStringField.typeName);
      const field = new Ctor(name, initialValue, options);
      this.add(field);
      return field as DefaultStringField;
    }

    upsetString(
      name: string,
      value: string,
      options?: DefaultStringFieldOptions
    ): DefaultStringField {
      if (this.has(name)) {
        const field = this.get<DefaultStringField>(name);
        field.value = value;
        return field;
      }
      return this.createString(name, value, options);
    }

    getString(name: string): DefaultStringField {
      return this.get(name);
    }
  }
}
