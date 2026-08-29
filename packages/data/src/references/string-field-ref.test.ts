import {describe, expect, it} from 'vitest';
import {Store} from '../store';
import {DataReferences} from './data-references';

describe('string field reference', () => {
  it('creates a string reference with append, prepend, trim, isEmpty and clear', () => {
    const store = new Store();
    const refs = new DataReferences(store);
    store.create('settings/title', '  Hello ');

    const ref = refs.get('string', 'settings/title');
    expect(ref.value).toBe('  Hello ');
    expect(ref.append(' World').value).toBe('  Hello  World');
    expect(ref.prepend('Say: ').value).toBe('Say:   Hello  World');
    expect(ref.trim().value).toBe('Say:   Hello  World'.trim());
    expect(ref.isEmpty()).toBe(false);
    ref.clear();
    expect(ref.value).toBe('');
    expect(ref.isEmpty()).toBe(true);
  });
});
