import {DefaultField, defaultFieldFactoryRegistry, DefaultNumericField, Fields} from '@axi-engine/fields';

class a {
  name = 'im a';
  constructor() {
  }
}

class b {
  name = 'im b';
  constructor() {
  }
}

class c extends a {
  name = 'im c';
  constructor() {
    super();
  }

  get surname() {
    return 'a is my father';
  }
}


interface instBuilder {
  a(): a,
  b(): b,
}

interface instBuilder {
  a(): c
}

class instFactory implements instBuilder {
  a() {return new c }
  b() { return new b }
}

class System {
  factory: instBuilder = new instFactory;
  constructor() {
    // this.factory = factory;
  }

  a() {
    return this.factory.a();
  }
}

type Constructor<T = {}> = new (...args: any[]) => T;

export function addA<TBase extends Constructor<System>>(Base: TBase) {
  return class SystemWithA extends Base {
    a() {
      return this.factory.a();
    }
  };
}

export function addB<TBase extends Constructor<System>>(Base: TBase) {
  return class SystemWithB extends Base {
    b() {
      return this.factory.b();
    }
  };
}


export function testOneStringField() {

  const fields = new Fields(defaultFieldFactoryRegistry);
  fields.onAdd.subscribe((event)=> {
    console.log('add event:', event);
  });

  const sisConstr = addB(addA(System));
  const sis = new sisConstr();
  // const sis = new System();
  const a = sis.a();
  const b = sis.b();

  console.log('sis:', a.name, a.surname, b.name);

  console.log('test one string field');

  const testField = new DefaultField<string>('name', 'hello');
  console.log(testField.value);

  testField.value = 'hello 2';
  console.log(testField.value);
  testField.onChange.subscribe((name) => { console.log('onChange:', name) });

  testField.value = 'hello 3';
  console.log(testField.value);

  const numberF = new DefaultNumericField('number', 10);
  console.log(numberF.value);
}

// let f = new Fields();
// f.createNumber('test', 10);
// console.log(f.getNumber('test').val);
