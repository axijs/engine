import {describe, expect, it} from 'vitest';
import {Store} from '../store';
import {DataReferences} from './data-references';


describe('numeric field reference', () => {
  it('creates a numeric reference with inc and dec helpers', () => {
    const store = new Store();
    const refs = new DataReferences(store);

    store.create('player/points', 5);

    const ref = refs.get('numeric', 'player/points');
    expect(ref.value).toBe(5);
    ref.inc(10);
    expect(ref.value).toBe(15);
    ref.dec(4);
    expect(ref.value).toBe(11);
  });
});
