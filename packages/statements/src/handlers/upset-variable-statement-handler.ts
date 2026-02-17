import {resolveOperand} from '@axi-engine/expressions';
import {StatementHandler} from '../statement-handler';
import {StatementName, UpSetVariableStatement} from '../statements';
import {StatementResolverContext} from '../statement-resolver-context';



export class UpSetVariableStatementHandler implements StatementHandler<UpSetVariableStatement> {
  name: StatementName = 'upset';

  async process(
    statement: UpSetVariableStatement,
    context: StatementResolverContext,
  ) {
    context.storage().upset(
      statement.upset.field,
      resolveOperand(statement.upset.var, context.storage())
    );
  }
}
