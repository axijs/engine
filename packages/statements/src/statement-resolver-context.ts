import {ExpressionEvaluator} from '@axi-engine/expressions';
import {DataStorage} from '@axi-engine/utils';
import {StatementResolver} from './statement-resolver';


export interface StatementResolverContext {
  expressions(): ExpressionEvaluator,
  statements(): StatementResolver,
  storage(): DataStorage
}
