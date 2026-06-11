import {beforeEach, describe, expect, it} from 'vitest';
import {createCoreFieldRegistry} from './setup';
import {CoreFields} from './core-fields';
import {CoreField} from './field-definitions';

describe('checkSearchFunctions', () => {
  const registry = createCoreFieldRegistry();
  let fields: CoreFields;

  beforeEach(() => {
    fields?.destroy();
    fields = new CoreFields(registry);
  });

  describe('findFirst', () => {
    it('should return the first field that matches the predicate', () => {
      fields.add(new CoreField('item1', { location: 'home', id: 1}));
      fields.add(new CoreField('item2', { location: 'work', id: 2 }));
      fields.add(new CoreField('item3', { location: 'work', id: 3 }));

      const result = fields.findFirst(f => f.value.location === 'work');

      expect(result).toBeDefined();
      expect(result?.name).toBe('item2');
    });

    it('should return undefined if no field matches the predicate', () => {
      fields.add(new CoreField('item1', { location: 'home' }));
      const result = fields.findFirst(f => f.value.location === 'work');
      expect(result).toBeUndefined();
    });

    it('should return undefined when fields container is empty', () => {
      const result = fields.findFirst(f => f.value.location === 'deck');
      expect(result).toBeUndefined();
    });
  });

  describe('findAll', () => {
    it('should return all fields that match the predicate', () => {
      fields.add(new CoreField('card1', { location: 'hand' }));
      fields.add(new CoreField('card2', { location: 'deck', id: 1 }));
      fields.add(new CoreField('card3', { location: 'discard' }));
      fields.add(new CoreField('card4', { location: 'deck', id: 2 }));

      const results = fields.findAll(f => f.value.location === 'deck');

      expect(results.length).toBe(2);
      expect(results[0].name).toBe('card2');
      expect(results[1].name).toBe('card4');
    });

    it('should return an empty array if no fields match the predicate', () => {
      fields.add(new CoreField('card1', { location: 'hand' }));

      const results = fields.findAll(f => f.value.location === 'exile');

      expect(results).toEqual([]);
    });

    it('should return an empty array when fields container is empty', () => {
      const results = fields.findAll(f => f.value.location === 'deck');
      expect(results).toEqual([]);
    });
  });
});
