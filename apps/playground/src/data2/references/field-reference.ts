import type {ChangeFieldListener, DeleteNodeListener} from '../event-bus';

/**
 * Represents a wrapper for a specific data node.
 *
 * @template T The type of the value stored in the field.
 */
export interface FieldReference<T> {
  readonly path: string;
  readonly pathArr: string[];
  /**
   * The current value of the field.
   * Assigning a new value triggers policies and emits the `onChange` event
   * if the value is different from the current one.
   */
  value: T;

  onChange(listener: ChangeFieldListener<T>): void;

  onDelete(listener: DeleteNodeListener<T>): void;

  unsubscribeOnChange(listener: ChangeFieldListener<T>): void;

  unsubscribeOnDelete(listener: DeleteNodeListener<T>): void;
}

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

/**
 */
export interface BooleanFieldReference extends FieldReference<boolean> {
  /**
   * Inverts the current boolean value (true -> false, false -> true).
   * @returns {boolean} The new value after toggling.
   */
  toggle(): boolean;
}

/**
 */
export interface StringFieldReference extends FieldReference<string> {
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
