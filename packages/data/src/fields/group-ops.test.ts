import {describe, expect, it} from 'vitest';
import {NodeFactory} from './node-factory';
import {GroupOps} from './group-ops';
import type {FieldGroup} from './field-group';

describe('GroupOps', () => {
  it('traverses nested paths and returns branch with leafName', () => {
    const root = NodeFactory.group({
      player: NodeFactory.group({
        stats: NodeFactory.group({
          health: NodeFactory.num(100),
        }),
      }),
    });

    const traverse = GroupOps.traversePath(root, 'player/stats/health');
    expect(traverse).toEqual({
      branch: (root.items.player as FieldGroup).items.stats,
      leafName: 'health',
    });
  });

  it('returns undefined when path cannot be traversed', () => {
    const root = NodeFactory.group({foo: NodeFactory.str('x')});
    expect(GroupOps.traversePath(root, 'foo/bar')).toBeUndefined();
    expect(GroupOps.traversePath(root, [])).toBeUndefined();
  });

  it('creates intermediate groups when set is used', () => {
    const root = NodeFactory.group();
    const success = GroupOps.set(root, 'a/b/c', NodeFactory.num(7));
    expect(success).toBe(true);
    expect((root.items.a as any).items.b.items.c).toEqual(NodeFactory.num(7));
  });

  it('detects node existence with has()', () => {
    const root = NodeFactory.group({
      a: NodeFactory.group({
        b: NodeFactory.group({
          c: NodeFactory.str('ok'),
        }),
      }),
    });

    expect(GroupOps.has(root, 'a/b/c')).toBe(true);
    expect(GroupOps.has(root, 'a/b/missing')).toBe(false);
  });

  it('gets nodes by path', () => {
    const root = NodeFactory.group({
      data: NodeFactory.group({
        value: NodeFactory.bool(true),
      }),
    });

    expect(GroupOps.get(root, 'data/value')).toEqual(NodeFactory.bool(true));
    expect(GroupOps.get(root, 'data/missing')).toBeUndefined();
  });

  it('adds a new node only if missing', () => {
    const root = NodeFactory.group({
      a: NodeFactory.group({}),
    });

    expect(GroupOps.add(root, 'a/b', NodeFactory.str('new'))).toBe(true);
    expect(GroupOps.get(root, 'a/b')).toEqual(NodeFactory.str('new'));
    expect(GroupOps.add(root, 'a/b', NodeFactory.str('existing'))).toBe(false);
  });

  it('replaces only existing nodes', () => {
    const root = NodeFactory.group({
      a: NodeFactory.group({
        b: NodeFactory.num(10),
      }),
    });

    expect(GroupOps.replace(root, 'a/b', NodeFactory.num(20))).toBe(true);
    expect(GroupOps.get(root, 'a/b')).toEqual(NodeFactory.num(20));
    expect(GroupOps.replace(root, 'a/missing', NodeFactory.num(0))).toBe(false);
  });

  it('removes nodes by path', () => {
    const root = NodeFactory.group({
      a: NodeFactory.group({
        b: NodeFactory.str('delete'),
      }),
    });

    expect(GroupOps.remove(root, 'a/b')).toBe(true);
    expect(GroupOps.get(root, 'a/b')).toBeUndefined();
    expect(GroupOps.remove(root, 'a/b')).toBe(false);
  });

  it('accepts array path values', () => {
    const root = NodeFactory.group();
    const success = GroupOps.set(root, ['x', 'y', 'z'], NodeFactory.bool(false));
    expect(success).toBe(true);
    expect(GroupOps.get(root, ['x', 'y', 'z'])).toEqual(NodeFactory.bool(false));
  });
});
