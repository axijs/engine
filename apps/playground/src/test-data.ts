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
  const health = heroFields.createNumeric('health', 10, {min: 10, max: 100});
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
  fields.onAdd.subscribe((event) => {
    console.log('add event:', event);
  });

  console.log('test one string field');

  const testField = new CoreField<string>('name', 'hello');
  console.log(testField.value);

  testField.value = 'hello 2';
  console.log(testField.value);
  testField.onChange.subscribe((name) => {
    console.log('onChange:', name)
  });

  testField.value = 'hello 3';
  console.log(testField.value);

  const numberF = new CoreNumericField('number', 10);
  console.log(numberF.value);
}

export async function testScopeSystem() {
  const system = createCoreFieldSystem();
  const data = new CoreStore(system.factory);

  const rootScope: CoreScope = new CoreScope({data, name: 'root'});
  const scriptScope: CoreScope = rootScope.extend('script') as CoreScope;
  const unnamedScope: Scope = scriptScope.extend();
  const unnamedScriptScope: Scope = scriptScope.extend();

  /** check scope variables creation logic */
  rootScope.create(['counter'], 0);
  rootScope.create(['this', 'counterMin'], 0);
  rootScope.create(['root', 'counterMax'], 100);
  rootScope.create(['params', 'soundVolume'], 10);

  scriptScope.create(['herro', 'hp'], 0);
  console.log('has:', scriptScope.has(['herro', 'hp']));

  // console.log('-----> begin snap');
  // console.log(system.snapshotter.fieldsSnapshotter.snapshot(rootScope.data.getOrCreateInternalVariables()));
  // console.log(system.snapshotter.snapshot(rootScope.data.getOrCreateInternalTree()));
  // console.log(rootScope.data.getOrCreateInternalTree());
  // console.log('-----> end snap');

  try {  // should be error because 'greetings' variable didn't exist in scope chain
    unnamedScope.set('greetings', 'hello');
  } catch (e) {
    console.log(e);
  }

  try { // should be success
    console.log('herro hp:', unnamedScope.set(['herro', 'hp'], 100));
  } catch (e) {
    console.log(e);
  }

  console.log(`unnamedScope.get(['root', 'params', 'soundVolume']): `, unnamedScope.get(['root', 'params', 'soundVolume']));

  try {
    console.log(`unnamedScope.get(['params', 'soundVolume'])`, unnamedScope.get(['params', 'soundVolume']));
  } catch (e) {
    console.log(e);
  }

  console.log(unnamedScope.get<number>('counter'));
  console.log(unnamedScriptScope.get<number>('counter'));
}
