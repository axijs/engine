import {FieldRegistry} from './fields';
import {
  ClampMaxPolicySerializerHandler,
  ClampMinPolicySerializerHandler,
  ClampPolicySerializerHandler, FieldHydrator, FieldsHydrator, FieldSnapshotter,
  FieldsSnapshotter, FieldTreeHydrator, FieldTreeSnapshotter,
  PolicySerializer
} from './fields';
import {ClampMaxPolicy, ClampMinPolicy, ClampPolicy} from './fields';
import {CoreBooleanField, CoreField, CoreNumericField, CoreStringField} from './fields';
import {CoreFields} from './fields';
import {CoreTreeNodeFactory} from './fields';
import {CoreStoreFactory, DataStoreHydrator, DataStoreSnapshotter} from './store';


/**
 * Creates and configures a FieldRegistry with all the core field types.
 * @returns {FieldRegistry} A pre-configured FieldRegistry instance.
 */
export function createCoreFieldRegistry(): FieldRegistry {
  const fieldRegistry = new FieldRegistry();
  fieldRegistry.register(CoreField.typeName, CoreField);
  fieldRegistry.register(CoreNumericField.typeName, CoreNumericField);
  fieldRegistry.register(CoreStringField.typeName, CoreStringField);
  fieldRegistry.register(CoreBooleanField.typeName, CoreBooleanField);
  return fieldRegistry;
}

/**
 * Creates and configures a PolicySerializer with handlers for core policies.
 * @returns {PolicySerializer} A pre-configured PolicySerializer instance.
 */
export function createCorePolicySerializer(): PolicySerializer {
  const policySerializer = new PolicySerializer();
  policySerializer.register(ClampPolicy.id, new ClampPolicySerializerHandler());
  policySerializer.register(ClampMinPolicy.id, new ClampMinPolicySerializerHandler());
  policySerializer.register(ClampMaxPolicy.id, new ClampMaxPolicySerializerHandler());
  return policySerializer;
}

/**
 * Creates a factory for CoreFieldTree and CoreFields nodes.
 * @param {FieldRegistry} fieldRegistry - The registry to be used by the factory.
 * @returns {CoreTreeNodeFactory} A new CoreTreeNodeFactory instance.
 */
export function createCoreTreeNodeFactory(fieldRegistry: FieldRegistry): CoreTreeNodeFactory {
  return new CoreTreeNodeFactory(fieldRegistry);
}

/**
 * Creates a fully configured serializer for a FieldTree.
 * This function composes all necessary serializers (FieldTree, Fields, Field) for a complete setup.
 * @param {CoreTreeNodeFactory} fieldTreeNodeFactory - The factory used to create new tree nodes during deserialization.
 * @param policySerializer
 * @returns {FieldTreeHydrator<CoreFields>} A top-level serializer for the entire field tree.
 */
export function createCoreTreeHydrator(
  fieldTreeNodeFactory: CoreTreeNodeFactory,
  policySerializer?: PolicySerializer
): FieldTreeHydrator<CoreFields> {
  return new FieldTreeHydrator(
    fieldTreeNodeFactory,
    new FieldsHydrator(
      fieldTreeNodeFactory,
      new FieldHydrator(fieldTreeNodeFactory.fieldRegistry, policySerializer ?? createCorePolicySerializer())
    )
  );
}

export function createCoreTreeSnapshotter(policySerializer?: PolicySerializer) {
  return new FieldTreeSnapshotter(
    new FieldsSnapshotter(
      new FieldSnapshotter(policySerializer ?? createCorePolicySerializer())
    )
  )
}

export type CoreFieldSystem = {
  factory: CoreTreeNodeFactory,
  hydrator: FieldTreeHydrator<CoreFields>,
  snapshotter: FieldTreeSnapshotter
};

export interface CoreFieldSystemConfig {
  registry?: FieldRegistry,
  policySerializer?: PolicySerializer
}

/**
 * Initializes the low-level field infrastructure.
 * Wires together the factory, hydrator (loader), and snapshotter (saver)
 * using default or provided configurations.
 *
 * @param config Configuration for the field system.
 * @returns {CoreFieldSystem} A bundle of services for managing FieldTrees.
 */
export function createCoreFieldSystem(config?: CoreFieldSystemConfig): CoreFieldSystem {
  const registry = config?.registry ?? createCoreFieldRegistry();
  const factory = createCoreTreeNodeFactory(registry);
  const policySerializer = config?.policySerializer ?? createCorePolicySerializer();

  return {
    factory,
    hydrator: createCoreTreeHydrator(factory, policySerializer),
    snapshotter: createCoreTreeSnapshotter(policySerializer),
  };
}

export type CoreStoreSystem = {
  factory: CoreStoreFactory,
  hydrator: DataStoreHydrator,
  snapshotter: DataStoreSnapshotter
}

/**
 * Initializes the high-level DataStore infrastructure.
 * Creates the store factory and serialization services based on the provided field system.
 *
 * @param fieldsSystem The initialized low-level field system.
 * @returns {CoreStoreSystem} A bundle of services for creating and managing DataStores.
 */
export function createCoreStoreSystem(fieldsSystem: CoreFieldSystem): CoreStoreSystem {
  return {
    factory: new CoreStoreFactory(fieldsSystem.factory),
    hydrator: new DataStoreHydrator(fieldsSystem.hydrator),
    snapshotter: new DataStoreSnapshotter(fieldsSystem.snapshotter)
  }
}
