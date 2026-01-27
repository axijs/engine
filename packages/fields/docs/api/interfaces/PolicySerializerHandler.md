[**@axi-engine/fields**](../README.md)

***

[@axi-engine/fields](../README.md) / PolicySerializerHandler

# Interface: PolicySerializerHandler\<T, S\>

Defined in: fields/src/serializers/policy-serializer.ts:9

Defines the contract for a handler that can serialize and deserialize a specific type of Policy.

## Type Parameters

### T

`T` *extends* [`Policy`](Policy.md)\<`any`\>

The specific Policy class this handler manages.

### S

`S` *extends* `object`

The shape of the plain object this handler produces/consumes.

## Methods

### hydrate()

> **hydrate**(`snapshotData`): `T`

Defined in: fields/src/serializers/policy-serializer.ts:22

Creates a new Policy instance from a plain object.

#### Parameters

##### snapshotData

`S`

The plain object containing the policy's state.

#### Returns

`T`

A new instance of the Policy.

***

### snapshot()

> **snapshot**(`policy`): `S`

Defined in: fields/src/serializers/policy-serializer.ts:15

Converts a Policy instance into a serializable plain object.

#### Parameters

##### policy

`T`

The Policy instance to serialize.

#### Returns

`S`

A plain object representing the policy's state.
