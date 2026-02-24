[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / FieldSnapshotter

# Class: FieldSnapshotter

Defined in: packages/data/src/fields/serializers/field-snapshotter.ts:5

## Constructors

### Constructor

> **new FieldSnapshotter**(`policySerializer`): `FieldSnapshotter`

Defined in: packages/data/src/fields/serializers/field-snapshotter.ts:6

#### Parameters

##### policySerializer

[`PolicySerializer`](PolicySerializer.md)

#### Returns

`FieldSnapshotter`

## Properties

### policySerializer

> `readonly` **policySerializer**: [`PolicySerializer`](PolicySerializer.md)

Defined in: packages/data/src/fields/serializers/field-snapshotter.ts:6

## Methods

### snapshot()

> **snapshot**(`field`): [`FieldSnapshot`](../interfaces/FieldSnapshot.md)

Defined in: packages/data/src/fields/serializers/field-snapshotter.ts:15

Creates a serializable snapshot of a Field instance.
The snapshot includes the field's type, name, current value, and the state of all its policies.

#### Parameters

##### field

[`Field`](../interfaces/Field.md)\<`any`\>

The Field instance to serialize.

#### Returns

[`FieldSnapshot`](../interfaces/FieldSnapshot.md)

A plain object ready for JSON serialization.
