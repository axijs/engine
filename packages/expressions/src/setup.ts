import {ExpressionHandler} from './expression-handler';
import {ExpressionEvaluator} from './expression-evaluator';
import {
  AndExpressionHandler,
  ChanceExpressionHandler,
  ComparisonExpressionHandler,
  ExistsExpressionHandler, InExpressionHandler, LiteralExpressionHandler, NotExpressionHandler, OrExpressionHandler
} from './handlers';


/**
 * A factory function that creates and initializes an `ExpressionEvaluator` instance.
 *
 * This is the recommended way to set up the evaluator, as it comes pre-configured
 * with handlers for all core expression types (logical, comparison, chance, etc.).
 * It also provides a simple way to extend the evaluator with custom logic by passing
 * additional handlers.
 *
 * @param {ExpressionHandler[]} [additionalHandlers] - An optional array of custom
 *   `ExpressionHandler` instances to register in addition to the core ones. This allows for
 *   extending the expression language with new capabilities.
 * @returns {ExpressionEvaluator} A fully configured `ExpressionEvaluator` instance,
 *   ready for resolving expressions.
 *
 * @example
 * // Basic setup with only core handlers
 * const coreEvaluator = createExpressionEvaluator();
 * const result = await coreEvaluator.resolve(someExpression, dataSource);
 *
 * @example
 * // Setup with a custom handler for a new expression type
 * const customHandlers = [new MyCustomExpressionHandler()];
 * const extendedEvaluator = createExpressionEvaluator(customHandlers);
 * const customResult = await extendedEvaluator.resolve(myCustomExpression, dataSource);
 */
export function createExpressionEvaluator(additionalHandlers?: ExpressionHandler[]): ExpressionEvaluator {
  const evaluator = new ExpressionEvaluator();

  evaluator.register(new AndExpressionHandler());
  evaluator.register(new ChanceExpressionHandler());
  evaluator.register(new ComparisonExpressionHandler());
  evaluator.register(new ExistsExpressionHandler());
  evaluator.register(new InExpressionHandler());
  evaluator.register(new LiteralExpressionHandler());
  evaluator.register(new NotExpressionHandler());
  evaluator.register(new OrExpressionHandler());

  additionalHandlers?.forEach(handler => evaluator.register(handler));

  return evaluator;
}
