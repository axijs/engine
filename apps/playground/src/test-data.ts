import {BooleanFieldRef, DataReferences, FieldsHydrator, FieldsSnapshotter, NumericFieldRef, Store, NodeFactory as f} from '@axi-engine/data';


export async function testDataSystem() {

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

  const fieldsSnapshotter = new FieldsSnapshotter();
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


  console.log('events after sub test');
  const store = new Store();
  const refs = new DataReferences(store);

  store.create(['test', 'hp'], 100);
  store.create(['test', 'isDead'], false);

  const hp: NumericFieldRef = refs.getAuto(['test', 'hp']);
  const isDead: BooleanFieldRef = refs.getAuto(['test', 'isDead']);
  hp.onChange((e) => {
    console.log('hp changed: ', e);
    if (e.value <= 0) {
      isDead.value = true;
    }
  });

  isDead.onChange((e) => console.log('isDead changed: ', e));

  console.log('--> before tick');
  console.log(store.changes.getCreatedPaths());
  console.log(store.changes.getChangedPaths());
  console.log(hp.value, isDead.value);

  hp.value = 0;
  store.tick();

  console.log('--> after tick');
  console.log(store.changes.getCreatedPaths());
  console.log(store.changes.getChangedPaths());  
  console.log(hp.value, isDead.value);
}
