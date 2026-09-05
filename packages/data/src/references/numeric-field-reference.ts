import {FieldReference} from './field-reference';

/**
 */
export interface NumericFieldReference extends FieldReference<number> {
  /**
   * Increments the current value by the specified amount.
   * @param val The amount to add.
   */
  inc(val: number): void;

  /**
   * Decrements the current value by the specified amount.
   * @param val The amount to subtract.
   */
  dec(val: number): void;
}
