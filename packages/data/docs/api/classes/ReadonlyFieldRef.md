[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / ReadonlyFieldRef

# Class: ReadonlyFieldRef\<T\>

Defined in: packages/data/src/references/readonly-field-ref.ts:6

Represents a wrapper for a specific data node.

## Extended by

- [`FieldRef`](FieldRef.md)

## Type Parameters

### T

`T`

The type of the value stored in the field.

## Implements

- [`ReadonlyFieldReference`](../interfaces/ReadonlyFieldReference.md)\<`T`\>

## Constructors

### Constructor

> **new ReadonlyFieldRef**\<`T`\>(`store`, `path`): `ReadonlyFieldRef`\<`T`\>

Defined in: packages/data/src/references/readonly-field-ref.ts:24

#### Parameters

##### store

[`StoreWithEvents`](../type-aliases/StoreWithEvents.md)

##### path

`PathType`

#### Returns

`ReadonlyFieldRef`\<`T`\>

## Properties

### \_path

> `readonly` **\_path**: `string`

Defined in: packages/data/src/references/readonly-field-ref.ts:9

***

### \_pathArr

> `readonly` **\_pathArr**: `string`[]

Defined in: packages/data/src/references/readonly-field-ref.ts:10

***

### \_store

> `readonly` **\_store**: [`StoreWithEvents`](../type-aliases/StoreWithEvents.md)

Defined in: packages/data/src/references/readonly-field-ref.ts:8

## Accessors

### path

#### Get Signature

> **get** **path**(): `string`

Defined in: packages/data/src/references/readonly-field-ref.ts:12

##### Returns

`string`

#### Implementation of

[`ReadonlyFieldReference`](../interfaces/ReadonlyFieldReference.md).[`path`](../interfaces/ReadonlyFieldReference.md#path)

***

### pathArr

#### Get Signature

> **get** **pathArr**(): `string`[]

Defined in: packages/data/src/references/readonly-field-ref.ts:16

##### Returns

`string`[]

#### Implementation of

[`ReadonlyFieldReference`](../interfaces/ReadonlyFieldReference.md).[`pathArr`](../interfaces/ReadonlyFieldReference.md#patharr)

***

### value

#### Get Signature

> **get** **value**(): `T`

Defined in: packages/data/src/references/readonly-field-ref.ts:20

The current value of the field.

##### Returns

`T`

The current value of the field.

#### Implementation of

[`ReadonlyFieldReference`](../interfaces/ReadonlyFieldReference.md).[`value`](../interfaces/ReadonlyFieldReference.md#value)

## Methods

### onChange()

> **onChange**(`listener`): `Unsubscribable`

Defined in: packages/data/src/references/readonly-field-ref.ts:30

#### Parameters

##### listener

`ChangeFieldListener`\<`T`\>

#### Returns

`Unsubscribable`

#### Implementation of

[`ReadonlyFieldReference`](../interfaces/ReadonlyFieldReference.md).[`onChange`](../interfaces/ReadonlyFieldReference.md#onchange)

***

### onDelete()

> **onDelete**(`listener`): `Unsubscribable`

Defined in: packages/data/src/references/readonly-field-ref.ts:34

#### Parameters

##### listener

`DeleteNodeListener`\<`T`\>

#### Returns

`Unsubscribable`

#### Implementation of

[`ReadonlyFieldReference`](../interfaces/ReadonlyFieldReference.md).[`onDelete`](../interfaces/ReadonlyFieldReference.md#ondelete)

***

### unsubscribeOnChange()

> **unsubscribeOnChange**(`listener`): `void`

Defined in: packages/data/src/references/readonly-field-ref.ts:38

#### Parameters

##### listener

`ChangeFieldListener`\<`T`\>

#### Returns

`void`

#### Implementation of

[`ReadonlyFieldReference`](../interfaces/ReadonlyFieldReference.md).[`unsubscribeOnChange`](../interfaces/ReadonlyFieldReference.md#unsubscribeonchange)

***

### unsubscribeOnDelete()

> **unsubscribeOnDelete**(`listener`): `void`

Defined in: packages/data/src/references/readonly-field-ref.ts:42

#### Parameters

##### listener

`DeleteNodeListener`\<`T`\>

#### Returns

`void`

#### Implementation of

[`ReadonlyFieldReference`](../interfaces/ReadonlyFieldReference.md).[`unsubscribeOnDelete`](../interfaces/ReadonlyFieldReference.md#unsubscribeondelete)
