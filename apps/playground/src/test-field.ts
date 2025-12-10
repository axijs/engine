import {
  DefaultField,
  DefaultNumericField,
  Fields,
  FieldTree, DefaultFields, FieldSerializer, DefaultBooleanField, FieldRegistry, PolicySerializer, ClampPolicy,
  ClampPolicySerializerHandler, ClampMinPolicy, ClampMaxPolicySerializerHandler, ClampMinPolicySerializerHandler,
  ClampMaxPolicy, DefaultStringField, DefaultTreeNodeFactory, type DefaultNumericFieldOptions,
} from '@axi-engine/fields';


export function testOneStringField() {

  const fieldRegistry = new FieldRegistry();
  fieldRegistry.register(DefaultField.typeName, DefaultField);
  fieldRegistry.register(DefaultNumericField.typeName, DefaultNumericField);
  fieldRegistry.register(DefaultStringField.typeName, DefaultStringField);
  fieldRegistry.register(DefaultBooleanField.typeName, DefaultBooleanField);

  const tree = new FieldTree(new DefaultTreeNodeFactory(fieldRegistry));
  const testChildTree = tree.createFieldTree(['test1', 'test2'], true);
  const heroFields = testChildTree.createFields<DefaultFields>('hero');
  const health = heroFields.createNumeric('health', 10, { min: 10, max: 100 });
  console.log(testChildTree);

  const testGeneric = heroFields.createGeneric<number, DefaultNumericField, DefaultNumericFieldOptions>(DefaultNumericField, 'testGeneric', 10);
  console.log('testGeneric:', testGeneric.value, testGeneric.typeName);

  const policySerializer = new PolicySerializer();
  policySerializer.register(ClampPolicy.id, new ClampPolicySerializerHandler());
  policySerializer.register(ClampMinPolicy.id, new ClampMinPolicySerializerHandler());
  policySerializer.register(ClampMaxPolicy.id, new ClampMaxPolicySerializerHandler());

  const fieldSerializer = new FieldSerializer(fieldRegistry, policySerializer);

  const fieldSnapshot = fieldSerializer.snapshot(health);

  console.log('<!-- numeric field snapshot: -->');
  console.log(fieldSnapshot);
  console.log('<!-- numeric restored field: -->');
  console.log(fieldSerializer.hydrate(fieldSnapshot));


  const fields = new Fields(fieldRegistry);
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
