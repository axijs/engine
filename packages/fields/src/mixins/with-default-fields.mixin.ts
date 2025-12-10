import {Constructor} from '@axi-engine/utils';
import {DefaultField, FieldOptions, Fields} from '@axi-engine/fields';

export function WithDefaultFields<TBase extends Constructor<Fields>>(Base: TBase) {

  return class FieldsWithDefault extends Base {
    createDefault<T>(name: string, initialValue: T, options?: FieldOptions<T>): DefaultField<T> {
      return this.create(DefaultField.typeName, name, initialValue, options);
    }

    upsetDefault<T>(name: string, value: T, options?: FieldOptions<T>): DefaultField<T> {
      return this.upset(DefaultField.typeName, name, value, options);
    }
  }
}
