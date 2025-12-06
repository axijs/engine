import {Constructor} from '@axi-engine/utils';
import {Fields} from '../fields';

export function WithBooleanFields<TBase extends Constructor<Fields>>(Base: TBase) {

  type BaseInstance = InstanceType<TBase>;
  type BooleanFieldInstance = InstanceType<BaseInstance['_factory']['boolean']>;
  type BooleanFieldOptions = ConstructorParameters<BaseInstance['_factory']['boolean']>[2];

  return class FieldsWithBoolean extends Base {
    createBoolean(
      name: string,
      initialValue: boolean,
      options?: BooleanFieldOptions
    ): BooleanFieldInstance {
      const Ctor = this._factory.boolean;
      const field = new Ctor(name, initialValue, options);
      this.add(field);
      return field as BooleanFieldInstance;
    }

    upsetBoolean(
      name: string,
      value: boolean,
      options?: BooleanFieldOptions
    ): BooleanFieldInstance {
      if (this.has(name)) {
        const field = this.get<BooleanFieldInstance>(name);
        field.value = value;
        return field;
      }
      return this.createBoolean(name, value, options);
    }

    getBoolean(name: string): BooleanFieldInstance {
      return this.get(name);
    }
  }
}
