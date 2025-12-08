import {
  DefaultField,
  defaultFieldFactoryRegistry, DefaultTreeNodeFactory,
  DefaultNumericField,
  Fields,
  FieldTree, DefaultFields, FieldSerializer, DefaultBooleanField, DefaultStringField
} from '@axi-engine/fields';


export function testOneStringField() {

  const tree = new FieldTree(new DefaultTreeNodeFactory);
  const testChildTree = tree.createFieldTree(['test1', 'test2'], true);
  const heroFields = testChildTree.createFields<DefaultFields>('hero');
  const health = heroFields.createNumeric('health', 10, { min: 10, max: 100 });
  console.log(testChildTree);

  const heroObj = heroFields.create<number>('numbObj', 20);

  console.log('<!-- asdasdasd -->');

  console.log(health.constructor === DefaultNumericField);
  console.log(health.constructor === DefaultBooleanField);
  console.log(health.constructor === DefaultField);

  console.log(heroObj.constructor === DefaultNumericField);
  console.log(heroObj.constructor === DefaultBooleanField);
  console.log(heroObj.constructor === DefaultField);


  console.log('<!-- asdasdasd  1-->');
  console.log(FieldSerializer.snapshot(health));
  console.log('<!-- asdasdasd  2-->');

  const fields = new Fields(defaultFieldFactoryRegistry);
  fields.onAdd.subscribe((event)=> {
    console.log('add event:', event);
  });

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
