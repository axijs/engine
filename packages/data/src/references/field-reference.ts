import {ReadonlyFieldReference} from './readonly-field-reference';

export interface FieldReference<T> extends ReadonlyFieldReference<T> {
  /**
   * Assigning a new value triggers policies and emits the `onChange` event
   * if the value is different from the current one.
   */
  value: T;
}
