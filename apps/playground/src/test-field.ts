import {
  CoreField,
  CoreNumericField,
  Fields,
  CoreBooleanField, FieldRegistry, PolicySerializer, ClampPolicy,
  ClampPolicySerializerHandler, ClampMinPolicy, ClampMaxPolicySerializerHandler, ClampMinPolicySerializerHandler,
  ClampMaxPolicy, CoreStringField, FieldTreeSerializer, FieldSerializer, FieldsSerializer, CoreTreeNodeFactory
} from '@axi-engine/fields';


export function testOneStringField() {

  const policySerializer = new PolicySerializer();
  policySerializer.register(ClampPolicy.id, new ClampPolicySerializerHandler());
  policySerializer.register(ClampMinPolicy.id, new ClampMinPolicySerializerHandler());
  policySerializer.register(ClampMaxPolicy.id, new ClampMaxPolicySerializerHandler());

  const fieldRegistry = new FieldRegistry();
  fieldRegistry.register(CoreField.typeName, CoreField);
  fieldRegistry.register(CoreNumericField.typeName, CoreNumericField);
  fieldRegistry.register(CoreStringField.typeName, CoreStringField);
  fieldRegistry.register(CoreBooleanField.typeName, CoreBooleanField);

  const treeNodeFactory = new CoreTreeNodeFactory(fieldRegistry);

  const fieldSerializer = new FieldSerializer(fieldRegistry, policySerializer);
  const fieldsSerializer = new FieldsSerializer(treeNodeFactory, fieldSerializer);
  const treeSerializer = new FieldTreeSerializer(treeNodeFactory, fieldsSerializer);

  const tree = treeNodeFactory.tree();

  const heroFields = tree.createFields('hero');
  const health = heroFields.createNumeric('health', 10, { min: 10, max: 100 });
  const paramsTree = tree.createFieldTree('paramsTree');
  const params1 = paramsTree.createFields('params1');
  params1.createString('name', 'hero');
  params1.createNumeric('health', 10);
  params1.createNumeric('gold', 100);
  params1.createBoolean('alive', true);
  const genField = params1.createGeneric('gen', 'genField hello');
  console.log('genField value:', genField.value);

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

  const testField = new CoreField<string>('name', 'hello');
  console.log(testField.value);

  testField.value = 'hello 2';
  console.log(testField.value);
  testField.onChange.subscribe((name) => { console.log('onChange:', name) });

  testField.value = 'hello 3';
  console.log(testField.value);

  const numberF = new CoreNumericField('number', 10);
  console.log(numberF.value);
}

// let f = new Fields();
// f.createNumber('test', 10);
// console.log(f.getNumber('test').val);
