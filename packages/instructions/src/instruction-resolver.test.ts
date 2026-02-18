import {beforeEach, describe, expect, it, vi} from 'vitest';
import {configureInstructions} from './setup';
import {InstructionResolverContext} from './instruction-resolver-context';
import {DataStorage} from '@axi-engine/utils';
import {createMockDataStore} from './test-utils';
import {InstructionResolver} from './instruction-resolver';
import {ExpressionEvaluator} from '@axi-engine/expressions';

describe('CoreInstructionResolver Integration', () => {
  let resolver: InstructionResolver;
  let mockStore: DataStorage;
  let mockEvaluatorResolveFn = vi.fn();
  let mockEvaluator: ExpressionEvaluator;
  let context: InstructionResolverContext;

  beforeEach(() => {
    resolver = configureInstructions().withDefaults().build();
    mockStore = createMockDataStore();

    mockEvaluatorResolveFn = vi.fn();
    mockEvaluator = {
      resolve: mockEvaluatorResolveFn

    };

    context = {
      storage: () => mockStore,
      expressions: () => mockEvaluator,
      instructions: () => resolver
    };
  });

  it('Should create and set variables', async () => {
    await resolver.execute({create: {field: ['inventory', 'gold'], var: {value: 500}}}, context);
    expect(mockStore.get(['inventory', 'gold'])).toBe(500);

    await resolver.execute({set: {field: 'player/hp', var: {value: 90}}}, context);
    expect(mockStore.get('player/hp')).toBe(90);
  });

  it('Should throw error on invalid data operations', async () => {
    // Try to create existing
    await expect(resolver.execute({create: {field: 'player/hp', var: {value: 999}}}, context))
      .rejects
      .toThrow();

    // Try to set non-existing
    await expect(resolver.execute({set: {field: 'ghost/var', var: {value: 0}}}, context))
      .rejects
      .toThrow();
  });

  it('Should handle upset (update or insert)', async () => {
    // Update existing
    await resolver.execute({upset: {field: 'player/hp', var: {value: 50}}}, context);
    expect(mockStore.get('player/hp')).toBe(50);

    // Insert new
    await resolver.execute({upset: {field: 'new/stat', var: {value: 10}}}, context);
    expect(mockStore.get('new/stat')).toBe(10);
  });

  it('Should delete variables', async () => {
    await resolver.execute({delete: 'player/name'}, context);
    expect(mockStore.has('player/name')).toBe(false);
  });


  it('Should execute "if" statement branches', async () => {
    // Case 1: True -> execute THEN
    mockEvaluatorResolveFn.mockResolvedValueOnce(true);

    await resolver.execute({
      if: {
        condition: {literal: true},
        then: [{set: {field: 'player/isAlive', var: {value: false}}}]
      }
    }, context);

    expect(mockStore.get('player/isAlive')).toBe(false);

    // Case 2: False -> execute ELSE (if present)
    mockEvaluatorResolveFn.mockResolvedValueOnce(false);

    await resolver.execute({
      if: {
        condition: {literal: false},
        then: [],
        else: [{set: {field: 'player/hp', var: {value: 1}}}]
      }
    }, context);

    expect(mockStore.get('player/hp')).toBe(1);
  });


  it('Should execute "switch" statement', async () => {
    await resolver.execute({
      switch: {
        check: {path: 'config/difficulty'},
        cases: [
          {case: {value: 'easy'}, do: [{set: {field: 'player/hp', var: {value: 200}}}]},
          {case: {value: 'hard'}, do: [{set: {field: 'player/hp', var: {value: 50}}}]}
        ]
      }
    }, context);

    expect(mockStore.get('player/hp')).toBe(50);
  });
});
