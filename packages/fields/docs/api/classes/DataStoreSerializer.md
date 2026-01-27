[**@axi-engine/fields**](../README.md)

***

[@axi-engine/fields](../README.md) / DataStoreSerializer

# Class: DataStoreSerializer

Defined in: fields/src/serializer/data-store-serializer.ts:15

Handles the serialization and deserialization of DataStore instances.

This class ensures that both components of a DataStore (the detached variables
and the hierarchical tree) are correctly persisted and restored. It delegates
the actual serialization of the inner structures to the `FieldTreeSerializer`.

## Constructors

### Constructor

> **new DataStoreSerializer**(`fieldTreeSerializer`): `DataStoreSerializer`

Defined in: fields/src/serializer/data-store-serializer.ts:20

Creates an instance of DataStoreSerializer.

#### Parameters

##### fieldTreeSerializer

[`FieldTreeSerializer`](FieldTreeSerializer.md)\<[`CoreFields`](CoreFields.md)\>

The serializer used for the underlying tree and fields.

#### Returns

`DataStoreSerializer`

## Methods

### hydrate()

> **hydrate**(`snapshot`): [`DataStore`](DataStore.md)

Defined in: fields/src/serializer/data-store-serializer.ts:59

Reconstructs a DataStore instance from a snapshot.

If the snapshot contains a tree, the store is initialized with it.
If not, the store is initialized with the factory (lazy mode), and the
detached variables are injected if present.

#### Parameters

##### snapshot

[`DataStoreSnapshot`](../interfaces/DataStoreSnapshot.md)

The snapshot to hydrate.

#### Returns

[`DataStore`](DataStore.md)

A new, fully restored DataStore instance.

***

### snapshot()

> **snapshot**(`store`): [`DataStoreSnapshot`](../interfaces/DataStoreSnapshot.md)

Defined in: fields/src/serializer/data-store-serializer.ts:32

Captures the current state of a DataStore into a serializable snapshot.

It checks for the existence of internal variables and the internal tree,
serializing them only if they have been initialized (lazy serialization).

#### Parameters

##### store

[`DataStore`](DataStore.md)

The store instance to serialize.

#### Returns

[`DataStoreSnapshot`](../interfaces/DataStoreSnapshot.md)

The snapshot object.
