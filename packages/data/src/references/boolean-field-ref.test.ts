import {describe, expect, it} from 'vitest';
import {Store} from '../store';

describe('booleand field references', () => {
  it('creates a boolean reference and toggles value', () => {
    const store = new Store();
    store.create('ui/visible', false);

    const ref = store.getTypedRef('boolean', 'ui/visible');
    expect(ref.value).toBe(false);
    expect(ref.toggle()).toBe(true);
    expect(ref.value).toBe(true);
  });
});
