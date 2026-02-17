import {StatementHandler} from './statement-handler';
import {Statement, StatementName} from './statements';
import {StatementResult} from './statement-result';
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
   * if in array contains several statements with result, only one last will be returned
   */
  async execute<C extends StatementResolverContext>(statements: Statement[], context: C): Promise<StatementResult | void> {
    let res: StatementResult | void = undefined;

    for (const statement of statements) {
      const taskRes = await this.selectTask<C>(statement, context);
      if (taskRes) {
        res = taskRes;
      }
    }

    return res;
  }

  private selectTask<C extends StatementResolverContext>(instruction: Statement, context: C) {
    const key = firstKeyOf(instruction) as StatementName;
    return this.handlers.getOrThrow(key).process(instruction, context);
  }
}
