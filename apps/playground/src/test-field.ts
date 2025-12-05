import {DefaultField, DefaultNumericField} from '@axi-engine/fields';

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
}

type Constructor<T = {}> = new (...args: any[]) => T;

export function testMixin<TBase extends Constructor<System>>(Base: TBase) {
  return class Test extends Base {
    a() {
      return this.factory.a();
    }
  };
}



export function testOneStringField() {

  const sisConstr = testMixin(System);
  const sis = new sisConstr();
  const a = sis.a();

  console.log('sis:', a.name, a.surname, typeof a);

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
