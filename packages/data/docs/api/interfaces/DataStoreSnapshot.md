[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / DataStoreSnapshot

# Interface: DataStoreSnapshot

Defined in: data/src/serializers/data-store-snapshot.ts:10

A plain object representation of a DataStore's state, used for serialization.

It captures both the detached 'flat' variables (used for stack frames/local scopes)
and the hierarchical 'tree' structure (used for global/persistent data).

## Properties

### \_\_type

> **\_\_type**: `string`

Defined in: data/src/serializers/data-store-snapshot.ts:15

The type identifier for the store (e.g., 'dataStore').
Used for type guards and polymorphic deserialization.

***

### tree?

> `optional` **tree**: [`FieldTreeSnapshot`](FieldTreeSnapshot.md)

Defined in: data/src/serializers/data-store-snapshot.ts:27

Snapshot of the nested data hierarchy (CoreFieldTree).
Present only if the store managed a complex tree structure.

***

### variables?

> `optional` **variables**: [`FieldsSnapshot`](FieldsSnapshot.md)

Defined in: data/src/serializers/data-store-snapshot.ts:21

Snapshot of the independent, root-level variables (CoreFields).
Present only if the store contained detached variables.
