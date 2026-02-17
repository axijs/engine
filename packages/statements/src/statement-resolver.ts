import {StatementHandler} from './statement-handler';
import {Statement, StatementName} from './statements';
import {firstKeyOf, Registry} from '@axi-engine/utils';
import {StatementResolverContext} from './statement-resolver-context';
import {registerStatementName, unregisterStatementName} from './config';

export class StatementResolver {
  readonly handlers = new Registry<StatementName, StatementHandler<any, any>>();

  register(handler: StatementHandler) {
    registerStatementName(handler.name);
    this.handlers.register(handler.name, handler);
  }

  unregister(name: StatementName) {
    this.handlers.delete(name);
    unregisterStatementName(name);
  }

  /**
   */
  async execute<C extends StatementResolverContext>(statements: Statement | Statement[], context: C): Promise<void> {
    const toExec = Array.isArray(statements) ? statements : [statements];
    for (const statement of toExec) {
      await this.selectTask<C>(statement, context);
    }
  }

  private selectTask<C extends StatementResolverContext>(instruction: Statement, context: C): Promise<void> {
    const key = firstKeyOf(instruction) as StatementName;
    return this.handlers.getOrThrow(key).process(instruction, context);
  }
}
