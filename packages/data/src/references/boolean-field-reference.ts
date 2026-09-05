import {FieldReference} from './field-reference';

/**
 */
export interface BooleanFieldReference extends FieldReference<boolean> {
  /**
   * Inverts the current boolean value (true -> false, false -> true).
   * @returns {boolean} The new value after toggling.
   */
  toggle(): boolean;
}
