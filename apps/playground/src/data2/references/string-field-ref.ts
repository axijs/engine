import {FieldRef} from './field-ref.ts';
import type {StringFieldReference} from './field-reference.ts';

export class StringFieldRef extends FieldRef<string> implements StringFieldReference {
  append(str: string | number): this {
    console.log('str: ', str);
    return this;
  }

  prepend(str: string | number): this {
    console.log('str: ', str);
    return this;
  }

  trim(): this {
    console.log('trim');
    return this;
  }

  isEmpty(): boolean {
    return true;
  }

  clear(): void {

  }
}
