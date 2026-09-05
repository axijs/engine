import type {ChangeFieldListener} from '../event-bus';
import {NodeReference} from './node-reference';

/**
 * Represents a wrapper for a specific data node.
 *
 * @template T The type of the value stored in the field.
 */
export interface ReadonlyFieldReference<T> extends NodeReference<T> {
  /**
   * The current value of the field.
   */
  readonly value: T;

  onChange(listener: ChangeFieldListener<T>): void;
  unsubscribeOnChange(listener: ChangeFieldListener<T>): void;
}
