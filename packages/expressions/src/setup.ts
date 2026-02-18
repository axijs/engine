import {ExpressionHandler} from './expression-handler';
import {
  AndExpressionHandler,
  ChanceExpressionHandler,
  ComparisonExpressionHandler,
  ExistsExpressionHandler, InExpressionHandler, LiteralExpressionHandler, NotExpressionHandler, OrExpressionHandler
} from './handlers';
import {CoreExpressionEvaluator} from './core-expression-evaluator';

/**
* Creates an array containing instances of all standard expression handlers.
* Includes logic (AND, OR, NOT), comparison, existence checks, and literals.
*/
function createDefaultExpressionHandlers() {
  return [
    new AndExpressionHandler(),
    new ChanceExpressionHandler(),
    new ComparisonExpressionHandler(),
    new ExistsExpressionHandler(),
    new InExpressionHandler(),
    new LiteralExpressionHandler(),
    new NotExpressionHandler(),
    new OrExpressionHandler(),
  ]
}

/**
 * A builder class for configuring and creating a `CoreExpressionEvaluator`.
 * Allows enabling standard handlers or registering custom ones via a fluent API.
 */
export class ExpressionEvaluatorBuilder {
  private handlers: ExpressionHandler[] = [];

  /**
   * Adds the complete set of standard expression handlers to the configuration.
   * This is the recommended starting point for most applications.
   */
  withDefaults() {
    this.handlers.push(...createDefaultExpressionHandlers());
    return this;
  }

  /**
   * Registers one or more custom expression handlers.
   * @param handler A single handler instance or an array of handlers.
   */
  add(handler: ExpressionHandler | ExpressionHandler[]): this {
    if (!Array.isArray(handler)) {
      this.handlers.push(handler);
    } else {
      this.handlers.push(...handler);
    }
    return this;
  }

  /**
   * @return CoreExpressionEvaluator
   */
  build() {
    const evaluator = new CoreExpressionEvaluator();
    this.handlers.forEach(handler => evaluator.register(handler));
    return evaluator;
  }
}

/**
 * Entry point to start configuring the expression evaluator.
 * @returns A new builder instance.
 */
export function configureExpressions(): ExpressionEvaluatorBuilder {
  return new ExpressionEvaluatorBuilder();
}
