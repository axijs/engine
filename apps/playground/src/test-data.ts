import {NodeFactory as f} from './data2/fields';
import {createFieldTypeRegistry} from './data2';
import {Store} from './data2';


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

  store.onCreate<number>(['stats', 'hp'], (event) => {
    console.log(`'Hp' created:`, event);
  });

  store.onChange<number>(['stats', 'hp'], (event) => {
    console.log(`'Hp' changed:`, event);
  });

  const hpRef = store.getTypedRef<'numeric'>('numeric', ['stats', 'hp']);
  console.log('hp ref val: ', hpRef.value);

  const readonlyHpRef = store.getReadonlyRef<number>(['stats', 'hp']);
  console.log('readonly hp: ', readonlyHpRef.value);

  store.set(['stats', 'hp'], 25);
  store.tick();

  store.set(['stats', 'hp'], 30);
  store.tick();

  hpRef.inc(10);
  store.tick();
}
