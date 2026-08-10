import {describe, expect, it} from 'vitest';
import {NodeFactory} from './node-factory';
import {
  isBoolean,
  isField,
  isGeneric,
  isGroup,
  isNode,
  isNumeric,
  isString,
} from './guards';

describe('node guards', () => {
  it('detects basic node shape', () => {
    expect(isNode({type: 'generic', value: 1})).toBe(true);
    expect(isNode({value: 1})).toBe(false);
    expect(isNode(null)).toBe(false);
    expect(isNode('string')).toBe(false);
  });

  it('detects group nodes', () => {
    const group = NodeFactory.group();
    const field = NodeFactory.str('hello');

    expect(isGroup(group)).toBe(true);
    expect(isGroup(field)).toBe(false);
    expect(isGroup({type: 'custom'})).toBe(false);
  });

  it('detects field nodes by value property', () => {
    const generic = NodeFactory.generic(1);
    const group = NodeFactory.group();

    expect(isField(generic)).toBe(true);
    expect(isField(NodeFactory.num(42))).toBe(true);
    expect(isField(NodeFactory.bool(true))).toBe(true);
    expect(isField(NodeFactory.str('x'))).toBe(true);
    expect(isField(group)).toBe(false);
    expect(isField({type: 'generic'})).toBe(false);
  });

  it('detects concrete field types', () => {
    expect(isGeneric(NodeFactory.generic(1))).toBe(true);
    expect(isGeneric(NodeFactory.num(1))).toBe(false);

    expect(isNumeric(NodeFactory.num(1))).toBe(true);
    expect(isNumeric(NodeFactory.str('1'))).toBe(false);

    expect(isString(NodeFactory.str('hello'))).toBe(true);
    expect(isString(NodeFactory.bool(true))).toBe(false);

    expect(isBoolean(NodeFactory.bool(true))).toBe(true);
    expect(isBoolean(NodeFactory.generic(1))).toBe(false);
  });
});
