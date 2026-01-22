import {Expression, ExpressionName} from './expressions';
import {ExpressionHandler} from './expression-handler';
import {
  firstKeyOf,
  DataSource, Registry,
} from '@axi-engine/utils';

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

/**
 * The class responsible for evaluating expression trees.
 *
 * It acts as an orchestrator that manages a registry of `ExpressionHandler`
 * instances and delegates the evaluation of a specific expression to the
 * appropriate handler.
 *
 * Users typically do not create this class directly but use the
 * `createExpressionEvaluator` factory function, which provides a pre-configured
 * instance with all core handlers.
 *
 * @class
 */
export class ExpressionEvaluator {
  /** @internal A map of registered expression handlers. */
  handlers = new Registry<ExpressionName, ExpressionHandler>();

  /**
   * Registers a new `ExpressionHandler` with the evaluator.
   * This is the primary mechanism for extending the expression language with
   * custom logic and new expression types.
   *
   * @param handler The `ExpressionHandler` instance to register.
   * @throws {Error} Throws an error if a handler for the same expression type
   * is already registered.
   */
  register(handler: ExpressionHandler) {
    this.handlers.register(handler.type, handler);
  }

  /**
   * Resolves a given expression against a data source.
   *
   * This is the main entry point for the evaluation process. It identifies the
   * expression type by its key, finds the corresponding handler, creates the
   * evaluation context, and delegates the evaluation task to the handler.
   *
   * @param expression The expression object to evaluate.
   * @param data The `DataSource` to be used for resolving any `ReferenceOperand`s
   * within the expression tree.
   * @returns A promise that resolves to `true` or `false` based on the
   * evaluation result.
   */
  async resolve(expression: Expression, data: DataSource) {
    const key = firstKeyOf(expression) as ExpressionName;
    const handler = this.handlers.getOrThrow(key);
    const context: ExpressionEvaluatorContext = {
      resolve: (expression: Expression) => this.resolve(expression, data),
      source: () => data
    };

    return handler!.resolve(expression, context);
  }

}
