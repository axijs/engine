import {describe, expect, it} from 'vitest';
import {createCoreFieldSystem} from '../setup';

describe('checkHasPathFieldTree', () => {
  const system = createCoreFieldSystem();
  const fieldTree = system.factory.tree();

  const animalsTree = fieldTree.createFieldTree('animals');
  const catsTree = animalsTree.createFieldTree('cats');

  const strayCats = catsTree.createFields('stray');
  const domesticCats = catsTree.createFields('domestic');

  strayCats.createBoolean('Bobby', true);
  strayCats.createBoolean('Jina', true);
  strayCats.createBoolean('Liza', false);

  domesticCats.createBoolean('Morny', true);
  domesticCats.createBoolean('Endigo', true);
  domesticCats.createBoolean('Nigma', false);

  it('FieldTree has method test', () => {
    expect(fieldTree.hasPath([])).toBe(false);

    expect(fieldTree.hasPath(['animals'])).toBe(true);
    expect(fieldTree.hasPath(['animals', 'cats'])).toBe(true);
    expect(fieldTree.hasPath(['animals', 'cats', 'stray'])).toBe(true);
    expect(fieldTree.hasPath(['animals', 'cats', 'stray', 'Bobby'])).toBe(true);

    expect(fieldTree.hasPath(['animals', 'cats', 'stray', 'BobbyWithError'])).toBe(false);
    expect(fieldTree.hasPath(['animals', 'fishes', 'stray', 'Bobby'])).toBe(false);
    expect(fieldTree.hasPath(['animals', 'cats', 'stray', 'Bobby', 'goodBoy'])).toBe(false);
  });

});
