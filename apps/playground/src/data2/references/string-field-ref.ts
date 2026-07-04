import {FieldRef} from './field-ref.ts';
import type {StringFieldReference} from './field-reference.ts';

export class StringFieldRef extends FieldRef<string> implements StringFieldReference {
  append(str: string | number): this {
    this.value = this.value + String(str);
    return this;
  }

  prepend(str: string | number): this {
    this.value = String(str) + this.value;
    return this;
  }

  trim(): this {
    this.value = this.value.trim();
    return this;
  }

  isEmpty(): boolean {
    return !this.value.length;
  }

  clear(): void {
    this.value = '';
  }
}
