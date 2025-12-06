import {DefaultField} from './default-field';
import {FieldOptions, StringField} from '../types';

export interface DefaultStringFieldOptions extends FieldOptions<string> { }

export class DefaultStringField extends DefaultField<string> implements StringField {

  constructor(name: string, initialVal: string, options?: DefaultStringFieldOptions) {
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
