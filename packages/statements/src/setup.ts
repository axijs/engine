import {StatementHandler} from './statement-handler';
import {StatementResolver} from './statement-resolver';
import {
  CreateStatementHandler,
  DeleteVariableStatementHandler,
  IfStatementHandler,
  SetVariableStatementHandler,
  UpSetVariableStatementHandler
} from './handlers';
import {LogStatementHandler} from './handlers/log-statement-handler';

/**
 * @param {StatementHandler[]} [additionalHandlers]
 * @return StatementResolver
 */
export function createStatementResolver(additionalHandlers?: StatementHandler[]) {
  const resolver = new StatementResolver();

  const handlers = [
    new LogStatementHandler(),
    new CreateStatementHandler(),
    new DeleteVariableStatementHandler(),
    new IfStatementHandler(),
    new SetVariableStatementHandler(),
    new UpSetVariableStatementHandler()
  ];
  if (additionalHandlers) {
    handlers.push(...additionalHandlers);
  }

  handlers.forEach(handler => resolver.register(handler));

  return resolver;
}
