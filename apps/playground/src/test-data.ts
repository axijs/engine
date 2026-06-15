import {type FieldGroup, type StringField} from './data2/types.ts';
import {FieldFactory as f, TreeOps} from './data2/tools.ts';

interface StringRef {
  value: string;
}


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

  const proxy = new Proxy<StringField>(test2.items.name as StringField, {
    set: (obj, prop, value) => {
      if (prop === 'value') {
        console.log('target prop is value: ', value);
      }
      return Reflect.set(obj, prop, value);
    }
  }) as StringRef;

  console.log('proxy: ', proxy.value);
  proxy.value = 'Little Jo Big';
  console.log('proxy: ', proxy.value);

}
