import {DefaultField} from './default-field';
import {BooleanField, FieldOptions} from '../field';

export interface DefaultBooleanFieldOptions extends FieldOptions<boolean> { }

export class DefaultBooleanField extends DefaultField<boolean> implements BooleanField {
  static readonly typeName: string = 'boolean';
  readonly typeName = DefaultBooleanField.typeName;

  constructor(name: string, initialVal: boolean, options?: DefaultBooleanFieldOptions) {
    super(name, initialVal, options);
  }

  toggle(): boolean {
    this.value = !this.value;
    return this.value;
  }
}
