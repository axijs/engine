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

  store.computed<number>(['stats', 'multiHp'], (get) => {
    return get<number>(['stats', 'hp']) * 10;
  });

  /** Computed test */
  // store.computed<number>(['stats', 'hpWithAge'], (get) => {
  //   const hp = get<number>(['stats', 'hp']);
  //   const age = get<number>(['stats', 'age']);
  //   return hp * age;
  // });

  // store.computed<number>(['stats', 'hpWithAgeAndBonus'], (get) => {
  //   return get<number>(['stats', 'hpWithAge']) * 10;
  // });

  // store.computed<string>(['stats', 'hpLabel'], (get) => {
  //   const hp = get<number>(['stats', 'hp']);
  //   const age = get<number>(['stats', 'age']);
  //   const hpWithAge = get<number>(['stats', 'hpWithAge']);
  //   return `HP: ${hp} / Age: ${age}, hpWithAge: ${hpWithAge}`;
  // });
  //
  // store.computed<string>(['stats', 'hpLabelDeepTest'], (get) => {
  //   const hp = get<number>(['stats', 'hp']);
  //   const hpWithAge = get<number>(['stats', 'hpWithAge']);
  //   const hpWithAgeAndBonus = get<number>(['stats', 'hpWithAgeAndBonus']);
  //   return `HP: ${hp} / hpWithAge: ${hpWithAge}, hpWithAgeAndBonus: ${hpWithAgeAndBonus}`;
  // });

  store.onCreate<number>(['stats', 'multiHp'], (event) => {
    console.log(`'multiHp' created:`, event);
  });

  store.onChange<number>(['stats', 'multiHp'], (event) => {
    console.log(`'multiHp' changed:`, event);
  });

  // store.onCreate<number>(['stats', 'hpWithAge'], (event) => {
  //   console.log(`'hpWithAge' created:`, event);
  // });
  //
  // store.onChange<number>(['stats', 'hpWithAge'], (event) => {
  //   console.log(`'hpWithAge' changed:`, event);
  // });

  // store.onCreate(['stats', 'hpWithAgeLabel'], e => {
  //   console.log(`'hpWithAgeLabel' created:`, e);
  // });
  //
  // store.onChange(['stats', 'hpWithAgeLabel'], e => {
  //   console.log(`'hpWithAgeLabel' changed:`, e);
  // });

  store.set(['stats', 'hp'], 25);
  store.tick();

  store.set(['stats', 'hp'], 30);
  store.tick();
}
