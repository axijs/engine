import {type FieldGroup} from './data2';
import {NodeFactory as f, GroupOps} from './data2/fields';
import {createFieldTypeRegistry} from './data2';
import {Store} from './data2/store.ts';

export async function testNewScopeSystem() {

  const fieldTypeRegistry = createFieldTypeRegistry();

  const catTest: FieldGroup = {
    type: 'group',
    items: {
      head: {type: 'numeric', value: 1},
      paws: {type: 'numeric', value: 4},
      tail: {type: 'numeric', value: 1},
      stats: {
        type: 'group',
        items: {}
      }
    }
  }

  console.log('test: ', catTest);

  const test2 = f.group({
    name: f.str('Little Jo'),
    head: f.num(1),
    paws: f.num(4),
    tail: f.num(1),
    hungry: f.bool(false),
    stats: f.group({
      hp: f.num(10),
      age: f.num(2)
    })
  });

  console.log('test2: ', test2);

  const store = new Store({
    group: catTest,
    typeRegistry: fieldTypeRegistry
  });

  try {
    store.set(['stats', 'mood'], '10');
  } catch (e) {
    console.log('valid error: ', e);
  }

  store.upsert(['stats', 'mood'], 10);
  console.log('mood field: ', store.get<number>(['stats', 'mood']));


  console.log('store reading test:',
    store.get('head'),
    store.get('tail'),
  );


  console.log('traverse test: ',
    GroupOps.traversePath(test2, 'name'),
    GroupOps.traversePath(test2, 'head'),
    GroupOps.traversePath(test2, ['stats', 'hp'])
  );
}
