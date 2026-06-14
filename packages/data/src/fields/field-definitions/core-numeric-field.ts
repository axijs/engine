import {CoreField} from './core-field';
import {NumericField} from '../field';


export class CoreNumericField extends CoreField<number> implements NumericField {
  static override readonly typeName: string = 'numeric';
  override readonly typeName = CoreNumericField.typeName;

  constructor(name: string, initialVal: number) {
    super(name, initialVal);
  }

  inc(amount = 1) {
    this.value = this.value + amount;
  }

  dec(amount = 1) {
    this.value = this.value - amount;
  }
}
