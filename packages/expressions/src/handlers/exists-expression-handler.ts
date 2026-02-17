import {ExpressionHandler} from '../expression-handler';
import {ExpressionName, ExistsExpression} from '../expressions';
import {ExpressionEvaluatorContext} from '../expression-evaluator-context';

export class ExistsExpressionHandler implements ExpressionHandler<ExistsExpression> {
  type: ExpressionName = 'exists';

  async resolve(exp: ExistsExpression, context: ExpressionEvaluatorContext) {
    return context.source().has(exp.exists);
  }
}
