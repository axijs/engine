[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / ClampPolicySerializerHandler

# Class: ClampPolicySerializerHandler

Defined in: packages/data/src/fields/serializers/policies/clamp-policy-serializer-handler.ts:5

Defines the contract for a handler that can serialize and deserialize a specific type of Policy.

## Implements

- [`PolicySerializerHandler`](../interfaces/PolicySerializerHandler.md)\<[`ClampPolicy`](ClampPolicy.md), \{ `max`: `number`; `min`: `number`; \}\>

## Constructors

### Constructor

> **new ClampPolicySerializerHandler**(): `ClampPolicySerializerHandler`

#### Returns

`ClampPolicySerializerHandler`

## Methods

### hydrate()

> **hydrate**(`data`): [`ClampPolicy`](ClampPolicy.md)

Defined in: packages/data/src/fields/serializers/policies/clamp-policy-serializer-handler.ts:10

Creates a new Policy instance from a plain object.

#### Parameters

##### data

###### max

`number`

###### min

`number`

#### Returns

[`ClampPolicy`](ClampPolicy.md)

A new instance of the Policy.

#### Implementation of

[`PolicySerializerHandler`](../interfaces/PolicySerializerHandler.md).[`hydrate`](../interfaces/PolicySerializerHandler.md#hydrate)

***

### snapshot()

> **snapshot**(`policy`): `object`

Defined in: packages/data/src/fields/serializers/policies/clamp-policy-serializer-handler.ts:6

Converts a Policy instance into a serializable plain object.

#### Parameters

##### policy

[`ClampPolicy`](ClampPolicy.md)

The Policy instance to serialize.

#### Returns

`object`

A plain object representing the policy's state.

##### max

> **max**: `number` = `policy.max`

##### min

> **min**: `number` = `policy.min`

#### Implementation of

[`PolicySerializerHandler`](../interfaces/PolicySerializerHandler.md).[`snapshot`](../interfaces/PolicySerializerHandler.md#snapshot)
