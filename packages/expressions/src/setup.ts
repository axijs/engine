import {ExpressionHandler} from './expression-handler';
import {
  AndExpressionHandler,
  ChanceExpressionHandler,
  ComparisonExpressionHandler,
  ExistsExpressionHandler, InExpressionHandler, LiteralExpressionHandler, NotExpressionHandler, OrExpressionHandler
} from './handlers';
import {CoreExpressionEvaluator} from './core-expression-evaluator';


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

export class ExpressionEvaluatorBuilder {
  private handlers: ExpressionHandler[] = [];

  withDefaults() {
    this.handlers.push(...createDefaultExpressionHandlers());
    return this;
  }

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
