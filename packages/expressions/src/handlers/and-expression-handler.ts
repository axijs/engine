import {ExpressionHandler} from '../expression-handler';
import {AndExpression, ExpressionName} from '../expressions';
import {ExpressionEvaluatorContext} from '../expression-evaluator-context';

export class AndExpressionHandler implements ExpressionHandler<AndExpression> {
  type: ExpressionName = 'and';

  async resolve(exp: AndExpression, context: ExpressionEvaluatorContext) {
    const res: boolean[] = [];
    for(let childExp of exp.and) {
      res.push(await context.resolve(childExp));
    }
    return exp.and.length === res.filter(val => val).length;
  }
}
