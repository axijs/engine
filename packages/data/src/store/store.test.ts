import {describe, expect, it} from 'vitest';
import {Store} from './store';
import {GroupOps} from '../fields';

describe('Store', () => {
  it('creates a new field and reads it back', () => {
    const store = new Store();
    store.create('player/score', 10);

    expect(store.has('player/score')).toBe(true);
    expect(store.get<number>('player/score')).toBe(10);
  });

  it('throws when creating an existing field', () => {
    const store = new Store();
    store.create('player/score', 10);

    expect(() => store.create('player/score', 20)).toThrow(/already exists/);
  });

  it('sets existing field values and preserves type', () => {
    const store = new Store();
    store.create('player/score', 5);
    store.set('player/score', 15);

    expect(store.get('player/score')).toBe(15);
  });

  it('throws when setting a missing field', () => {
    const store = new Store();
    expect(() => store.set('player/score', 10)).toThrow(/Can't find field by path/);
  });

  it('upserts a missing field as create then updates existing field', () => {
    const store = new Store();
    store.upsert(['player','health'], 100);
    expect(store.get(['player','health'])).toBe(100);

    store.upsert('player/health', 80);
    expect(store.get('player/health')).toBe(80);
  });

  it('deletes a field and removes it from the store', () => {
    const store = new Store();
    store.create(['player','level'], 1);
    expect(store.has(['player','level'])).toBe(true);
    expect(store.get<number>(['player','level'])).toBe(1);

    store.delete('player/level');
    expect(store.has('player/level')).toBe(false);
  });

  it('throws when deleting a missing path', () => {
    const store = new Store();
    expect(() => store.delete('player/missing')).toThrow(/Can't delete node by path/);
  });

  it('deletes nested group with children', () => {
    const store = new Store();
    store.create('settings/ui/theme', 'dark');
    store.create('settings/ui/fontSize', 14);

    expect(store.has('settings/ui/theme')).toBe(true);
    expect(store.has('settings/ui/fontSize')).toBe(true);

    store.delete('settings/ui');

    expect(store.has('settings/ui')).toBe(false);
    expect(store.has('settings/ui/theme')).toBe(false);
    expect(store.has('settings/ui/fontSize')).toBe(false);
  });

  it('emits create/change/delete events in lazy mode after tick', () => {
    const store = new Store();
    const createdPaths: string[] = [];
    const changedEvents: Array<{path:string, value:any, oldValue:any}> = [];
    const deletedPaths: string[] = [];

    store.onAnyCreate(paths => createdPaths.push(...paths));
    store.onAnyChange(paths => changedEvents.push(...paths.map(path => ({path, value: 'unknown', oldValue: 'unknown'}))));
    store.onAnyDelete(paths => deletedPaths.push(...paths));

    store.create('player/score', 10);
    store.create('player/level', 1);
    store.create('player/name', 'hero');
    store.set('player/score', 20);
    store.delete('player/level');

    expect(createdPaths).toEqual([]);
    expect(changedEvents).toEqual([]);
    expect(deletedPaths).toEqual([]);

    store.tick();

    expect(createdPaths).toContain('player/score');
    expect(createdPaths).toContain('player/level');
    expect(createdPaths).toContain('player/name');
    expect(deletedPaths).toContain('player/level');
    expect(changedEvents.some(e => e.path === 'player/score')).toBe(true);
  });

  it('emits create/change/delete events eagerly when eventMode is eager', () => {
    const store = new Store();
    store.eventMode = 'eager';

    const created: Array<{path:string, value?: any}> = [];
    const changed: Array<{path:string, value: any; oldValue?: any}> = [];
    const deleted: Array<{path:string, oldValue?: any}> = [];

    store.onCreate('player/score', event => created.push(event));
    store.onChange('player/score', event => changed.push(event));
    store.onDelete('player/level', event => deleted.push(event));

    store.create('player/score', 10);
    expect(created).toEqual([{path: 'player/score', value: 10}]);

    store.create('player/level', 1);
    expect(store.get<number>('player/level')).toEqual(1);

    store.set('player/score', 20);
    expect(changed).toEqual([{path: 'player/score', value: 20, oldValue: 10}]);

    store.delete('player/level');
    expect(deleted).toEqual([{path: 'player/level', oldValue: 1}]);
  });

  it('generic field', () => {
    const store = new Store();
    store.create('test', undefined);
    const node = GroupOps.get(store.getGroup(),'test');
    expect(node?.type).toEqual('generic');

    store.set('test', 'hello');
    expect(store.get('test')).toEqual('hello');
  });
});
