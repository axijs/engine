import {describe, expect, it} from 'vitest';
import {Store} from '../store';
import {DataReferences} from './data-references';

describe('readonly field reference', () => {
  it('returns a readonly reference and subscribes to change/delete events', () => {
    const store = new Store();
    const refs = new DataReferences({data: store});
    store.eventMode = 'eager';
    store.create('player/name', 'hero');

    const ref = refs.getReadonlyRef<string>('player/name');
    expect(ref.value).toBe('hero');
    expect(ref.path).toBe('player/name');
    expect(ref.pathArr).toEqual(['player', 'name']);

    const changes: Array<{ path: string; value: string; oldValue?: string }> = [];
    const deletes: Array<{ path: string; oldValue?: string }> = [];
    ref.onChange(event => changes.push(event));
    ref.onDelete(event => deletes.push(event));

    store.set('player/name', 'villain');
    expect(changes).toEqual([{path: 'player/name', value: 'villain', oldValue: 'hero'}]);

    store.delete('player/name');
    expect(deletes).toEqual([{path: 'player/name', oldValue: 'villain'}]);
  });
});
