[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / DataStoreSnapshotter

# Class: DataStoreSnapshotter

Defined in: packages/data/src/fields/serializers/data-store-snapshotter.ts:7

## Constructors

### Constructor

> **new DataStoreSnapshotter**(`treeSnapshotter`): `DataStoreSnapshotter`

Defined in: packages/data/src/fields/serializers/data-store-snapshotter.ts:12

Creates an instance of DataStoreSnapshotter.

#### Parameters

##### treeSnapshotter

[`FieldTreeSnapshotter`](FieldTreeSnapshotter.md)

The serializer used for the underlying tree and fields.

#### Returns

`DataStoreSnapshotter`

## Methods

### snapshot()

> **snapshot**(`store`): [`DataStoreSnapshot`](../interfaces/DataStoreSnapshot.md)

Defined in: packages/data/src/fields/serializers/data-store-snapshotter.ts:24

Captures the current state of a DataStore into a serializable snapshot.

It checks for the existence of internal variables and the internal tree,
serializing them only if they have been initialized (lazy serialization).

#### Parameters

##### store

[`CoreStore`](CoreStore.md)

The store instance to serialize.

#### Returns

[`DataStoreSnapshot`](../interfaces/DataStoreSnapshot.md)

The snapshot object.
