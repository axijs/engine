[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / StoreChangeBuffer

# Class: StoreChangeBuffer

Defined in: packages/data/src/store/store-change-buffer.ts:3

## Constructors

### Constructor

> **new StoreChangeBuffer**(): `StoreChangeBuffer`

#### Returns

`StoreChangeBuffer`

## Properties

### \_changed

> **\_changed**: `Map`\<`string`, \{ `oldValue`: `unknown`; `value`: `unknown`; \}\>

Defined in: packages/data/src/store/store-change-buffer.ts:5

***

### \_created

> **\_created**: `Map`\<`string`, `unknown`\>

Defined in: packages/data/src/store/store-change-buffer.ts:4

***

### \_deleted

> **\_deleted**: `Map`\<`string`, `unknown`\>

Defined in: packages/data/src/store/store-change-buffer.ts:6

## Methods

### changed()

> **changed**(`path`, `value`, `oldValue`): `void`

Defined in: packages/data/src/store/store-change-buffer.ts:12

#### Parameters

##### path

`string`

##### value

`unknown`

##### oldValue

`unknown`

#### Returns

`void`

***

### clear()

> **clear**(): `void`

Defined in: packages/data/src/store/store-change-buffer.ts:72

#### Returns

`void`

***

### created()

> **created**(`path`, `val`): `void`

Defined in: packages/data/src/store/store-change-buffer.ts:8

#### Parameters

##### path

`string`

##### val

`unknown`

#### Returns

`void`

***

### deleted()

> **deleted**(`path`, `val`): `void`

Defined in: packages/data/src/store/store-change-buffer.ts:16

#### Parameters

##### path

`string`

##### val

`unknown`

#### Returns

`void`

***

### getChangedPaths()

> **getChangedPaths**(): `string`[]

Defined in: packages/data/src/store/store-change-buffer.ts:48

#### Returns

`string`[]

***

### getChangedValue()

> **getChangedValue**(`path`): `object`

Defined in: packages/data/src/store/store-change-buffer.ts:61

#### Parameters

##### path

`string`

#### Returns

`object`

##### oldValue

> **oldValue**: `unknown`

##### value

> **value**: `unknown`

***

### getCreatedPaths()

> **getCreatedPaths**(): `string`[]

Defined in: packages/data/src/store/store-change-buffer.ts:44

#### Returns

`string`[]

***

### getCreatedValue()

> **getCreatedValue**(`path`): `unknown`

Defined in: packages/data/src/store/store-change-buffer.ts:57

#### Parameters

##### path

`string`

#### Returns

`unknown`

***

### getDeletedPaths()

> **getDeletedPaths**(): `string`[]

Defined in: packages/data/src/store/store-change-buffer.ts:52

#### Returns

`string`[]

***

### getDeletedValue()

> **getDeletedValue**(`path`): `unknown`

Defined in: packages/data/src/store/store-change-buffer.ts:68

#### Parameters

##### path

`string`

#### Returns

`unknown`

***

### hasChanged()

> **hasChanged**(`path`): `boolean`

Defined in: packages/data/src/store/store-change-buffer.ts:24

#### Parameters

##### path

`string`

#### Returns

`boolean`

***

### hasCreated()

> **hasCreated**(`path`): `boolean`

Defined in: packages/data/src/store/store-change-buffer.ts:20

#### Parameters

##### path

`string`

#### Returns

`boolean`

***

### hasDeleted()

> **hasDeleted**(`path`): `boolean`

Defined in: packages/data/src/store/store-change-buffer.ts:28

#### Parameters

##### path

`string`

#### Returns

`boolean`

***

### unsetChanged()

> **unsetChanged**(`path`): `boolean`

Defined in: packages/data/src/store/store-change-buffer.ts:36

#### Parameters

##### path

`string`

#### Returns

`boolean`

***

### unsetCreated()

> **unsetCreated**(`path`): `boolean`

Defined in: packages/data/src/store/store-change-buffer.ts:32

#### Parameters

##### path

`string`

#### Returns

`boolean`

***

### unsetDeleted()

> **unsetDeleted**(`path`): `boolean`

Defined in: packages/data/src/store/store-change-buffer.ts:40

#### Parameters

##### path

`string`

#### Returns

`boolean`
