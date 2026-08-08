import type {FieldReference} from './field-reference';
import {ReadonlyFieldRef} from './readonly-field-ref';

export class FieldRef<T> extends ReadonlyFieldRef<T> implements FieldReference<T> {
  override set value(val: T) {
    this._store.set(this._pathArr, val);
  }

  override get value(): T {
    return this._store.get<T>(this._pathArr);
  }
}
