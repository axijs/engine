import {FieldsHydrator, FieldsSnapshotter, GroupOps, NodeFactory as f} from '@axi-engine/data';


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

  console.log('collect path test: ', GroupOps.collectPaths(catTest));
  console.log('collect path str test: ', GroupOps.collectPathsStr(catTest));

  const fieldsSnapshotter  = new FieldsSnapshotter();
  const fieldsHydrator = new FieldsHydrator();
  const catTestSnapshot = fieldsSnapshotter.snapshot(catTest);
  console.log('catTest snapshot: ', catTestSnapshot);

  const patchTest = f.group({
    name: f.str('Big Foo'),
    head: f.str('String Head'),
    passion: f.num(10),
    structure: f.group({
      constructionA: f.num(10),
      constructionB: f.num(20)
    })
  });

  const patchRes = fieldsHydrator.patch(patchTest, catTestSnapshot);
  console.log('Path test', patchTest, patchRes);

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
