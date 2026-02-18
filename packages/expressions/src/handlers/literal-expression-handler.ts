import {ExpressionHandler} from '../expression-handler';
import {ExpressionName, LiteralExpression} from '../expressions';
import {ExpressionEvaluatorContext} from '../expression-evaluator-context';

export class LiteralExpressionHandler implements ExpressionHandler<LiteralExpression> {
  type: ExpressionName = 'literal';

  async resolve(exp: LiteralExpression, _context: ExpressionEvaluatorContext) {
    return exp.literal;
  }
}
