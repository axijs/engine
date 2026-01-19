import {isNullOrUndefined} from '@axi-engine/utils';
import {ArithmeticOperand, Operand, ReferenceOperand, ValueOperand} from './types';

/**
 * Type guard that checks if a value is a `ValueOperand`.
 * A `ValueOperand` represents a direct, literal value.
 *
 * @param val The value to check.
 * @returns {boolean} `true` if the value is a `ValueOperand`, otherwise `false`.
 */
export function isValueOperand(val: unknown): val is ValueOperand {
  return !isNullOrUndefined(val) && typeof val === 'object' && 'value' in val;
}

/**
 * Type guard that checks if a value is a `ReferenceOperand`.
 * A `ReferenceOperand` represents a reference to a value via a path.
 *
 * @param val The value to check.
 * @returns {boolean} `true` if the value is a `ReferenceOperand`, otherwise `false`.
 */
export function isReferenceOperand(val: unknown): val is ReferenceOperand {
  return !isNullOrUndefined(val) && typeof val === 'object' && 'path' in val;
}

/**
 * Type guard that checks if a value is an `ArithmeticOperand`.
 * An `ArithmeticOperand` represents a mathematical calculation.
 *
 * @param val The value to check.
 * @returns {boolean} `true` if the value is an `ArithmeticOperand`, otherwise `false`.
 */
export function isArithmeticOperand(val: unknown): val is ArithmeticOperand {
  return !isNullOrUndefined(val) && typeof val === 'object' && 'arithmetic' in val;
}

/**
 * Type guard that checks if a value is any valid `Operand` type.
 *
 * @param val The value to check.
 * @returns {boolean} `true` if the value is a `ValueOperand`, `ReferenceOperand`,
 * or `ArithmeticOperand`, otherwise `false`.
 */
export function isOperand(val: unknown): val is Operand {
  return isValueOperand(val) || isReferenceOperand(val) || isArithmeticOperand(val);
}
