import {Expression} from './expressions';
import {DataSource,} from '@axi-engine/utils';


/**
 *
 * Defines the contract for an engine capable of evaluating logical expression trees.
 *
 * @interface
 */
export interface ExpressionEvaluator {

  /**
   * Evaluates a logical expression against a provided data source.
   *
   * @param expression The expression tree to evaluate.
   * @param data The data source used to resolve variable references within the expression.
   * @returns A promise that resolves to `true` or `false` based on the evaluation result.
   */
  resolve(expression: Expression, data: DataSource): Promise<boolean>;
}
