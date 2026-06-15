import {FieldRef} from './field-ref.ts';
import type {BooleanFieldReference} from './field-reference.ts';

export class BooleanFieldRef extends FieldRef<boolean> implements BooleanFieldReference {
  toggle(): boolean {
    return true;
  }
}
