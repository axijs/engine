import {ExpressionHandler} from '../expression-handler';
import {ExpressionName, InExpression} from '../expressions';
import {ExpressionEvaluatorContext} from '../expression-evaluator-context';
import {resolveOperand, resolveOperandAsScalar} from '../resolve-operand';
import {isScalar, ScalarType, throwIf} from '@axi-engine/utils';
import {Operand} from '../types';


/**
 * An expression handler for the `in` expression.
 *
 * This handler checks if a resolved scalar value is present within a collection (array).
 * It supports both literal arrays defined directly in the expression and arrays
 * resolved from a data source via an operand.
 */
export class InExpressionHandler implements ExpressionHandler<InExpression> {
  type: ExpressionName = 'in';

  /**
   * Resolves the `in` expression.
   *
   * The method performs the following steps:
   * 1. Resolves the `value` operand to a scalar.
   * 2. Obtains the source array, which can be a literal array from the expression
   *    or the result of resolving the `array` operand.
   * 3. Ensures the source is a valid array.
   * 4. Resolves every item within the source array to a scalar value.
   * 5. Checks if the value from step 1 is included in the resolved array from step 4.
   *
   * @param exp The `InExpression` object to resolve.
   * @param context The context for the expression evaluation, providing the data source.
   * @returns {Promise<boolean>} A promise that resolves to `true` if the value is found
   * in the array, and `false` otherwise.
   * @throws {Error} If the source for the array does not resolve to an array.
   * @throws {Error} If any operand within the process fails to resolve correctly.
   */
  async resolve(exp: InExpression, context: ExpressionEvaluatorContext): Promise<boolean> {
    const value = resolveOperandAsScalar(exp.in.value, context.source());

    const rawArray = Array.isArray(exp.in.array)
      ? exp.in.array
      : resolveOperand(exp.in.array, context.source());

    throwIf(!Array.isArray(rawArray),
      `The 'in' expression requires an array, but the provided source resolved to ${typeof rawArray}.`
    );

    const typedArray = rawArray as ((ScalarType | Operand)[]);
    const resolvedArray: ScalarType[] = typedArray.map(item =>
      isScalar(item) ? item : resolveOperandAsScalar(item as Operand, context.source())
    );

    return resolvedArray.includes(value);
  }
}
