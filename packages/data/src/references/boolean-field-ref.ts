import {FieldRef} from './field-ref';
import type {BooleanFieldReference} from './field-reference';

export class BooleanFieldRef extends FieldRef<boolean> implements BooleanFieldReference {
  toggle(): boolean {
    const res = !this.value;
    this.value = res;
    return res;
  }
}
