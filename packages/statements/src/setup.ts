import {StatementHandler} from './statement-handler';
import {StatementResolver} from './statement-resolver';
import {
  CreateVariableStatementHandler,
  DeleteVariableStatementHandler,
  IfStatementHandler,
  SetVariableStatementHandler, SwitchStatementHandler,
  UpSetVariableStatementHandler
} from './handlers';
import {LogStatementHandler} from './handlers/log-statement-handler';

/**
 * Returns a new array of standard statement handlers.
 */
export function createDefaultStatementHandlers(): StatementHandler[] {
  return [
    new LogStatementHandler(),
    new CreateVariableStatementHandler(),
    new DeleteVariableStatementHandler(),
    new IfStatementHandler(),
    new SetVariableStatementHandler(),
    new UpSetVariableStatementHandler(),
    new SwitchStatementHandler()
  ];
}


/**
 * Builder for configuring and creating a StatementResolver instance.
 */
export class StatementResolverBuilder {
  private handlers: StatementHandler[] = [];

  /**
   * Adds the standard set of handlers (log, set, if, switch, etc.).
   */
  withDefaults(): this {
    this.handlers.push(...createDefaultStatementHandlers());
    return this;
  }

  /**
   * Adds a specific handler.
   */
  add(handler: StatementHandler): this {
    this.handlers.push(handler);
    return this;
  }

  /**
   * Adds multiple handlers at once.
   */
  addMany(handlers: StatementHandler[]): this {
    this.handlers.push(...handlers);
    return this;
  }

  /**
   * Creates the resolver and registers all configured handlers.
   */
  build(): StatementResolver {
    const resolver = new StatementResolver();
    this.handlers.forEach(handler => resolver.register(handler));
    return resolver;
  }
}


/**
 * Entry point to start configuring a statement resolver.
 * @returns A new builder instance.
 */
export function configureStatements(): StatementResolverBuilder {
  return new StatementResolverBuilder();
}
