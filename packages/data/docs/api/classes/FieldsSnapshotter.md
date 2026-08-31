[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / FieldsSnapshotter

# Class: FieldsSnapshotter

Defined in: packages/data/src/field-serializers/fields-snapshotter.ts:12

## Constructors

### Constructor

> **new FieldsSnapshotter**(`options?`): `FieldsSnapshotter`

Defined in: packages/data/src/field-serializers/fields-snapshotter.ts:16

#### Parameters

##### options?

[`FieldsSnapshotterOptions`](../interfaces/FieldsSnapshotterOptions.md)

#### Returns

`FieldsSnapshotter`

## Properties

### serializerRegistry

> `protected` **serializerRegistry**: `SerializerRegistry`

Defined in: packages/data/src/field-serializers/fields-snapshotter.ts:14

***

### typeRegistry

> `protected` **typeRegistry**: [`FieldTypeRegistry`](FieldTypeRegistry.md)

Defined in: packages/data/src/field-serializers/fields-snapshotter.ts:13

## Methods

### snapshot()

> **snapshot**(`group`): [`SerializedGroup`](../interfaces/SerializedGroup.md)

Defined in: packages/data/src/field-serializers/fields-snapshotter.ts:21

#### Parameters

##### group

[`FieldGroup`](../interfaces/FieldGroup.md)

#### Returns

[`SerializedGroup`](../interfaces/SerializedGroup.md)

***

### snapshotField()

> **snapshotField**(`field`): [`SerializedField`](../interfaces/SerializedField.md)

Defined in: packages/data/src/field-serializers/fields-snapshotter.ts:33

#### Parameters

##### field

[`Field`](../interfaces/Field.md)\<`any`\>

#### Returns

[`SerializedField`](../interfaces/SerializedField.md)
