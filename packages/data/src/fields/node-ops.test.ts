import {describe, expect, it} from 'vitest';
import {NodeFactory} from './node-factory';
import {NodeOps} from './node-ops';

describe('NodeOps', () => {
  const group = NodeFactory.group({
    item1: NodeFactory.str('hello'),
    item2: NodeFactory.group({nested: NodeFactory.num(42)}),
  });

  it('checks child existence only for group nodes', () => {
    expect(NodeOps.has(group, 'item1')).toBe(true);
    expect(NodeOps.has(group, 'missing')).toBe(false);
    expect(NodeOps.has(NodeFactory.str('x'), 'item1')).toBe(false);
  });

  it('gets child nodes from a group', () => {
    expect(NodeOps.get(group, 'item1')).toEqual(NodeFactory.str('hello'));
    expect(NodeOps.get(group, 'missing')).toBeUndefined();
    expect(NodeOps.get(NodeFactory.num(1), 'item1')).toBeUndefined();
  });

  it('sets an existing child node on a group', () => {
    const target = NodeFactory.group({child: NodeFactory.str('a')});
    const result = NodeOps.set(target, 'child', NodeFactory.str('b'));
    expect(result).toBe(true);
    expect(target.items.child).toEqual(NodeFactory.str('b'));
  });

  it('fails to set on non-group nodes', () => {
    expect(NodeOps.set(NodeFactory.bool(true), 'child', NodeFactory.str('b'))).toBe(false);
  });

  it('adds a new child when missing', () => {
    const target = NodeFactory.group({});
    const result = NodeOps.add(target, 'added', NodeFactory.num(10));
    expect(result).toBe(true);
    expect(target.items.added).toEqual(NodeFactory.num(10));
  });

  it('does not add an existing child', () => {
    const target = NodeFactory.group({exists: NodeFactory.str('x')});
    expect(NodeOps.add(target, 'exists', NodeFactory.str('y'))).toBe(false);
    expect(target.items.exists).toEqual(NodeFactory.str('x'));
  });

  it('replaces an existing child', () => {
    const target = NodeFactory.group({replaceMe: NodeFactory.bool(false)});
    const result = NodeOps.replace(target, 'replaceMe', NodeFactory.bool(true));
    expect(result).toBe(true);
    expect(target.items.replaceMe).toEqual(NodeFactory.bool(true));
  });

  it('does not replace a missing child', () => {
    const target = NodeFactory.group({});
    expect(NodeOps.replace(target, 'missing', NodeFactory.bool(true))).toBe(false);
  });

  it('removes an existing child', () => {
    const target = NodeFactory.group({removeMe: NodeFactory.num(3)});
    expect(NodeOps.remove(target, 'removeMe')).toBe(true);
    expect(Object.hasOwn(target.items, 'removeMe')).toBe(false);
  });

  it('does not remove a missing child', () => {
    expect(NodeOps.remove(NodeFactory.group({}), 'missing')).toBe(false);
  });
});
