import {Constructor} from '@axi-engine/utils';
import {Fields} from '../fields';

export function WithNumericFields<TBase extends Constructor<Fields>>(Base: TBase) {

  type BaseInstance = InstanceType<TBase>;
  type NumericFieldInstance = InstanceType<BaseInstance['_factory']['numeric']>;
  type NumericFieldOptions = ConstructorParameters<BaseInstance['_factory']['numeric']>[2];

  return class FieldsWithNumeric extends Base {
    createNumeric(
      name: string,
      initialValue: number,
      options?: NumericFieldOptions
    ): NumericFieldInstance {
      const Ctor = this._factory.numeric;
      const field = new Ctor(name, initialValue, options);
      this.add(field);
      return field as NumericFieldInstance;
    }

    upsetNumeric(
      name: string,
      value: number,
      options?: NumericFieldOptions
    ): NumericFieldInstance {
      if (this.has(name)) {
        const field = this.get<NumericFieldInstance>(name);
        field.value = value;
        return field;
      }
      return this.createNumeric(name, value, options);
    }

    getNumeric(name: string): NumericFieldInstance {
      return this.get(name);
    }
  }
}
