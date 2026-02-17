import {StatementResult} from './statement-result';
import {Statement, StatementName} from './statements';
import {StatementResolverContext} from './statement-resolver-context';


export interface StatementHandler<
  T extends Statement = Statement,
  C extends StatementResolverContext = StatementResolverContext
> {
  name: StatementName;

  process(
    statement: T,
    context: C
  ): Promise<StatementResult | void>;
}
