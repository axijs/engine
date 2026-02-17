import {resolveOperand} from '@axi-engine/expressions';
import {StatementHandler} from '../statement-handler';
import {SetVariableStatement, StatementName} from '../statements';
import {StatementResolverContext} from '../statement-resolver-context';



export class SetVariableStatementHandler implements StatementHandler<SetVariableStatement> {
  name: StatementName = 'set';

  async process(
    statement: SetVariableStatement,
    context: StatementResolverContext,
  ) {
    context.storage().set(
      statement.set.field,
      resolveOperand(statement.set.var, context.storage())
    );
  }
}
