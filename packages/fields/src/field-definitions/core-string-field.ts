import {CoreField} from './core-field';
import {FieldOptions, StringField} from '../field';

export interface CoreStringFieldOptions extends FieldOptions<string> { }

export class CoreStringField extends CoreField<string> implements StringField {
  static readonly typeName: string = 'string';
  readonly typeName = CoreStringField.typeName;

  constructor(name: string, initialVal: string, options?: CoreStringFieldOptions) {
    super(name, initialVal, options);
  }

  append(str: string | number) {
    this.value = this.value + str;
    return this;
  }
  prepend(str: string | number) {
    this.value = str + this.value;
    return this;
  }
  trim() {
    this.value = this.value.trim();
    return this;
  }
  isEmpty() {
    return this.value.length === 0;
  }

  clear() {
    this.value = '';
  }
}
