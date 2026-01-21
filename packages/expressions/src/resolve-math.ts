import {MathOperationType} from './types';
import {isNumber, throwError, throwIf} from '@axi-engine/utils';

/**
 * A safe utility function that performs a basic mathematical operation on two operands.
 *
 * This function includes built-in type checking. It first ensures
 * that both `left` and `right` operands are numbers before performing the calculation.
 * If the type check fails or if an unsupported operator is provided, it will throw
 * a descriptive error.
 *
 * @param op The mathematical operator to apply ('+', '-', '*', '/').
 * @param left The left-hand operand. It is validated to be a number.
 * @param right The right-hand operand. It is validated to be a number.
 * @returns {number} The numerical result of the calculation.
 * @throws {Error} If either `left` or `right` is not a number.
 * @throws {Error} If the `op` is not a recognized `MathOperationType`.
 *
 * @example
 * const result = resolveMath('+', 10, 5); // returns 15
 * const product = resolveMath('*', 2, 3); // returns 6
 */
export function resolveMath(op: MathOperationType, left: unknown, right: unknown): number {
  throwIf(
    !isNumber(left) || !isNumber(right),
    `Require number operands, but got ${typeof left} and ${typeof right}.`
  );
  switch (op) {
    case "+": return Number(left) + Number(right)
    case "-": return Number(left) - Number(right)
    case "*": return Number(left) * Number(right)
    case "/": return Number(left) / Number(right)
    default:
      return throwError(`Unknown arithmetic operator: ${op}`);
  }
}
