[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / DataStoreHydrator

# Class: DataStoreHydrator

Defined in: packages/data/src/fields/serializers/data-store-hydrator.ts:11

## Constructors

### Constructor

> **new DataStoreHydrator**(`fieldsFieldTreeHydrator`): `DataStoreHydrator`

Defined in: packages/data/src/fields/serializers/data-store-hydrator.ts:16

Creates an instance of DataStoreSerializer.

#### Parameters

##### fieldsFieldTreeHydrator

[`FieldTreeHydrator`](FieldTreeHydrator.md)\<[`CoreFields`](CoreFields.md)\>

The serializer used for the underlying tree and fields.

#### Returns

`DataStoreHydrator`

## Methods

### hydrate()

> **hydrate**(`snapshot`): [`CoreStore`](CoreStore.md)

Defined in: packages/data/src/fields/serializers/data-store-hydrator.ts:29

Reconstructs a DataStore instance from a snapshot.

If the snapshot contains a tree, the store is initialized with it.
If not, the store is initialized with the factory (lazy mode), and the
detached variables are injected if present.

#### Parameters

##### snapshot

[`DataStoreSnapshot`](../interfaces/DataStoreSnapshot.md)

The snapshot to hydrate.

#### Returns

[`CoreStore`](CoreStore.md)

A new, fully restored DataStore instance.

***

### patch()

> **patch**(`store`, `snapshot`): `void`

Defined in: packages/data/src/fields/serializers/data-store-hydrator.ts:54

Synchronizes a DataStore instance with a snapshot.

This method ensures the DataStore's internal state matches the snapshot by:
1. **Destroying** internal containers (variables/tree) if they are missing in the snapshot.
2. **Patching** (updating/creating) contents if they exist in the snapshot.

This allows for a granular update where only specific parts of the store (e.g., only variables)
are modified if the snapshot contains partial data, or a full reset if parts are missing.

#### Parameters

##### store

[`CoreStore`](CoreStore.md)

The target DataStore to update.

##### snapshot

[`DataStoreSnapshot`](../interfaces/DataStoreSnapshot.md)

The source snapshot.

#### Returns

`void`
