import {Constructor} from '@axi-engine/utils';
import {Fields} from '../fields';

export function WithStringFields<TBase extends Constructor<Fields>>(Base: TBase) {

  type BaseInstance = InstanceType<TBase>;
  type StringFieldInstance = InstanceType<BaseInstance['_factory']['string']>;
  type StringFieldOptions = ConstructorParameters<BaseInstance['_factory']['string']>[2];

  return class FieldsWithString extends Base {
    createString(
      name: string,
      initialValue: string,
      options?: StringFieldOptions
    ): StringFieldInstance {
      const Ctor = this._factory.string;
      const field = new Ctor(name, initialValue, options);
      this.add(field);
      return field as StringFieldInstance;
    }

    upsetString(
      name: string,
      value: string,
      options?: StringFieldOptions
    ): StringFieldInstance {
      if (this.has(name)) {
        const field = this.get<StringFieldInstance>(name);
        field.value = value;
        return field;
      }
      return this.createString(name, value, options);
    }

    getString(name: string): StringFieldInstance {
      return this.get(name);
    }
  }
}
