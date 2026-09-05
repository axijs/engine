import {FieldReference} from './field-reference';

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
