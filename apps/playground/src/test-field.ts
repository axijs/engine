import {
  DefaultField,
  DefaultNumericField,
  Fields,
  FieldTree, DefaultFields, DefaultBooleanField, FieldRegistry, PolicySerializer, ClampPolicy,
  ClampPolicySerializerHandler, ClampMinPolicy, ClampMaxPolicySerializerHandler, ClampMinPolicySerializerHandler,
  ClampMaxPolicy, DefaultStringField, DefaultTreeNodeFactory, FieldTreeSerializer, FieldSerializer, FieldsSerializer
} from '@axi-engine/fields';


export function testOneStringField() {

  const policySerializer = new PolicySerializer();
  policySerializer.register(ClampPolicy.id, new ClampPolicySerializerHandler());
  policySerializer.register(ClampMinPolicy.id, new ClampMinPolicySerializerHandler());
  policySerializer.register(ClampMaxPolicy.id, new ClampMaxPolicySerializerHandler());

  const fieldRegistry = new FieldRegistry();
  fieldRegistry.register(DefaultField.typeName, DefaultField);
  fieldRegistry.register(DefaultNumericField.typeName, DefaultNumericField);
  fieldRegistry.register(DefaultStringField.typeName, DefaultStringField);
  fieldRegistry.register(DefaultBooleanField.typeName, DefaultBooleanField);

  const treeNodeFactory = new DefaultTreeNodeFactory(fieldRegistry);

  const fieldSerializer = new FieldSerializer(fieldRegistry, policySerializer);
  const fieldsSerializer = new FieldsSerializer(fieldRegistry, policySerializer);
  const treeSerializer = new FieldTreeSerializer(treeNodeFactory, fieldsSerializer);

  const tree = new FieldTree(treeNodeFactory);

  const heroFields = tree.createFields<DefaultFields>('hero');
  const health = heroFields.createNumeric('health', 10, { min: 10, max: 100 });
  const paramsTree = tree.createFieldTree('paramsTree');
  const params1 = paramsTree.createFields<DefaultFields>('params1');
  params1.createString('name', 'hero');
  params1.createNumeric('health', 10);
  params1.createNumeric('gold', 100);
  params1.createBoolean('alive', true);

  const fieldSnapshot = fieldSerializer.snapshot(health);

  console.log('<!-- numeric field snapshot: -->');
  console.log(fieldSnapshot);
  console.log('<!-- numeric restored field: -->');
  console.log(fieldSerializer.hydrate(fieldSnapshot));

  const treeSnapshot = treeSerializer.snapshot(tree);
  console.log('<!-- tree snapshot -->');
  console.log(treeSnapshot);

  const restoredFieldTree = treeSerializer.hydrate(treeSnapshot);
  console.log('restored tree: ', restoredFieldTree);

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
