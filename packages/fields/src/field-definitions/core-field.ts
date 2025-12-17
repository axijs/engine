import {Emitter, Subscribable} from '@axi-engine/utils';
import {Policies} from '../policies';
import {dequal} from 'dequal';
import {Field, FieldOptions} from '../field';


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
  private readonly _name: string;
  private _value!: T;
  private readonly _onChange: Emitter<[newValue: T, oldvalue: T]> = new Emitter();
  readonly onChange: Subscribable<[newValue: T, oldvalue: T]>;
  readonly policies: Policies<T> = new Policies();


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
    const finalVal = this.policies.apply(val);
    if (!dequal(this._value, finalVal)) {
      this._value = finalVal;
      this._onChange.emit(this._value, oldVal);
    }
  }

  /**
   * Creates an instance of a Field.
   * @param name A unique identifier for the field.
   * @param initialVal The initial value of the field.
   * @param options Optional configuration for the field.
   * @param options.policies An array of policies to apply to the field's value on every `set` operation.
   * @param options.isEqual An function for compare old and new value, by default uses the strictEquals from `utils`
   *
   */
  constructor(
    name: string,
    initialVal: T,
    options?: FieldOptions<T>
  ) {
    this.onChange = this._onChange;
    this._name = name;
    options?.policies?.forEach(policy => this.policies.add(policy));
    this.value = initialVal;
  }

  setValueSilently(val: T) {
    this._value = this.policies.apply(val);
  }

  batchUpdate(updateFn: (currentValue: T) => T): void {
    this.value = updateFn(this.value);
  }

  /**
   * Cleans up resources used by the field and its policies.
   * This should be called when the field is no longer needed to prevent memory leaks from reactive policies.
   */
  destroy() {
    this.policies.clear();
    this._onChange.clear();
  }
}
