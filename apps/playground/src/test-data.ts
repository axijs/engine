import {type FieldGroup} from './data2/types.ts';
import {FieldFactory as f, TreeOps} from './data2/tools.ts';

export async function testNewScopeSystem() {

  const catTest: FieldGroup = {
    type: 'group',
    items: {
      head: {type: 'number', value: 1},
      paws: {type: 'number', value: 4},
      tail: {type: 'number', value: 1},
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


  console.log('traverse test: ',
    TreeOps.traversePath(test2, 'name'),
    TreeOps.traversePath(test2, 'head'),
    TreeOps.traversePath(test2, ['stats', 'hp'])
  );

  console.log(test2.items['boo']);
}
