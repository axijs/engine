import {ExpressionHandler} from '../expression-handler';
import {ExpressionName, NotExpression} from '../expressions';
import {ExpressionEvaluatorContext} from '../expression-evaluator';

export class NotExpressionHandler implements ExpressionHandler<NotExpression> {
  type: ExpressionName = 'not';

  async resolve(exp: NotExpression, context: ExpressionEvaluatorContext) {
    return !(await context.resolve(exp.not))
  }
}
