import {Constructor} from '@axi-engine/utils';
import {Fields} from '../fields';
import {DefaultNumericField, DefaultNumericFieldOptions} from '@axi-engine/fields';

export function WithNumericFields<TBase extends Constructor<Fields>>(Base: TBase) {

  return class FieldsWithNumeric extends Base {
    createNumeric(
      name: string,
      initialValue: number,
      options?: DefaultNumericFieldOptions
    ): DefaultNumericField {
      const Ctor = this._fieldRegistry.get(DefaultNumericField.typeName);
      const field = new Ctor(name, initialValue, options);
      this.add(field);
      return field as DefaultNumericField;
    }

    upsetNumeric(
      name: string,
      value: number,
      options?: DefaultNumericFieldOptions
    ): DefaultNumericField {
      if (this.has(name)) {
        const field = this.get<DefaultNumericField>(name);
        field.value = value;
        return field;
      }
      return this.createNumeric(name, value, options);
    }

    getNumeric(name: string): DefaultNumericField {
      return this.get(name);
    }
  }
}
