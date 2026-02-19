import {Subscribable} from '@axi-engine/utils';
import {Policies, Policy} from './policies';

/**
 * Configuration options for creating a new Field instance.
 * @template T The type of the value stored in the field.
 */
export interface FieldOptions<T> {
  /**
   * An optional array of policies to apply to this field.
   * Policies can enforce validation rules, transform values, or handle constraints.
   */
  policies?: Policy<T>[]
}

/**
 * Represents a reactive data holder for a specific value type.
 *
 * A Field wraps a raw value, providing features like change observation (`onChange`),
 * policy enforcement (validation/transformation), and metadata management (`name`, `typeName`).
 *
 * @template T The type of the value stored in the field.
 */
export interface Field<T> {
  /**
   * A unique string identifier for the field type (e.g., 'numeric', 'boolean').
   * Used for serialization and type guards.
   */
  readonly typeName: string;

  /**
   * The name or key of this field within its parent container.
   */
  readonly name: string;

  /**
   * The current value of the field.
   * Assigning a new value triggers policies and emits the `onChange` event
   * if the value is different from the current one.
   */
  value: T;

  /**
   * The collection of policies applied to this field.
   */
  policies: Policies<T>;

  /**
   * Updates the field's value without triggering the `onChange` event.
   * Useful for internal synchronization or restoring state where side effects are undesirable.
   * @param val The new value to set.
   */
  setValueSilently(val: T): void;

  /**
   * Performs an atomic-like update using a callback function.
   * The callback receives the current value and should return the new value.
   * @param updateFn A function that transforms the current value into a new one.
   */
  batchUpdate(updateFn: (currentValue: T) => T): void;

  /**
   * An observable stream that emits an event whenever the value changes.
   * The payload contains the new value and the old value.
   */
  onChange: Subscribable<[newValue: T, oldValue:T]>;

  /**
   * Cleans up the field, removing all listeners and releasing resources.
   * Should be called when the field is no longer needed.
   */
  destroy(): void;
}

/**
 * A specialized Field for handling numeric values.
 * Provides capabilities for range clamping (min/max) and arithmetic operations.
 */
export interface NumericField extends Field<number> {
  /** The minimum allowed value for this field, or undefined if no lower bound exists. */
  readonly min: number | undefined;

  /** The maximum allowed value for this field, or undefined if no upper bound exists. */
  readonly max: number | undefined;

  /**
   * Checks if the current value is equal to or less than the minimum limit.
   */
  isMin(): boolean;

  /**
   * Checks if the current value is equal to or greater than the maximum limit.
   */
  isMax(): boolean;

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

/**
 * A specialized Field for handling boolean values.
 * Provides toggle functionality.
 */
export interface BooleanField extends Field<boolean> {
  /**
   * Inverts the current boolean value (true -> false, false -> true).
   * @returns {boolean} The new value after toggling.
   */
  toggle(): boolean;
}

/**
 * A specialized Field for handling string values.
 * Provides chainable methods for common string manipulations.
 */
export interface StringField extends Field<string> {
  /**
   * Appends a string or number to the end of the current value.
   * @param str The value to append.
   * @returns {this} The field instance for chaining.
   */
  append(str: string | number): this

  /**
   * Prepends a string or number to the beginning of the current value.
   * @param str The value to prepend.
   * @returns {this} The field instance for chaining.
   */
  prepend(str: string | number): this

  /**
   * Removes whitespace from both ends of the current string value.
   * @returns {this} The field instance for chaining.
   */
  trim(): this

  /**
   * Checks if the current string is empty (length is 0).
   * @returns {boolean} `true` if the string is empty, otherwise `false`.
   */
  isEmpty(): boolean

  /**
   * Sets the value to an empty string.
   */
  clear(): void
}
