import {StatementHandler} from '../statement-handler';
import {DeleteVariableStatement, StatementName} from '../statements';
import {StatementResolverContext} from '../statement-resolver-context';

export class DeleteVariableStatementHandler implements StatementHandler<DeleteVariableStatement> {
  name: StatementName = 'delete';

  async process(
    statement: DeleteVariableStatement,
    context: StatementResolverContext,
  ) {
    context.storage().delete(statement.delete);
  }
}
