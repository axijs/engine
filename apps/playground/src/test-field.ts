import {Field, NumberField} from '@axi-engine/fields';

export function testOneStringField() {
  console.log('test one string field');

  const testField = new Field<string>('name', 'hello');

  console.log(testField.val);

  testField.set('hello 2');
  console.log(testField.val);
  testField.onChange.subscribe((name) => { console.log('onChange:', name) });

  testField.set('hello 3');
  console.log(testField.val);

  const numberF = new NumberField('number', 10);
  console.log(numberF.val);
}

