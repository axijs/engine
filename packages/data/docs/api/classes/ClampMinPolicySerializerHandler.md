[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / ClampMinPolicySerializerHandler

# Class: ClampMinPolicySerializerHandler

Defined in: data/src/serializers/policies/clamp-min-policy-serializer-handler.ts:5

Defines the contract for a handler that can serialize and deserialize a specific type of Policy.

## Implements

- [`PolicySerializerHandler`](../interfaces/PolicySerializerHandler.md)\<[`ClampMinPolicy`](ClampMinPolicy.md), \{ `min`: `number`; \}\>

## Constructors

### Constructor

> **new ClampMinPolicySerializerHandler**(): `ClampMinPolicySerializerHandler`

#### Returns

`ClampMinPolicySerializerHandler`

## Methods

### hydrate()

> **hydrate**(`data`): [`ClampMinPolicy`](ClampMinPolicy.md)

Defined in: data/src/serializers/policies/clamp-min-policy-serializer-handler.ts:10

Creates a new Policy instance from a plain object.

#### Parameters

##### data

###### min

`number`

#### Returns

[`ClampMinPolicy`](ClampMinPolicy.md)

A new instance of the Policy.

#### Implementation of

[`PolicySerializerHandler`](../interfaces/PolicySerializerHandler.md).[`hydrate`](../interfaces/PolicySerializerHandler.md#hydrate)

***

### snapshot()

> **snapshot**(`policy`): `object`

Defined in: data/src/serializers/policies/clamp-min-policy-serializer-handler.ts:6

Converts a Policy instance into a serializable plain object.

#### Parameters

##### policy

[`ClampMinPolicy`](ClampMinPolicy.md)

The Policy instance to serialize.

#### Returns

`object`

A plain object representing the policy's state.

##### min

> **min**: `number` = `policy.min`

#### Implementation of

[`PolicySerializerHandler`](../interfaces/PolicySerializerHandler.md).[`snapshot`](../interfaces/PolicySerializerHandler.md#snapshot)
