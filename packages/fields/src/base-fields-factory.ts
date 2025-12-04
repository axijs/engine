import {DefaultField, DefaultFieldOptions} from './default-field';
import {Field} from './types';

export interface FieldsFactory<T, F extends Field<T>> {
  create<T>(name: string, initialValue: T, options?: DefaultFieldOptions<T>): F;
}

export class BaseFieldsFactory implements FieldsFactory<any, DefaultField<any>> {
  create<T>(name: string, initialValue: T, options?: DefaultFieldOptions<T>): DefaultField<T> {
    return new DefaultField<T>(name, initialValue, options);
  }
}
