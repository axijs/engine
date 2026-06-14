import {CoreField} from './core-field';
import {BooleanField, } from '../field';

export class CoreBooleanField extends CoreField<boolean> implements BooleanField {
  static override readonly typeName: string = 'boolean';
  override readonly typeName = CoreBooleanField.typeName;

  constructor(name: string, initialVal: boolean) {
    super(name, initialVal);
  }

  toggle(): boolean {
    this.value = !this.value;
    return this.value;
  }
}
