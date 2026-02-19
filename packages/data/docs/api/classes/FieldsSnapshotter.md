[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / FieldsSnapshotter

# Class: FieldsSnapshotter

Defined in: data/src/serializers/fields-snapshotter.ts:11

The serialization of `Fields` container instances.

This class responsible for converting an entire `Fields` object
into a storable snapshot.

## Constructors

### Constructor

> **new FieldsSnapshotter**(`fieldSnapshotter`): `FieldsSnapshotter`

Defined in: data/src/serializers/fields-snapshotter.ts:16

Creates an instance of FieldsSnapshotter.

#### Parameters

##### fieldSnapshotter

[`FieldSnapshotter`](FieldSnapshotter.md)

A serializer of field instances.

#### Returns

`FieldsSnapshotter`

## Methods

### snapshot()

> **snapshot**(`fields`): [`FieldsSnapshot`](../interfaces/FieldsSnapshot.md)

Defined in: data/src/serializers/fields-snapshotter.ts:26

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
