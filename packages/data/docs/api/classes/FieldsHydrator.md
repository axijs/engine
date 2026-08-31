[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / FieldsHydrator

# Class: FieldsHydrator

Defined in: packages/data/src/field-serializers/fields-hydrator.ts:24

## Constructors

### Constructor

> **new FieldsHydrator**(`options?`): `FieldsHydrator`

Defined in: packages/data/src/field-serializers/fields-hydrator.ts:30

#### Parameters

##### options?

[`FieldsHydratorOptions`](../interfaces/FieldsHydratorOptions.md)

#### Returns

`FieldsHydrator`

## Properties

### \_serializerRegistry

> `protected` **\_serializerRegistry**: `SerializerRegistry`

Defined in: packages/data/src/field-serializers/fields-hydrator.ts:27

***

### \_typeRegistry

> `protected` **\_typeRegistry**: [`FieldTypeRegistry`](FieldTypeRegistry.md)

Defined in: packages/data/src/field-serializers/fields-hydrator.ts:26

## Methods

### hydrate()

> **hydrate**(`snapshot`): [`FieldGroup`](../interfaces/FieldGroup.md)

Defined in: packages/data/src/field-serializers/fields-hydrator.ts:35

#### Parameters

##### snapshot

[`SerializedGroup`](../interfaces/SerializedGroup.md)

#### Returns

[`FieldGroup`](../interfaces/FieldGroup.md)

***

### patch()

> **patch**(`group`, `snapshot`): [`GroupPatchResult`](../interfaces/GroupPatchResult.md)

Defined in: packages/data/src/field-serializers/fields-hydrator.ts:48

should return diff - added, changed, deleted fields

#### Parameters

##### group

[`FieldGroup`](../interfaces/FieldGroup.md)

##### snapshot

[`SerializedGroup`](../interfaces/SerializedGroup.md)

#### Returns

[`GroupPatchResult`](../interfaces/GroupPatchResult.md)
