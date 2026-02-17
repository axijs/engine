import {isNullOrUndefined} from '@axi-engine/utils';
import {StatementHandler} from '../statement-handler';
import {IfStatement, StatementName} from '../statements';
import {StatementResolverContext} from '../statement-resolver-context';


export class IfStatementHandler implements StatementHandler<IfStatement> {
  name: StatementName = 'if';

  async process(
    instruction: IfStatement,
    context: StatementResolverContext,
  ) {
    const condition = await context.expressions().resolve(instruction.if.condition, context.storage());
    if (condition) {
      return context.statements().execute(instruction.if.then, context);
    } else if (!isNullOrUndefined(instruction.if.else)) {
      return context.statements().execute(instruction.if.else, context);
    }
  }
}
