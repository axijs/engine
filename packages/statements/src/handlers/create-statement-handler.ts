import {resolveOperand} from '@axi-engine/expressions';
import {StatementHandler} from '../statement-handler';
import {CreateVariableStatement, StatementName} from '../statements';
import {StatementResolverContext} from '../statement-resolver-context';


export class CreateStatementHandler implements StatementHandler<CreateVariableStatement> {
  name: StatementName = 'create';

  async process(
    statement: CreateVariableStatement,
    context: StatementResolverContext,
  ): Promise<void> {
    context.storage().create(
      statement.create.field,
      resolveOperand(statement.create.var, context.storage())
    );
  }
}
