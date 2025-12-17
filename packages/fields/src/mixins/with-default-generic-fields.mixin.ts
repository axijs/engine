import {Constructor} from '@axi-engine/utils';
import {DefaultField, FieldOptions, Fields} from '@axi-engine/fields';


export function WithDefaultGenericFields<TBase extends Constructor<Fields>>(Base: TBase) {

  return class FieldsWithDefaultGeneric extends Base {
    createGeneric<T>(name: string, initialValue: T, options?: FieldOptions<T>): DefaultField<T> {
      return this.create(DefaultField.typeName, name, initialValue, options);
    }

    upsetGeneric<T>(name: string, value: T, options?: FieldOptions<T>): DefaultField<T> {
      return this.upset(DefaultField.typeName, name, value, options);
    }

    getGeneric<T>(name: string): DefaultField<T> {
      return this.get(name);
    }
  }
}

