import {Constructor} from '@axi-engine/utils';
import {Fields} from '../fields';
import {DefaultNumericField, DefaultNumericFieldOptions} from '@axi-engine/fields';

export function WithNumericFields<TBase extends Constructor<Fields>>(Base: TBase) {

  return class FieldsWithNumeric extends Base {
    createNumeric(name: string, initialValue: number, options?: DefaultNumericFieldOptions): DefaultNumericField {
      return this.create(DefaultNumericField.typeName, name, initialValue, options);
    }

    upsetNumeric(name: string, value: number, options?: DefaultNumericFieldOptions): DefaultNumericField {
      return this.upset(DefaultNumericField.typeName, name, value, options);
    }

    getNumeric(name: string): DefaultNumericField {
      return this.get(name);
    }
  }
}
