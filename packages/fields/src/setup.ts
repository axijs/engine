import {FieldRegistry} from './field-registry';
import {
  ClampMaxPolicySerializerHandler,
  ClampMinPolicySerializerHandler,
  ClampPolicySerializerHandler,
  PolicySerializer
} from './serializer';
import {ClampMaxPolicy, ClampMinPolicy, ClampPolicy} from './policies';
import {CoreBooleanField, CoreField, CoreNumericField, CoreStringField} from './field-definitions';

export function createCoreFieldRegistry(): FieldRegistry {
  const fieldRegistry = new FieldRegistry();
  fieldRegistry.register(CoreField.typeName, CoreField);
  fieldRegistry.register(CoreNumericField.typeName, CoreNumericField);
  fieldRegistry.register(CoreStringField.typeName, CoreStringField);
  fieldRegistry.register(CoreBooleanField.typeName, CoreBooleanField);
  return fieldRegistry;
}

export function createCorePolicySerializer(): PolicySerializer {
  const policySerializer = new PolicySerializer();
  policySerializer.register(ClampPolicy.id, new ClampPolicySerializerHandler());
  policySerializer.register(ClampMinPolicy.id, new ClampMinPolicySerializerHandler());
  policySerializer.register(ClampMaxPolicy.id, new ClampMaxPolicySerializerHandler());
  return policySerializer;
}
