import {Constructor} from '@axi-engine/utils';
import {Fields} from '../fields';
import {DefaultBooleanField, DefaultBooleanFieldOptions} from '@axi-engine/fields';

export function WithBooleanFields<TBase extends Constructor<Fields>>(Base: TBase) {

  return class FieldsWithBoolean extends Base {
    createBoolean(
      name: string,
      initialValue: boolean,
      options?: DefaultBooleanFieldOptions
    ): DefaultBooleanField {
      const Ctor = this._fieldRegistry.get(DefaultBooleanField.typeName);
      const field = new Ctor(name, initialValue, options);
      this.add(field);
      return field as DefaultBooleanField;
    }

    upsetBoolean(
      name: string,
      value: boolean,
      options?: DefaultBooleanFieldOptions
    ): DefaultBooleanField {
      if (this.has(name)) {
        const field = this.get<DefaultBooleanField>(name);
        field.value = value;
        return field;
      }
      return this.createBoolean(name, value, options);
    }

    getBoolean(name: string): DefaultBooleanField {
      return this.get(name);
    }
  }
}
