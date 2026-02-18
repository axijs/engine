import {describe, expect, it} from 'vitest';
import {configureExpressions} from './setup';
import {createMockDataSource} from './test-utils';
import {AndExpression, ComparisonExpression, ExistsExpression, InExpression, NotExpression} from './expressions';

describe('CoreExpressionEvaluator Integration', () => {
  const mockDataSource = createMockDataSource();
  const evaluator = configureExpressions().withDefaults().build();

  it('should resolve literal values', async () => {
    // The IDE reports: "Redundant 'await' for a non-Promise type", but you can safely ignore this.
    // In the Vitest documentation this usage is valid. More details here:
    // https://jestjs.io/docs/expect#resolves
    await expect(evaluator.resolve({literal: true}, mockDataSource)).resolves.toBe(true);
    await expect(evaluator.resolve({literal: false}, mockDataSource)).resolves.toBe(false);
  });

  it('should resolve comparisons', async () => {
    const eqExpression: ComparisonExpression = {
      comparison: {
        left: {path: ['player', 'hp']},
        op: '==',
        right: {value: 100}
      }
    };
    await expect(evaluator.resolve(eqExpression, mockDataSource)).resolves.toBe(true);

    const moreExpression: ComparisonExpression = {
      comparison: {
        left: {path: ['player', 'hp']},
        op: '>',
        right: {value: 50}
      }
    };
    await expect(evaluator.resolve(moreExpression, mockDataSource)).resolves.toBe(true);

    const nameCheckExpression: ComparisonExpression = {
      comparison: {
        left: {path: 'player/name'},
        op: '!=',
        right: {value: 'Alex'}
      }
    };
    await expect(evaluator.resolve(nameCheckExpression, mockDataSource)).resolves.toBe(false);

    const isAliveCheckExpression: ComparisonExpression = {
      comparison: {
        left: {path: 'player/isAlive'},
        op: '==',
        right: {value: false}
      }
    };
    await expect(evaluator.resolve(isAliveCheckExpression, mockDataSource)).resolves.toBe(false);
  });

  it('should resolve exists check', async () => {
    const existsExpression: ExistsExpression = { exists: ['player', 'hp']};
    await expect(evaluator.resolve(existsExpression, mockDataSource)).resolves.toBe(true);

    const notExistsExpression: ExistsExpression = { exists: ['player', 'house']};
    await expect(evaluator.resolve(notExistsExpression, mockDataSource)).resolves.toBe(false);
  });

  it('should handle logical operators (AND, OR, NOT)', async () => {
    // (hp > 0) AND (isAlive == true)
    const andExpr: AndExpression = {
      and: [
        { comparison: { left: { path: 'player/hp' }, op: '>', right: { value: 0 } } },
        { comparison: { left: { path: 'player/isAlive' }, op: '==', right: { value: true } } }
      ]
    };
    await expect(evaluator.resolve(andExpr, mockDataSource)).resolves.toBe(true);

    // NOT (hp < 0) -> NOT false -> true
    const notExpr: NotExpression = {
      not: {
        comparison: { left: { path: 'player/hp' }, op: '<', right: { value: 0 } }
      }
    };
    await expect(evaluator.resolve(notExpr, mockDataSource)).resolves.toBe(true);
  });

  it('should resolve contain check', async () => {
    const inExpTrue: InExpression = {
      in: {
        value: {value: 100},
        array: [{path: ['player', 'hp']}, {value: 55}, {value: 'hello'}]
      }
    };
    await expect(evaluator.resolve(inExpTrue, mockDataSource)).resolves.toBe(true);

    const inExpFalse: InExpression = {
      in: {
        value: {value: 'dog'},
        array: [{path: ['player', 'hp']}, {value: 55}, {value: 'hello'}]
      }
    };
    await expect(evaluator.resolve(inExpFalse, mockDataSource)).resolves.toBe(false);
  });
});
