[**@axi-engine/fields**](../README.md)

***

[@axi-engine/fields](../README.md) / PolicySerializer

# Class: PolicySerializer

Defined in: fields/src/serializer/policy-serializer.ts:25

## Constructors

### Constructor

> **new PolicySerializer**(): `PolicySerializer`

#### Returns

`PolicySerializer`

## Properties

### handlers

> **handlers**: `Registry`\<`string`, [`PolicySerializerHandler`](../interfaces/PolicySerializerHandler.md)\<`any`, `any`\>\>

Defined in: fields/src/serializer/policy-serializer.ts:26

## Methods

### hydrate()

> **hydrate**(`snapshot`): [`Policy`](../interfaces/Policy.md)\<`any`\>

Defined in: fields/src/serializer/policy-serializer.ts:55

Restores a policy instance from its snapshot representation.

#### Parameters

##### snapshot

`any`

The plain object snapshot, which must contain a `__type` property.

#### Returns

[`Policy`](../interfaces/Policy.md)\<`any`\>

A new, fully functional policy instance.

#### Throws

If the snapshot is invalid or no handler is registered for its `__type`.

***

### register()

> **register**(`policyId`, `handler`): `void`

Defined in: fields/src/serializer/policy-serializer.ts:28

#### Parameters

##### policyId

`string`

##### handler

[`PolicySerializerHandler`](../interfaces/PolicySerializerHandler.md)\<`any`, `any`\>

#### Returns

`void`

***

### snapshot()

> **snapshot**(`policy`): `object`

Defined in: fields/src/serializer/policy-serializer.ts:39

Creates a serializable snapshot of a policy instance.
The snapshot includes the policy's state and a `__type` identifier.

#### Parameters

##### policy

[`Policy`](../interfaces/Policy.md)\<`any`\>

The policy instance to snapshot.

#### Returns

`object`

A plain object ready for JSON serialization.

#### Throws

If no handler is registered for the policy's ID.
