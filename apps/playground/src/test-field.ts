import {BaseField, NumberField} from '@axi-engine/fields';

export function testOneStringField() {
  console.log('test one string field');

  const testField = new BaseField<string>('name', 'hello');

  console.log(testField.value);

  testField.set('hello 2');
  console.log(testField.value);
  testField.onChange.subscribe((name) => { console.log('onChange:', name) });

  testField.set('hello 3');
  console.log(testField.value);

  const numberF = new NumberField('number', 10);
  console.log(numberF.value);
}

