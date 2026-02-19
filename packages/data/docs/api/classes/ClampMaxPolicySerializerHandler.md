[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / ClampMaxPolicySerializerHandler

# Class: ClampMaxPolicySerializerHandler

Defined in: data/src/serializers/policies/clamp-max-policy-serializer-handler.ts:4

Defines the contract for a handler that can serialize and deserialize a specific type of Policy.

## Implements

- [`PolicySerializerHandler`](../interfaces/PolicySerializerHandler.md)\<[`ClampMaxPolicy`](ClampMaxPolicy.md), \{ `max`: `number`; \}\>

## Constructors

### Constructor

> **new ClampMaxPolicySerializerHandler**(): `ClampMaxPolicySerializerHandler`

#### Returns

`ClampMaxPolicySerializerHandler`

## Methods

### hydrate()

> **hydrate**(`data`): [`ClampMaxPolicy`](ClampMaxPolicy.md)

Defined in: data/src/serializers/policies/clamp-max-policy-serializer-handler.ts:9

Creates a new Policy instance from a plain object.

#### Parameters

##### data

###### max

`number`

#### Returns

[`ClampMaxPolicy`](ClampMaxPolicy.md)

A new instance of the Policy.

#### Implementation of

[`PolicySerializerHandler`](../interfaces/PolicySerializerHandler.md).[`hydrate`](../interfaces/PolicySerializerHandler.md#hydrate)

***

### snapshot()

> **snapshot**(`policy`): `object`

Defined in: data/src/serializers/policies/clamp-max-policy-serializer-handler.ts:5

Converts a Policy instance into a serializable plain object.

#### Parameters

##### policy

[`ClampMaxPolicy`](ClampMaxPolicy.md)

The Policy instance to serialize.

#### Returns

`object`

A plain object representing the policy's state.

##### max

> **max**: `number` = `policy.max`

#### Implementation of

[`PolicySerializerHandler`](../interfaces/PolicySerializerHandler.md).[`snapshot`](../interfaces/PolicySerializerHandler.md#snapshot)
