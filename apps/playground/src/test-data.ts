import {NodeFactory as f} from './data2/fields';
import {createFieldTypeRegistry} from './data2';
import {Store} from './data2/store.ts';
import {FieldRef} from './data2/references/field-ref.ts';

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

  console.log('test: ', catTest);

  const store = new Store({
    group: catTest,
    typeRegistry: fieldTypeRegistry
  });

  store.onChange<number>(['stats', 'mood'], (event) => {
    console.log(`Field 'mood' changed:`, event);
  });

  store.onCreate<number>(['stats', 'mood'], (event) => {
    console.log(`Field 'mood' created:`, event);
  });

  store.onDelete<number>(['stats', 'mood'], (event) => {
    console.log(`Field 'mood' deleted:`, event);
  });

  store.onDelete<number>(['forDelete'], (event) => {
    console.log(`Field 'forDelete' deleted:`, event);
  });

  store.onDelete<number>(['forDelete', 'field1'], (event) => {
    console.log(`Field 'forDelete/field1' deleted:`, event);
  });

  /** computed fields test */
  store.onCreate<number>(['stats', 'hpWithAge'], (event) => {
    console.log(`Computed field 'hpWithAge' created:`, event);
  });

  store.onChange<number>(['stats', 'hpWithAge'], (event) => {
    console.log(`Computed field 'hpWithAge' changed:`, event);
  });


  store.upsert(['stats', 'mood'], 10);
  console.log('mood field: ', store.get<number>(['stats', 'mood']));

  console.log('store reading test:',
    store.get('head'),
    store.get('tail'),
  );

  store.upsert(['stats', 'mood'], 15);
  store.set(['stats', 'mood'], 20);
  store.delete(['stats', 'mood']);
  store.delete(['forDelete']);

  //
  console.log('ref tests ---->')
  const headRef = new FieldRef<number>(store, 'head');
  console.log('headRef: ', headRef.value);

  const nameRef = new FieldRef<string>(store, 'name');
  console.log('nameRef:', nameRef.value);

  nameRef.value = 'Little Jo Jo Junior';
  nameRef.onChange((e) => console.log('on name changed ref: ', e));

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

  // store.computedManager.computeOne(['stats', 'hpWithAge']);
  // store.computedManager.computeOne(['stats', 'hpWithAgeAndBonus']);

  console.log('hpWithAge: ', store.get(['stats', 'hpWithAge']));
  console.log('hpWithAgeAndBonus:', store.get(['stats', 'hpWithAgeAndBonus']));

  store.tick();
}
