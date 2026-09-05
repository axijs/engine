import {FieldRef} from './field-ref';
import type {NumericFieldReference} from './numeric-field-reference';

export class NumericFieldRef extends FieldRef<number> implements NumericFieldReference {
  inc(val: number) {
    this.value = this.value + val;
  }

  dec(val: number) {
    this.value = this.value - val;
  }
}
