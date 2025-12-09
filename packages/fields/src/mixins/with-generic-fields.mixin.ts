import {Constructor} from '@axi-engine/utils';
import {DefaultField, FieldOptions, Fields} from '@axi-engine/fields';

export function WithGenericFields<TBase extends Constructor<Fields>>(Base: TBase) {

  return class FieldsWithGeneric extends Base {
    create<T>(
      name: string,
      initialValue: T,
      options?: FieldOptions<T>
    ): DefaultField<T> {
      const Ctor = this._fieldRegistry.get(DefaultField.typeName);
      const field = new Ctor(name, initialValue, options);
      this.add(field);
      return field as DefaultField<T>;
    }

    upset<T>(
      name: string,
      value: T,
      options?: FieldOptions<T>
    ): DefaultField<T> {
      if (this.has(name)) {
        const field = this.get<DefaultField<T>>(name);
        field.value = value;
        return field;
      }
      return this.create(name, value, options);
    }
  }
}
