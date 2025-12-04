import {Field} from './field';
import {FieldPolicy} from './field-policies';
import {Emitter, Subscribable} from '@axi-engine/utils';
import {FieldPolicyList} from './field-policy-list';
import {dequal} from 'dequal';

/**
 * A state container that wraps a value.
 * It allows applying a pipeline of transformation or validation "policies" before any new value is set.
 *
 * @template T The type of the value this field holds.
 *
 */
export class BaseField<T> implements Field<T> {
  /** A unique identifier for the field. */
  private readonly _name: string;
  private _value!: T;
  private readonly _onChange: Emitter<[newValue: T, oldvalue: T]> = new Emitter();
  readonly onChange: Subscribable<[newValue: T, oldvalue: T]>;
  readonly policies: FieldPolicyList<T> = new FieldPolicyList();

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

    if (!dequal(this._value, oldVal)) {
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
    options?: {
      policies?: FieldPolicy<T>[]
    }
  ) {
    this.onChange = this._onChange;
    this._name = name;
    options?.policies?.forEach(policy => this.policies.add(policy));
    this.value = initialVal;
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
