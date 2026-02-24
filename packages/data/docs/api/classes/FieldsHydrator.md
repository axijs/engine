[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / FieldsHydrator

# Class: FieldsHydrator\<TFields\>

Defined in: packages/data/src/fields/serializers/fields-hydrator.ts:11

Deserialization of `Fields` container instances.
Responsible for converting snapshot of `Fields` object into a `Fields` instance.

## Type Parameters

### TFields

`TFields` *extends* [`Fields`](Fields.md)

## Constructors

### Constructor

> **new FieldsHydrator**\<`TFields`\>(`fieldsFactory`, `fieldHydrator`): `FieldsHydrator`\<`TFields`\>

Defined in: packages/data/src/fields/serializers/fields-hydrator.ts:17

Creates an instance of FieldsSerializer.

#### Parameters

##### fieldsFactory

[`FieldsFactory`](../interfaces/FieldsFactory.md)\<`TFields`\>

A registry that maps string type names to Field constructors.

##### fieldHydrator

[`FieldHydrator`](FieldHydrator.md)

A hydrator of field instances.

#### Returns

`FieldsHydrator`\<`TFields`\>

## Methods

### hydrate()

> **hydrate**(`snapshot`): `TFields`

Defined in: packages/data/src/fields/serializers/fields-hydrator.ts:30

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

### patch()

> **patch**(`fields`, `snapshot`): `void`

Defined in: packages/data/src/fields/serializers/fields-hydrator.ts:54

Synchronizes an existing `Fields` container with a snapshot.

This method performs a "smart update":
1. **Removes** fields from the container that are missing in the snapshot.
2. **Patches** existing fields in-place using [FieldHydrator.patch](FieldHydrator.md#patch), preserving object references.
3. **Creates** (hydrates) and adds new fields that exist in the snapshot but not in the container.

#### Parameters

##### fields

`TFields`

The target `Fields` container to update.

##### snapshot

[`FieldsSnapshot`](../interfaces/FieldsSnapshot.md)

The source snapshot containing the desired state.

#### Returns

`void`
