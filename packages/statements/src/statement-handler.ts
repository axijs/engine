import {Statement, StatementName} from './statements';
import {StatementResolverContext} from './statement-resolver-context';


/**
 * Defines the execution logic for a specific statement type.
 * @template T The specific statement interface (e.g., LogStatement).
 * @template C The context type, defaults to standard StatementResolverContext.
 */
export interface StatementHandler<
  T extends Statement = Statement,
  C extends StatementResolverContext = StatementResolverContext
> {
  name: StatementName;

  /**
   * Executes the logic for the given statement.
   * @param statement The statement data object.
   * @param context Services available during execution.
   * @returns A promise that resolves when execution is complete.
   */
  process(
    statement: T,
    context: C
  ): Promise<void>;
}
