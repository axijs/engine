import {Expression} from './expressions';
import {DataSource} from '@axi-engine/utils';

/**
 * Provides the execution context for an `ExpressionHandler`, giving it the tools
 * needed to perform its evaluation. An instance of this context is passed to
 * every handler's `resolve` method.
 * @interface
 */
export interface ExpressionEvaluatorContext {
  /**
   * A function to recursively resolve nested or child expressions.
   * This is used by logical handlers like `AndExpressionHandler` or `NotExpressionHandler`
   * to evaluate their child expressions using the main evaluator logic.
   * @param expression The nested expression to resolve.
   * @returns A promise that resolves to the boolean result of the nested expression.
   */
  resolve(expression: Expression): Promise<boolean>,

  /**
   * A function that returns the `DataSource` for the current evaluation.
   * This allows the handler to retrieve values needed for `ReferenceOperand`s.
   * @returns The active `DataSource`.
   */
  source(): DataSource
}
