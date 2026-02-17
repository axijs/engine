import {ExpressionEvaluator} from '@axi-engine/expressions';
import {DataStorage} from '@axi-engine/utils';
import {StatementResolver} from './statement-resolver';


/**
 * Interface for the context passed to every statement handler.
 * Provides access to core engine services needed for execution.
 */
export interface StatementResolverContext {
  /** Access the expression evaluator for resolving operands. */
  expressions(): ExpressionEvaluator;

  /** Access the statement resolver for executing nested statements. */
  statements(): StatementResolver;

  /** Access the data storage for reading/writing variables. */
  storage(): DataStorage;
}
