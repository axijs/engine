import {dequal} from 'dequal';
import {Field} from '../field';
import {Emitter, Subscribable} from '@axijs/emitter';

/**
 * A state container that wraps a value.
 * It allows applying a pipeline of transformation or validation "policies" before any new value is set.
 *
 * @template T The type of the value this field holds.
 *
 */
export class CoreField<T> implements Field<T> {
  /** A type keyword of the field */
  static readonly typeName: string = 'default';
  readonly typeName: string = CoreField.typeName;

  /** A unique identifier for the field. */
  protected readonly _name: string;
  protected  _value!: T;
  protected readonly _onChange: Emitter<[newValue: T, oldvalue: T]> = new Emitter();
  readonly onChange: Subscribable<[newValue: T, oldvalue: T]>;

  get name() {
    return this._name;
  }

  /**
   * Gets the current raw value of the field.
   * For reactive updates, it's recommended to use the `.signal` property instead.
   */
  get value(): T {
    return this._value;
  }

  /**
   * Sets a new value for the field.
   * The provided value will be processed by all registered policies before the underlying signal is updated.
   * @param val The new value to set.
   */
  set value(val: T) {
    const oldVal = this._value;
    if (!dequal(this._value, val)) {
      this._value = val;
      this._onChange.emit(this._value, oldVal);
    }
  }

  /**
   * Creates an instance of a Field.
   * @param name A unique identifier for the field.
   * @param initialVal The initial value of the field.
   */
  constructor(name: string, initialVal: T) {
    this.onChange = this._onChange;
    this._name = name;
    this.value = initialVal;
  }

  setValueSilently(val: T) {
    this._value = val;
  }

  batchUpdate(updateFn: (currentValue: T) => T): void {
    this.value = updateFn(this.value);
  }

  /**
   * Cleans up resources used by the field and its policies.
   * This should be called when the field is no longer needed to prevent memory leaks from reactive policies.
   */
  destroy() {
    this._onChange.clear();
  }
}
