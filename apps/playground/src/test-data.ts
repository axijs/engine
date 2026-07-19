import {NodeFactory as f} from './data2/fields';
import {createFieldTypeRegistry} from './data2';
import {Store} from './data2/store.ts';


export async function testNewScopeSystem() {

  const fieldTypeRegistry = createFieldTypeRegistry();

  const catTest = f.group({
    name: f.str('Little Jo'),
    head: f.num(1),
    paws: f.num(4),
    tail: f.num(1),
    hungry: f.bool(false),

    stats: f.group({
      hp: f.num(10),
      age: f.num(2)
    }),

    forDelete: f.group({
      field1: f.num(10),
      group1: f.group({
        group2: f.group({
          g2f1: f.num(10),
          g2f2: f.str('abra')
        })
      })
    })
  });

  const store = new Store({
    group: catTest,
    typeRegistry: fieldTypeRegistry
  });

  // store.upsert(['stats', 'mood'], 10);
  // store.upsert(['stats', 'mood'], 15);
  // store.set(['stats', 'mood'], 20);
  // store.delete(['stats', 'mood']);
  // store.delete(['forDelete']);

  /** Computed test */
  store.computed<number>(['stats', 'hpWithAge'], {
    dependencies: [['stats', 'hp'], ['stats', 'age']], compute: (hp: number, age: number) => {
      return hp * age;
    }
  });

  store.computed<number>(['stats', 'hpWithAgeAndBonus'], {
    dependencies: [['stats', 'hpWithAge']], compute: (val: number) => {
      return val * 10;
    }
  });

  store.computed<string>(['stats', 'hpWithAgeLabel'], {
    dependencies: [['stats', 'hpWithAge']], compute: (val: number) => {
      return 'HP With Age: ' + val;
    }
  });

  store.onCreate<number>(['stats', 'hpWithAge'], (event) => {
    console.log(`'hpWithAge' created:`, event);
  });

  store.onChange<number>(['stats', 'hpWithAge'], (event) => {
    console.log(`'hpWithAge' changed:`, event);
  });

  store.onCreate(['stats', 'hpWithAgeLabel'], e => {
    console.log(`'hpWithAgeLabel' created:`, e);
  });

  store.onChange(['stats', 'hpWithAgeLabel'], e => {
    console.log(`'hpWithAgeLabel' changed:`, e);
  });

  store.set(['stats', 'hp'], 25);
  store.set(['stats', 'hp'], 30);

  store.tick();

  console.log(store.getGroup());

}
