import {Constructor} from '@axi-engine/utils';
import {Fields} from '@axi-engine/fields';

export function WithGenericFields<TBase extends Constructor<Fields>>(Base: TBase) {

  type BaseInstance = InstanceType<TBase>;
  type GenericFieldInstance = InstanceType<BaseInstance['_factory']['generic']>;
  type GenericFieldOptions = ConstructorParameters<BaseInstance['_factory']['generic']>[2];

  return class FieldsWithGeneric extends Base {
    create<T>(
      name: string,
      initialValue: T,
      options?: GenericFieldOptions
    ): GenericFieldInstance {
      const Ctor = this._factory.generic;
      const field = new Ctor(name, initialValue, options);
      this.add(field);
      return field as GenericFieldInstance;
    }

    upset<T>(
      name: string,
      value: T,
      options?: GenericFieldOptions
    ): GenericFieldInstance {
      if (this.has(name)) {
        const field = this.get<GenericFieldInstance>(name);
        field.value = value;
        return field;
      }
      return this.create(name, value, options);
    }
  }
}
