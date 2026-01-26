[**@axi-engine/fields**](../README.md)

***

[@axi-engine/fields](../README.md) / FieldsSerializer

# Class: FieldsSerializer\<TFields\>

Defined in: fields/src/serializer/fields-serializer.ts:18

Orchestrates the serialization and deserialization of `Fields` container instances.

This class acts as a high-level composer, responsible for converting an entire `Fields` object
into a storable snapshot and back.
It delegates the actual serialization of each `Field` and `Policy` to their respective serializers.

## Todo

Implement a `patch(fields, snapshot)` method. It should perform a non-destructive
      update, creating new fields, removing missing ones, and patching existing ones
      in place, preserving the container instance itself.

## Type Parameters

### TFields

`TFields` *extends* [`Fields`](Fields.md)

## Constructors

### Constructor

> **new FieldsSerializer**\<`TFields`\>(`fieldsFactory`, `fieldSerializer`): `FieldsSerializer`\<`TFields`\>

Defined in: fields/src/serializer/fields-serializer.ts:24

Creates an instance of FieldsSerializer.

#### Parameters

##### fieldsFactory

[`FieldsFactory`](../interfaces/FieldsFactory.md)\<`TFields`\>

A registry that maps string type names to Field constructors.

##### fieldSerializer

[`FieldSerializer`](FieldSerializer.md)

A serializer of field instances.

#### Returns

`FieldsSerializer`\<`TFields`\>

## Methods

### hydrate()

> **hydrate**(`snapshot`): `TFields`

Defined in: fields/src/serializer/fields-serializer.ts:54

Restores a `Fields` container instance from its snapshot representation.

It iterates through the field snapshots and hydrates them individually, adding them to the new container.

#### Parameters

##### snapshot

[`FieldsSnapshot`](../interfaces/FieldsSnapshot.md)

The plain object snapshot to deserialize.

#### Returns

`TFields`

A new `DefaultFields` instance populated with the restored fields.

***

### snapshot()

> **snapshot**(`fields`): [`FieldsSnapshot`](../interfaces/FieldsSnapshot.md)

Defined in: fields/src/serializer/fields-serializer.ts:38

Creates a serializable snapshot of a `Fields` container.

The snapshot includes a `__type` identifier (currently hardcoded) and an array of snapshots
for each `Field` within the container.

#### Parameters

##### fields

[`Fields`](Fields.md)

The `Fields` instance to serialize.

#### Returns

[`FieldsSnapshot`](../interfaces/FieldsSnapshot.md)

A plain object ready for JSON serialization.
