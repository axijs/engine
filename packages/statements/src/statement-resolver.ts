import {StatementHandler} from './statement-handler';
import {Statement, StatementName} from './statements';
import {firstKeyOf, Registry} from '@axi-engine/utils';
import {StatementResolverContext} from './statement-resolver-context';
import {registerStatementName, unregisterStatementName} from './config';
import {StatementError} from './errors';

/**
 * The core engine for executing declarative statements.
 * Manages the registry of handlers and dispatches execution to the appropriate handler.
 */
export class StatementResolver {
  /** Registry of handlers mapped by statement name. */
  readonly handlers = new Registry<StatementName, StatementHandler<any, any>>();

  /**
   * Registers a new statement handler and updates the global configuration
   * to recognize the statement name in type guards.
   * @param handler The handler instance to register.
   */
  register(handler: StatementHandler) {
    registerStatementName(handler.name);
    this.handlers.register(handler.name, handler);
  }

  /**
   * Unregisters a handler and removes its name from the global configuration.
   * @param name The name of the statement to remove.
   */
  unregister(name: StatementName) {
    this.handlers.delete(name);
    unregisterStatementName(name);
  }

  /**
   * Executes a single statement or a sequence of statements.
   * Execution stops if any statement throws an error.
   *
   * @param statements A single statement object or an array of them.
   * @param context The context providing necessary services (storage, expressions, etc.).
   * @throws {StatementError} If execution fails, wrapping the original error and the causing statement.
   */
  async execute<C extends StatementResolverContext>(statements: Statement | Statement[], context: C): Promise<void> {
    const toExec = Array.isArray(statements) ? statements : [statements];
    for (const statement of toExec) {
      try {
        await this.dispatch<C>(statement, context);
      } catch (error: any) {
        if (error instanceof StatementError) {
          throw error;
        }
        throw new StatementError(error.message || 'Unknown error during execution', statement, { cause: error });
      }
    }
  }

  /**
   * Identifies the statement type and delegates execution to the registered handler.
   */
  private dispatch<C extends StatementResolverContext>(instruction: Statement, context: C): Promise<void> {
    const key = firstKeyOf(instruction) as StatementName;
    return this.handlers.getOrThrow(key).process(instruction, context);
  }
}
