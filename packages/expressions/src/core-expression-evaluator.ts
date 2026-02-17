import {Expression, ExpressionName} from './expressions';
import {ExpressionHandler} from './expression-handler';
import {
  firstKeyOf,
  DataSource, Registry,
} from '@axi-engine/utils';
import {ExpressionEvaluator} from './expression-evaluator';
import {ExpressionEvaluatorContext} from './expression-evaluator-context';


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
export class CoreExpressionEvaluator implements ExpressionEvaluator {
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
