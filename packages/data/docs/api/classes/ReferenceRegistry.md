[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / ReferenceRegistry

# Class: ReferenceRegistry

Defined in: packages/data/src/reference-registry/reference-registry.ts:5

## Constructors

### Constructor

> **new ReferenceRegistry**(): `ReferenceRegistry`

#### Returns

`ReferenceRegistry`

## Properties

### registry

> **registry**: `Registry`\<keyof [`FieldReferences`](../interfaces/FieldReferences.md), [`ReferenceCreator`](../type-aliases/ReferenceCreator.md)\<`any`\>\>

Defined in: packages/data/src/reference-registry/reference-registry.ts:6

## Methods

### create()

> **create**\<`K`\>(`type`, `store`, `path`): [`FieldReferences`](../interfaces/FieldReferences.md)\[`K`\]

Defined in: packages/data/src/reference-registry/reference-registry.ts:12

#### Type Parameters

##### K

`K` *extends* keyof [`FieldReferences`](../interfaces/FieldReferences.md)

#### Parameters

##### type

`K`

##### store

[`StoreWithEvents`](../type-aliases/StoreWithEvents.md)

##### path

`PathType`

#### Returns

[`FieldReferences`](../interfaces/FieldReferences.md)\[`K`\]

***

### register()

> **register**(`name`, `creator`): `void`

Defined in: packages/data/src/reference-registry/reference-registry.ts:8

#### Parameters

##### name

keyof [`FieldReferences`](../interfaces/FieldReferences.md)

##### creator

[`ReferenceCreator`](../type-aliases/ReferenceCreator.md)\<`any`\>

#### Returns

`void`
