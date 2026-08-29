import {describe, expect, it} from 'vitest';
import {Store} from '../store';
import {DataReferences} from './data-references';

describe('boolean field references', () => {
  it('creates a boolean reference and toggles value', () => {
    const store = new Store();
    const refs = new DataReferences(store);
    store.create('ui/visible', false);

    const ref = refs.get('boolean', 'ui/visible');
    expect(ref.value).toBe(false);
    expect(ref.toggle()).toBe(true);
    expect(ref.value).toBe(true);
  });
});
