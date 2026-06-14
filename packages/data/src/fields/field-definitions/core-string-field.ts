import {CoreField} from './core-field';
import {StringField} from '../field';


export class CoreStringField extends CoreField<string> implements StringField {
  static override readonly typeName: string = 'string';
  override readonly typeName = CoreStringField.typeName;

  constructor(name: string, initialVal: string) {
    super(name, initialVal);
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
