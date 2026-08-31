[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / StoreHydrator

# Class: StoreHydrator

Defined in: packages/data/src/store-serializers/store-hydrator.ts:6

## Constructors

### Constructor

> **new StoreHydrator**(`hydrator?`): `StoreHydrator`

Defined in: packages/data/src/store-serializers/store-hydrator.ts:9

#### Parameters

##### hydrator?

[`FieldsHydrator`](FieldsHydrator.md)

#### Returns

`StoreHydrator`

## Properties

### hydrator

> **hydrator**: [`FieldsHydrator`](FieldsHydrator.md)

Defined in: packages/data/src/store-serializers/store-hydrator.ts:7

## Methods

### hydrate()

> **hydrate**(`snapshot`, `typeRegistry?`): [`Store`](Store.md)

Defined in: packages/data/src/store-serializers/store-hydrator.ts:13

#### Parameters

##### snapshot

[`SerializedStore`](../interfaces/SerializedStore.md)

##### typeRegistry?

[`FieldTypeRegistry`](FieldTypeRegistry.md)

#### Returns

[`Store`](Store.md)

***

### patch()

> **patch**(`store`, `snapshot`): `void`

Defined in: packages/data/src/store-serializers/store-hydrator.ts:20

#### Parameters

##### store

[`Store`](Store.md)

##### snapshot

[`SerializedStore`](../interfaces/SerializedStore.md)

#### Returns

`void`
