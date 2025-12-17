import {CoreField} from './core-field';
import {BooleanField, FieldOptions} from '../field';

export interface CoreBooleanFieldOptions extends FieldOptions<boolean> { }

export class CoreBooleanField extends CoreField<boolean> implements BooleanField {
  static readonly typeName: string = 'boolean';
  readonly typeName = CoreBooleanField.typeName;

  constructor(name: string, initialVal: boolean, options?: CoreBooleanFieldOptions) {
    super(name, initialVal, options);
  }

  toggle(): boolean {
    this.value = !this.value;
    return this.value;
  }
}
