import {FieldRef} from './field-ref.ts';
import type {NumericFieldReference} from './field-reference.ts';

export class NumericFieldRef extends FieldRef<number> implements NumericFieldReference {
  inc(val: number) {
    console.log('val: ', val);
  }

  dec(val: number) {
    console.log('val: ', val);
  }
}
