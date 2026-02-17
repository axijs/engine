import {isString} from '@axi-engine/utils';
import {resolveOperand} from '@axi-engine/expressions';
import {StatementHandler} from '../statement-handler';
import {LogStatement, StatementName} from '../statements';
import {StatementResolverContext} from '../statement-resolver-context';

export class LogStatementHandler implements StatementHandler<LogStatement> {
  name: StatementName = 'log';

  async process(
    statement: LogStatement,
    context: StatementResolverContext,
  ) {
    if (isString(statement.log)) {
      console.log(statement.log);
      return;
    }
    const segments = statement.log.map(segment =>
      isString(segment) ? segment : resolveOperand(segment, context.storage())
    );
    console.log(segments);
  }
}
