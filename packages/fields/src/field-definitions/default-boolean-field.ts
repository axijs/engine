import {DefaultField} from './default-field';
import {BooleanField, FieldOptions} from '../types';

export interface DefaultBooleanFieldOptions extends FieldOptions<boolean> { }

export class DefaultBooleanField extends DefaultField<boolean> implements BooleanField {
  static typeName = 'boolean';
  readonly typeName = DefaultBooleanField.typeName;

  constructor(name: string, initialVal: boolean, options?: DefaultBooleanFieldOptions) {
    super(name, initialVal, options);
  }

  toggle(): boolean {
    this.value = !this.value;
    return this.value;
  }
}
