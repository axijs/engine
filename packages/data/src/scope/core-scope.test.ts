import {describe, expect, it} from 'vitest';
import {ScopeError} from './errors';
import {CoreScope} from './core-scope';

const createScope = (name?: string, parent?: CoreScope) => new CoreScope({
  name,
  parent,
});

describe('CoreScope', () => {
  it('creates a scope with an id and can extend it with a child scope', () => {
    const root = createScope('root');
    const child = root.extend('child');

    expect(root.uid).toEqual(expect.any(String));
    expect(child).toMatchObject({name: 'child', parent: root});
    expect(child.data).not.toBe(root.data);
  });

  it('reads local values before falling back to parent scopes', () => {
    const root = createScope('root');
    root.create('shared/value', 10);
    const child = root.extend('child') as CoreScope;
    child.create('local/value', 20);

    expect(child.get('local/value')).toBe(20);
    expect(child.get('shared/value')).toBe(10);
    expect(child.get(['shared', 'value'])).toBe(10);
    expect(child.has('shared/value')).toBe(true);
    expect(child.has('missing')).toBe(false);
  });

  it('resolves this and named scope paths', () => {
    const root = createScope('root');
    root.create('value', 10);
    const child = root.extend('child') as CoreScope;
    child.create('value', 20);

    expect(child.get('this/value')).toBe(20);
    expect(child.get('root/value')).toBe(10);
    expect(child.tracePath('this/value')).toEqual({scope: child, path: ['value']});
    expect(child.tracePath('root/value')).toEqual({scope: root, path: ['value']});
    expect(child.findScopeByName('root')).toBe(root);
    expect(child.findScopeByName('missing')).toBeUndefined();
  });

  it('sets the nearest existing value in the scope chain', () => {
    const root = createScope('root');
    root.create('value', 10);
    const child = root.extend('child') as CoreScope;
    child.set('value', 20);

    expect(root.get('value')).toBe(20);

    child.create('value', 30);
    child.set('value', 40);
    expect(child.get('value')).toBe(40);
    expect(root.get('value')).toBe(20);
  });

  it('updates a named parent directly with set', () => {
    const root = createScope('root');
    root.create('value', 10);
    const child = root.extend('child') as CoreScope;

    child.set('root/value', 15);

    expect(root.get('value')).toBe(15);
  });

  it('upserts plain paths in the current scope and named paths in the target scope', () => {
    const root = createScope('root');
    root.create('value', 10);
    const child = root.extend('child') as CoreScope;

    child.upsert('local/value', 20);
    child.upsert('local/value', 25);
    child.upsert('root/value', 15);

    expect(child.get('local/value')).toBe(25);
    expect(root.get('value')).toBe(15);
  });

  it('creates values in the scope resolved by the path', () => {
    const root = createScope('root');
    const child = root.extend('child') as CoreScope;

    child.create('this/local', 20);
    child.create('root/fromChild', 30);

    expect(child.get('local')).toBe(20);
    expect(root.get('fromChild')).toBe(30);
    expect(() => child.create('local', 40)).toThrow(ScopeError);
  });

  it('deletes values from the resolved scope', () => {
    const root = createScope('root');
    root.create('rootValue', 10);
    const child = root.extend('child') as CoreScope;
    child.create('localValue', 20);

    child.delete('localValue');
    child.delete('root/rootValue');

    expect(child.has('localValue')).toBe(false);
    expect(root.has('rootValue')).toBe(false);
  });

  it('does not delete an inherited value through an unqualified path', () => {
    const root = createScope('root');
    root.create('value', 10);
    const child = root.extend('child') as CoreScope;

    expect(() => child.delete('value')).toThrow(ScopeError);
    expect(root.get('value')).toBe(10);
  });

  it('wraps missing value operations in ScopeError', () => {
    const scope = createScope();

    expect(() => scope.get('missing')).toThrow(ScopeError);
    expect(() => scope.set('missing', 10)).toThrow(ScopeError);
    expect(() => scope.delete('missing')).toThrow(ScopeError);
  });

  it('clears local data and destroy detaches the scope from its parent', () => {
    const root = createScope('root');
    root.create('rootValue', 10);
    const child = root.extend('child') as CoreScope;
    child.create('localValue', 20);

    child.clear();
    expect(child.has('localValue')).toBe(false);
    expect(child.get('rootValue')).toBe(10);

    child.create('localValue', 30);
    child.destroy();
    expect(child.parent).toBeUndefined();
    expect(child.has('localValue')).toBe(false);
    expect(() => child.get('rootValue')).toThrow(ScopeError);
  });
});
