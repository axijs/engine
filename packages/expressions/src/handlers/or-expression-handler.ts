import {ExpressionHandler} from '../expression-handler';
import {ExpressionName, OrExpression} from '../expressions';
import {ExpressionEvaluatorContext} from '../expression-evaluator-context';

export class OrExpressionHandler implements ExpressionHandler<OrExpression> {
  type: ExpressionName = 'or';

  async resolve(exp: OrExpression, context: ExpressionEvaluatorContext) {
    const res: boolean[] = [];
    for(let childExp of exp.or) {
      res.push(await context.resolve(childExp));
    }
    return res.filter(val => val).length > 0;
  }
}
