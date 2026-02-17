import {Expression, ExpressionName} from './expressions';
import {ExpressionEvaluatorContext} from './expression-evaluator-context';

/**
 * Defines the contract for a class that can evaluate a specific type of expression.
 *
 * Each expression type in the system (e.g., `comparison`, `and`, `in`) must have a
 * corresponding class that implements this interface. The `ExpressionEvaluator` uses these
 * handlers to delegate the actual evaluation logic.
 *
 * @interface
 * @template T - The specific `Expression` subtype that this handler is responsible for.
 *   This provides strong typing within the `resolve` method.
 */
export interface ExpressionHandler<T extends Expression = Expression> {
  /**
   * The unique key for the expression type this handler processes.
   * This must match one of the keys in the `ExpressionDefinitions` interface.
   */
  type: ExpressionName;

  /**
   * The core evaluation logic for the expression.
   *
   * @param exp The specific expression object to be evaluated, strongly typed to `T`.
   * @param context The `ExpressionEvaluatorContext` which provides tools for the
   *   handler, such as a way to recursively resolve child expressions or access the
   *   data source.
   * @returns {Promise<boolean>} A promise that resolves to the boolean result of the evaluation.
   */
  resolve(exp: T, context: ExpressionEvaluatorContext): Promise<boolean>
}
