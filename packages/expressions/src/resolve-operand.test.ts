import {describe, it, expect} from 'vitest';
import {resolveOperand, resolveOperandAsScalar} from './resolve-operand';
import {Operand} from './types';
import {createMockDataSource} from './test-utils';



describe('resolveOperand', () => {
  const mockDataSource = createMockDataSource();

  it('should return the value directly from a ValueOperand', () => {
    const operand: Operand = {value: 'hello world'};
    const result = resolveOperand(operand, mockDataSource);
    expect(result).toBe('hello world');
  });

  it('should resolve a value from the data source for a ReferenceOperand', () => {
    const operand: Operand = {path: ['player', 'hp']};
    const result = resolveOperand(operand, mockDataSource);
    expect(result).toBe(100);
  });

  it('should correctly perform an arithmetic operation', () => {
    const operand: Operand = {
      arithmetic: {
        op: '*',
        left: {path: ['player', 'hp']},    // 100
        right: {path: ['config', 'difficulty']} // 2
      }
    };
    const result = resolveOperand(operand, mockDataSource);
    expect(result).toBe(200);
  });

  it('should throw an error when performing arithmetic on non-numeric types', () => {
    const operand: Operand = {
      arithmetic: {
        op: '+',
        left: {path: ['player', 'name']}, // 'Alex'
        right: {value: 5}
      }
    };

    expect(() => resolveOperand(operand, mockDataSource))
      .toThrow('Require number operand');
  });

  it('should throw an error when trying to retrieve scalar type from object', () => {
    expect(() => resolveOperandAsScalar({path: 'inventory/etc'}, mockDataSource))
      .toThrow('Expected a scalar value');
  });
});
