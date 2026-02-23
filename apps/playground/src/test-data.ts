import {
  CoreField,
  CoreNumericField,
  Fields,
  CoreBooleanField, FieldRegistry, PolicySerializer, ClampPolicy,
  ClampPolicySerializerHandler, ClampMinPolicy, ClampMaxPolicySerializerHandler, ClampMinPolicySerializerHandler,
  ClampMaxPolicy, CoreStringField, FieldTreeHydrator, FieldHydrator, FieldsHydrator, CoreTreeNodeFactory,
  createCoreFieldSystem, FieldSnapshotter, FieldsSnapshotter, FieldTreeSnapshotter, CoreStore, CoreScope, type Scope
} from '@axi-engine/data';


export async function testOneStringField() {
  const system = createCoreFieldSystem();
  console.log(system);

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

  const fieldHydrator = new FieldHydrator(fieldRegistry, policySerializer);
  const fieldsHydrator = new FieldsHydrator(treeNodeFactory, fieldHydrator);
  const treeHydrator = new FieldTreeHydrator(treeNodeFactory, fieldsHydrator);

  const fieldSnapshotter = new FieldSnapshotter(policySerializer);
  const fieldsSnapshotter = new FieldsSnapshotter(fieldSnapshotter);
  const treeSnapshotter = new FieldTreeSnapshotter(fieldsSnapshotter);

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

  const fieldSnapshot = fieldSnapshotter.snapshot(health);

  console.log('<!-- numeric field snapshot: -->');
  console.log(fieldSnapshot);
  console.log('<!-- numeric restored field: -->');
  console.log(fieldHydrator.hydrate(fieldSnapshot));

  const treeSnapshot = treeSnapshotter.snapshot(tree);
  console.log('<!-- tree snapshot -->');
  console.log(treeSnapshot);

  const restoredFieldTree = treeHydrator.hydrate(treeSnapshot);
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

export async function testScopeSystem() {
  const system = createCoreFieldSystem();
  const data = new CoreStore(system.factory);
  console.log(data.typeName);

  const scope: CoreScope = new CoreScope({data, name: 'root'});
  console.log('scope.name:', scope.name);

  const scriptScope: Scope = scope.extend('script');
  console.log('script scope name:', scriptScope.name);

  const unnamedScope: Scope = scriptScope.extend();
  console.log('unnamed scope name:', unnamedScope.name);

  const unnamedScriptScope: Scope = scriptScope.extend();
  console.log('unnamed script scope name:', unnamedScriptScope.name);

  /** check scope variables creation logic */
  scope.create(['counter'], 0);
  scope.create(['this', 'counterMin'], 0);
  scope.create(['root', 'counterMax'], 100);
  scope.create(['params','soundVolume'], 10);

  unnamedScope.set('greetings', 'hello');
  unnamedScope.set(['herro', 'hp'], 100);

  console.log(unnamedScope.get(['root', 'params','soundVolume']));

  // todo: need to test
  // set / get / upset / delete methods on simple and complex path
  // hierarchical assess to data, path resolving threes,
  //
  // unnamedScope.set('greetings', 'hello');

}
