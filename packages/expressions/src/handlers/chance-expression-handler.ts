import {ExpressionHandler} from '../expression-handler';
import {ChanceExpression, ExpressionName} from '../expressions';
import {ExpressionEvaluatorContext} from '../expression-evaluator';
import {resolveOperandAsScalar} from '../resolve-operand';
import {isNumber, isString, randInt, throwIf} from '@axi-engine/utils';

/**
 * An expression handler for the `chance` expression.
 *
 * This handler evaluates to `true` or `false` based on a probabilistic check.
 * It resolves its operand to a numeric percentage value and compares it against
 * a random number roll.
 */
export class ChanceExpressionHandler implements ExpressionHandler<ChanceExpression> {
  type: ExpressionName = 'chance';

  /**
   * Resolves the `chance` expression.
   *
   * The method first resolves the operand to a scalar value. It supports both
   * numbers (e.g., `50`) and strings (e.g., `"50"`, `"50%"`), which are parsed
   * into a numeric percentage. It then generates a random integer from 0 to 99
   * and returns `true` if this random number is less than the resolved chance value.
   *
   * @param exp The `ChanceExpression` object to resolve.
   * @param context The context for the expression evaluation, providing access to the data source.
   * @returns {Promise<boolean>} A promise that resolves to `true` if the random roll
   * succeeds, and `false` otherwise.
   * @throws {Error} If the operand resolves to a value that cannot be parsed into
   * a number (e.g., a boolean or a non-numeric string).
   */
  async resolve(exp: ChanceExpression, context: ExpressionEvaluatorContext): Promise<boolean> {
    const resolvedValue = resolveOperandAsScalar(exp.chance, context.source());
    let numericValue: number;
    if (isNumber(resolvedValue)) {
      numericValue = resolvedValue;
    } else if (isString(resolvedValue)) {
      const parsed = parseFloat(resolvedValue.replace('%', '').trim());
      throwIf(isNaN(parsed), `Chance value as a string must be a valid number, but got '${resolvedValue}'.`);
      numericValue = parsed;
    } else {
      throwIf(true, `Chance value must be a number or a string, but got a boolean.`);
    }
    const randomRoll  = randInt(0, 100);
    return randomRoll < numericValue!;
  }
}
