[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / ReferenceSource

# Interface: ReferenceSource

Defined in: packages/data/src/references/reference-source.ts:5

## Methods

### createAndRef()

> **createAndRef**\<`R`\>(`path`, `value`): `R`

Defined in: packages/data/src/references/reference-source.ts:16

create field and return auto ref on it

#### Type Parameters

##### R

`R` *extends* [`FieldReference`](FieldReference.md)\<`any`\>

#### Parameters

##### path

`PathType`

##### value

`R`\[`"value"`\]

#### Returns

`R`

***

### get()

> **get**\<`K`\>(`type`, `path`): [`FieldReferences`](FieldReferences.md)\[`K`\]

Defined in: packages/data/src/references/reference-source.ts:7

#### Type Parameters

##### K

`K` *extends* keyof [`FieldReferences`](FieldReferences.md)

#### Parameters

##### type

`K`

##### path

`PathType`

#### Returns

[`FieldReferences`](FieldReferences.md)\[`K`\]

***

### getAuto()

> **getAuto**\<`T`\>(`path`): `T`

Defined in: packages/data/src/references/reference-source.ts:13

#### Type Parameters

##### T

`T` *extends* [`FieldReference`](FieldReference.md)\<`any`\>

#### Parameters

##### path

`PathType`

#### Returns

`T`

***

### getBase()

> **getBase**\<`T`\>(`path`): [`FieldReference`](FieldReference.md)\<`T`\>

Defined in: packages/data/src/references/reference-source.ts:9

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### path

`PathType`

#### Returns

[`FieldReference`](FieldReference.md)\<`T`\>

***

### getReadonly()

> **getReadonly**\<`T`\>(`path`): [`ReadonlyFieldReference`](ReadonlyFieldReference.md)\<`T`\>

Defined in: packages/data/src/references/reference-source.ts:11

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### path

`PathType`

#### Returns

[`ReadonlyFieldReference`](ReadonlyFieldReference.md)\<`T`\>

***

### upsertAndRef()

> **upsertAndRef**\<`R`\>(`path`, `value`): `R`

Defined in: packages/data/src/references/reference-source.ts:19

create or update field and return auto ref on it

#### Type Parameters

##### R

`R` *extends* [`FieldReference`](FieldReference.md)\<`any`\>

#### Parameters

##### path

`PathType`

##### value

`R`\[`"value"`\]

#### Returns

`R`
