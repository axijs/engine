import {StatementHandler} from '../statement-handler';
import {Statement, StatementName, SwitchStatement} from '../statements';
import {StatementResolverContext} from '../statement-resolver-context';
import {isUndefined} from '@axi-engine/utils';
import {resolveOperand} from '@axi-engine/expressions';

export class SwitchStatementHandler implements StatementHandler<SwitchStatement> {
  name: StatementName = 'switch';

  async process(
    statement: SwitchStatement,
    context: StatementResolverContext,
  ) {
    const res = resolveOperand(statement.switch.check, context.storage());
    let statements: Statement[] | undefined;
    for (let caseOption of statement.switch.cases) {
      const caseOpRes = resolveOperand(caseOption.case, context.storage());
      if (caseOpRes !== res) {
        continue;
      }
      statements = caseOption.do;
      break;
    }
    if (isUndefined(statements) && !isUndefined(statement.switch.default)) {
      statements = statement.switch.default;
    }
    if (!isUndefined(statements)) {
      return context.statements().execute(statements, context);
    }
  }
}
