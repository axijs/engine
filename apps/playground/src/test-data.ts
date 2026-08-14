import {FieldsHydrator, FieldsSnapshotter, NodeFactory as f} from '@axi-engine/data';


export async function testNewScopeSystem() {

  const catTest = f.group({
    name: f.str('Little Jo'),
    head: f.num(1),
    paws: f.num(4),
    tail: f.num(1),
    hungry: f.bool(false),

    stats: f.group({
      hp: f.num(10),
      age: f.num(2),
      props: f.group({
        prop1: f.num(1),
        prop2: f.num(2),
        propOptions: f.group({})
      })
    })
  });

  const fieldsSnapshotter  = new FieldsSnapshotter();
  const fieldsHydrator = new FieldsHydrator();
  const catTestSnapshot = fieldsSnapshotter.snapshot(catTest);
  console.log('catTest snapshot: ', catTestSnapshot);

  const patchTest = f.group({
    name: f.str('Big Foo'),
    head: f.str('String Head'),

    stats: f.group({
      hp: f.num(23),
    }),

    passion: f.num(10),
    structure: f.group({
      constructionA: f.num(10),
      constructionB: f.num(20),
      structureGroup: f.group({
        itemA: f.str('hello'),
        itemB: f.num(1551666),
        itemC: f.bool(true),
      })
    })
  });

  console.log('Before Patch: ', structuredClone(patchTest));
  const patchRes = fieldsHydrator.patch(patchTest, catTestSnapshot);
  console.log('Path test', patchTest);
  console.log('patched fields: ', patchRes);

  // const store = new Store({group: catTest});
  //
  // store.onCreate<number>(['stats', 'hp'], (event) => {
  //   console.log(`'Hp' created:`, event);
  // });
  //
  // store.onChange<number>(['stats', 'hp'], (event) => {
  //   console.log(`'Hp' changed:`, event);
  // });
  //
  // const hpRef = store.getTypedRef<'numeric'>('numeric', ['stats', 'hp']);
  // console.log('hp ref val: ', hpRef.value);
  //
  // const readonlyHpRef = store.getReadonlyRef<number>(['stats', 'hp']);
  // console.log('readonly hp: ', readonlyHpRef.value);
  //
  // const autoRef: NumericFieldRef = store.getAutoRef<NumericFieldRef>(['stats', 'hp']);
  // console.log(autoRef.value);
  //
  // const numRef = store.createRef<NumericFieldRef>(['stats', 'test'], 50);
  // console.log(numRef);
  //
  // const anyRef = store.upsertRef(['stats', 'test2'], 'test');
  // console.log(anyRef);
  //
  // store.set(['stats', 'hp'], 25);
  // store.tick();
  //
  // store.set(['stats', 'hp'], 30);
  // store.tick();
  //
  // hpRef.inc(10);
  // store.tick();
}
