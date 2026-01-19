import {ExpressionHandler} from '../expression-handler';
import {ComparisonExpression, ExpressionName} from '../expressions';
import {ExpressionEvaluatorContext} from '../expression-evaluator';
import {resolveOperandAsScalar} from '../resolve-operand';

export class ComparisonExpressionHandler implements ExpressionHandler<ComparisonExpression> {
  type: ExpressionName = 'comparison';

  async resolve(exp: ComparisonExpression, context: ExpressionEvaluatorContext) {
    const left = resolveOperandAsScalar(exp.comparison.left, context.source());
    const right = resolveOperandAsScalar(exp.comparison.right, context.source());

    switch (exp.comparison.op) {
      case "==":
        return left === right;
      case "<=":
        return left <= right;
      case "<":
        return left < right;
      case ">=":
        return left >= right;
      case ">":
        return left > right;
      case "!=":
        return left !== right;
    }
  }
}
