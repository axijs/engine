import {Constructor} from '@axi-engine/utils';
import {CoreField, FieldOptions, Fields} from '@axi-engine/fields';


export function WithDefaultGenericFields<TBase extends Constructor<Fields>>(Base: TBase) {

  return class FieldsWithDefaultGeneric extends Base {
    createGeneric<T>(name: string, initialValue: T, options?: FieldOptions<T>): CoreField<T> {
      return this.create(CoreField.typeName, name, initialValue, options);
    }

    upsetGeneric<T>(name: string, value: T, options?: FieldOptions<T>): CoreField<T> {
      return this.upset(CoreField.typeName, name, value, options);
    }

    getGeneric<T>(name: string): CoreField<T> {
      return this.get(name);
    }
  }
}

