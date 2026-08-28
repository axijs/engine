import {describe, expect, it} from 'vitest';
import {Store} from '../store';
import {DataReferences} from './data-references';

describe('generic field reference', () => {
  it('returns a generic reference and updates store through value assignment', () => {
    const store = new Store();
    const refs = new DataReferences({data: store});
    store.create('player/score', 10);

    const ref = refs.getRef<number>('player/score');
    expect(ref.value).toBe(10);

    ref.value = 20;
    expect(store.get<number>('player/score')).toBe(20);
    expect(ref.value).toBe(20);
  });
});
