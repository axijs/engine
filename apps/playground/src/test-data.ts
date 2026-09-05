import {DataReferences, GroupRef, NodeFactory as f, Store} from '@axi-engine/data';


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


  const store = new Store({group: catTest});
  const refs = new DataReferences(store);

  const groupRef = new GroupRef(refs);
  console.log(groupRef);

  store.tick();
}
