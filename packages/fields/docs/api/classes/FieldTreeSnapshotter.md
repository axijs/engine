[**@axi-engine/fields**](../README.md)

***

[@axi-engine/fields](../README.md) / FieldTreeSnapshotter

# Class: FieldTreeSnapshotter

Defined in: fields/src/serializers/field-tree-snapshotter.ts:10

## Constructors

### Constructor

> **new FieldTreeSnapshotter**(`fieldsSnapshotter`): `FieldTreeSnapshotter`

Defined in: fields/src/serializers/field-tree-snapshotter.ts:12

#### Parameters

##### fieldsSnapshotter

[`FieldsSnapshotter`](FieldsSnapshotter.md)

#### Returns

`FieldTreeSnapshotter`

## Properties

### fieldsSnapshotter

> `readonly` **fieldsSnapshotter**: [`FieldsSnapshotter`](FieldsSnapshotter.md)

Defined in: fields/src/serializers/field-tree-snapshotter.ts:12

## Methods

### snapshot()

> **snapshot**(`tree`): [`FieldTreeSnapshot`](../interfaces/FieldTreeSnapshot.md)

Defined in: fields/src/serializers/field-tree-snapshotter.ts:19

Creates a serializable snapshot of the entire tree and its contained fields.

#### Parameters

##### tree

[`CoreFieldTree`](CoreFieldTree.md)

#### Returns

[`FieldTreeSnapshot`](../interfaces/FieldTreeSnapshot.md)

A plain JavaScript object representing the complete state managed by this tree.
