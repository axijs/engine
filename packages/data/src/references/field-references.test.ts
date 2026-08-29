import {describe, expect, it} from 'vitest';
import {Store} from '../store';
import {BooleanFieldRef} from './boolean-field-ref';
import {NumericFieldRef} from './numeric-field-ref';
import {StringFieldRef} from './string-field-ref';
import {DataReferences} from './data-references';


describe('references', () => {
  it('returns an auto reference by field type', () => {
    const store = new Store();
    const refs = new DataReferences(store);
    store.create('auto/flag', true);
    store.create('auto/count', 3);
    store.create('auto/name', 'test');

    const booleanRef = refs.getAuto<BooleanFieldRef>('auto/flag');
    booleanRef.toggle();
    expect(store.get<boolean>('auto/flag')).toBe(false);

    const numericRef = refs.getAuto<NumericFieldRef>('auto/count');
    numericRef.inc(2);
    expect(store.get<number>('auto/count')).toBe(5);

    const stringRef = refs.getAuto<StringFieldRef>('auto/name');
    stringRef.append('ing');
    expect(store.get<string>('auto/name')).toBe('testing');
  });

  it('uses createRef and upsertRef to create typed references', () => {
    const store = new Store();
    const refs = new DataReferences(store);
    const ref = refs.createAndRef<NumericFieldRef>('created/age', 21);
    expect(ref.value).toBe(21);
    ref.value = 22;
    expect(store.get('created/age')).toBe(22);

    const upsertRef = refs.upsertAndRef('created/age', 23);
    expect(upsertRef.value).toBe(23);
  });
});
