import {Operand} from './types';
import {DataSource, isScalar, ScalarType, throwError, throwIf} from '@axi-engine/utils';
import {isArithmeticOperand, isReferenceOperand, isValueOperand} from './guards';
import {resolveMath} from './resolve-math';

/**
 * Recursively resolves an Operand into its final scalar value.
 *
 * This function processes different types of operands:
 * - `ValueOperand`: Returns the direct value.
 * - `ReferenceOperand`: Looks up the value from the provided data source using its path.
 * - `ArithmeticOperand`: Recursively resolves its left and right sides and then performs the calculation.
 *
 * @param op The `Operand` object to resolve. This can be a direct value, a path reference, or a nested arithmetic operation.
 * @param source The `DataSource` used to look up values for `ReferenceOperand` types.
 * @returns unknown.
 * @throws {Error} If a `ReferenceOperand` points to a path that does not resolve to a scalar value.
 * @throws {Error} If an `ArithmeticOperand` is used with non-numeric values.
 * @throws {Error} If an unknown or unsupported operand type is provided.
 */
export function resolveOperand(op: Operand, source: DataSource): unknown {
  if (isValueOperand(op)) {
    return op.value;
  }
  if (isReferenceOperand(op)) {
    return source.get(op.path);
  }
  if (isArithmeticOperand(op)) {
    const leftVal = resolveOperand(op.arithmetic.left, source);
    const rightVal = resolveOperand(op.arithmetic.right, source);
    return resolveMath(op.arithmetic.op, leftVal, rightVal);
  }
  return throwError(`Unknown operand type: ${JSON.stringify(op)}`);
}

/**
 * Resolves an operand and asserts that the result is a `ScalarType`.
 *
 * This function acts as a type-safe convenience wrapper around the more generic
 * `resolveOperand` function. It is the preferred way to resolve operands within
 * expression handlers that are designed to work only with scalar values
 * (string, number, or boolean), as it centralizes type checking.
 *
 * @param op The `Operand` object to resolve.
 * @param source The `DataSource` used to look up values for reference operands.
 * @returns The resolved scalar value.
 * @throws {Error} If the resolved value from the operand is not a `ScalarType`
 * (e.g., it's an object, array, or undefined).
 */
export function resolveOperandAsScalar(op: Operand, source: DataSource): ScalarType {
  const value = resolveOperand(op, source);
  throwIf(
    !isScalar(value),
    `Expected a scalar value (string, number, boolean), but got ${typeof value}.`
  );
  return value as ScalarType;
}
