/** todo: mock data */

import { vi } from 'vitest';
import { StatementResolverContext } from './statement-resolver-context';
import {DataStorage, PathType} from '@axi-engine/utils';
import {ExpressionEvaluator} from '@axi-engine/expressions';
import {StatementResolver} from './statement-resolver';

// export function createMockContext(): StatementResolverContext {
//   const storage: DataStorage = {
//     get: vi.fn(),
//     set: vi.fn(),
//     has: vi.fn(),
//     delete: vi.fn(),
//     create: vi.fn(),
//     upset: vi.fn(),
//   };
//
//   const expressions = {
//     resolve: vi.fn(),
//     register: vi.fn(),
//   };
//
//   const statements = {
//     execute: vi.fn(),
//   };
//
//   // const ctx: StatementResolverContext = {
//   //   storage(): DataStorage { return storage; },
//   //   expressions(): ExpressionEvaluator { return expressions; },
//   //   statements(): StatementResolver {
//   //   },
//   // };
// }
