[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / CoreStoreFactory

# Class: CoreStoreFactory

Defined in: packages/data/src/store/core-store-factory.ts:4

## Constructors

### Constructor

> **new CoreStoreFactory**(`treeFactory`): `CoreStoreFactory`

Defined in: packages/data/src/store/core-store-factory.ts:5

#### Parameters

##### treeFactory

[`FieldTreeFactory`](../interfaces/FieldTreeFactory.md)\<[`CoreFields`](CoreFields.md)\>

#### Returns

`CoreStoreFactory`

## Methods

### create()

> **create**(`treeOrFactory?`, `variables?`): [`CoreStore`](CoreStore.md)

Defined in: packages/data/src/store/core-store-factory.ts:8

#### Parameters

##### treeOrFactory?

[`CoreFieldTree`](CoreFieldTree.md) | [`FieldTreeFactory`](../interfaces/FieldTreeFactory.md)\<[`CoreFields`](CoreFields.md)\>

##### variables?

[`CoreFields`](CoreFields.md)

#### Returns

[`CoreStore`](CoreStore.md)
