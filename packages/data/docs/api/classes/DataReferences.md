[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / DataReferences

# Class: DataReferences

Defined in: packages/data/src/references/data-references.ts:10

## Implements

- [`ReferenceSource`](../interfaces/ReferenceSource.md)

## Constructors

### Constructor

> **new DataReferences**(`data`, `options?`): `DataReferences`

Defined in: packages/data/src/references/data-references.ts:16

#### Parameters

##### data

[`StoreWithEvents`](../type-aliases/StoreWithEvents.md)

##### options?

###### fieldTypeRegistry?

[`FieldTypeRegistry`](FieldTypeRegistry.md)

###### referenceRegistry?

[`ReferenceRegistry`](ReferenceRegistry.md)

#### Returns

`DataReferences`

## Properties

### data

> **data**: [`StoreWithEvents`](../type-aliases/StoreWithEvents.md)

Defined in: packages/data/src/references/data-references.ts:12

***

### fieldTypeRegistry

> **fieldTypeRegistry**: [`FieldTypeRegistry`](FieldTypeRegistry.md)

Defined in: packages/data/src/references/data-references.ts:13

***

### referenceRegistry

> **referenceRegistry**: [`ReferenceRegistry`](ReferenceRegistry.md)

Defined in: packages/data/src/references/data-references.ts:14

## Methods

### createAndRef()

> **createAndRef**\<`R`\>(`path`, `value`): `R`

Defined in: packages/data/src/references/data-references.ts:42

create field and return auto ref on it

#### Type Parameters

##### R

`R` *extends* [`FieldReference`](../interfaces/FieldReference.md)\<`any`\>

#### Parameters

##### path

`PathType`

##### value

`R`\[`"value"`\]

#### Returns

`R`

#### Implementation of

[`ReferenceSource`](../interfaces/ReferenceSource.md).[`createAndRef`](../interfaces/ReferenceSource.md#createandref)

***

### get()

> **get**\<`K`\>(`type`, `path`): [`FieldReferences`](../interfaces/FieldReferences.md)\[`K`\]

Defined in: packages/data/src/references/data-references.ts:25

#### Type Parameters

##### K

`K` *extends* keyof [`FieldReferences`](../interfaces/FieldReferences.md)

#### Parameters

##### type

`K`

##### path

`PathType`

#### Returns

[`FieldReferences`](../interfaces/FieldReferences.md)\[`K`\]

#### Implementation of

[`ReferenceSource`](../interfaces/ReferenceSource.md).[`get`](../interfaces/ReferenceSource.md#get)

***

### getAuto()

> **getAuto**\<`T`\>(`path`): `T`

Defined in: packages/data/src/references/data-references.ts:37

#### Type Parameters

##### T

`T` *extends* [`FieldReference`](../interfaces/FieldReference.md)\<`any`\>

#### Parameters

##### path

`PathType`

#### Returns

`T`

#### Implementation of

[`ReferenceSource`](../interfaces/ReferenceSource.md).[`getAuto`](../interfaces/ReferenceSource.md#getauto)

***

### getBase()

> **getBase**\<`T`\>(`path`): [`FieldReference`](../interfaces/FieldReference.md)\<`T`\>

Defined in: packages/data/src/references/data-references.ts:29

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### path

`PathType`

#### Returns

[`FieldReference`](../interfaces/FieldReference.md)\<`T`\>

#### Implementation of

[`ReferenceSource`](../interfaces/ReferenceSource.md).[`getBase`](../interfaces/ReferenceSource.md#getbase)

***

### getReadonly()

> **getReadonly**\<`T`\>(`path`): [`ReadonlyFieldReference`](../interfaces/ReadonlyFieldReference.md)\<`T`\>

Defined in: packages/data/src/references/data-references.ts:33

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### path

`PathType`

#### Returns

[`ReadonlyFieldReference`](../interfaces/ReadonlyFieldReference.md)\<`T`\>

#### Implementation of

[`ReferenceSource`](../interfaces/ReferenceSource.md).[`getReadonly`](../interfaces/ReferenceSource.md#getreadonly)

***

### upsertAndRef()

> **upsertAndRef**\<`R`\>(`path`, `value`): `R`

Defined in: packages/data/src/references/data-references.ts:47

create or update field and return auto ref on it

#### Type Parameters

##### R

`R` *extends* [`FieldReference`](../interfaces/FieldReference.md)\<`any`\>

#### Parameters

##### path

`PathType`

##### value

`R`\[`"value"`\]

#### Returns

`R`

#### Implementation of

[`ReferenceSource`](../interfaces/ReferenceSource.md).[`upsertAndRef`](../interfaces/ReferenceSource.md#upsertandref)
