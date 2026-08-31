[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / StringFieldReference

# Interface: StringFieldReference

Defined in: packages/data/src/references/field-reference.ts:61

## Extends

- [`FieldReference`](FieldReference.md)\<`string`\>

## Properties

### path

> `readonly` **path**: `string`

Defined in: packages/data/src/references/field-reference.ts:9

#### Inherited from

[`FieldReference`](FieldReference.md).[`path`](FieldReference.md#path)

***

### pathArr

> `readonly` **pathArr**: `string`[]

Defined in: packages/data/src/references/field-reference.ts:10

#### Inherited from

[`FieldReference`](FieldReference.md).[`pathArr`](FieldReference.md#patharr)

***

### value

> **value**: `string`

Defined in: packages/data/src/references/field-reference.ts:30

Assigning a new value triggers policies and emits the `onChange` event
if the value is different from the current one.

#### Inherited from

[`FieldReference`](FieldReference.md).[`value`](FieldReference.md#value)

## Methods

### append()

> **append**(`str`): `this`

Defined in: packages/data/src/references/field-reference.ts:67

Appends a string or number to the end of the current value.

#### Parameters

##### str

The value to append.

`string` | `number`

#### Returns

`this`

The field instance for chaining.

***

### clear()

> **clear**(): `void`

Defined in: packages/data/src/references/field-reference.ts:91

Sets the value to an empty string.

#### Returns

`void`

***

### isEmpty()

> **isEmpty**(): `boolean`

Defined in: packages/data/src/references/field-reference.ts:86

Checks if the current string is empty (length is 0).

#### Returns

`boolean`

`true` if the string is empty, otherwise `false`.

***

### onChange()

> **onChange**(`listener`): `void`

Defined in: packages/data/src/references/field-reference.ts:16

#### Parameters

##### listener

`ChangeFieldListener`\<`string`\>

#### Returns

`void`

#### Inherited from

[`FieldReference`](FieldReference.md).[`onChange`](FieldReference.md#onchange)

***

### onDelete()

> **onDelete**(`listener`): `void`

Defined in: packages/data/src/references/field-reference.ts:18

#### Parameters

##### listener

`DeleteNodeListener`\<`string`\>

#### Returns

`void`

#### Inherited from

[`FieldReference`](FieldReference.md).[`onDelete`](FieldReference.md#ondelete)

***

### prepend()

> **prepend**(`str`): `this`

Defined in: packages/data/src/references/field-reference.ts:74

Prepends a string or number to the beginning of the current value.

#### Parameters

##### str

The value to prepend.

`string` | `number`

#### Returns

`this`

The field instance for chaining.

***

### trim()

> **trim**(): `this`

Defined in: packages/data/src/references/field-reference.ts:80

Removes whitespace from both ends of the current string value.

#### Returns

`this`

The field instance for chaining.

***

### unsubscribeOnChange()

> **unsubscribeOnChange**(`listener`): `void`

Defined in: packages/data/src/references/field-reference.ts:20

#### Parameters

##### listener

`ChangeFieldListener`\<`string`\>

#### Returns

`void`

#### Inherited from

[`FieldReference`](FieldReference.md).[`unsubscribeOnChange`](FieldReference.md#unsubscribeonchange)

***

### unsubscribeOnDelete()

> **unsubscribeOnDelete**(`listener`): `void`

Defined in: packages/data/src/references/field-reference.ts:22

#### Parameters

##### listener

`DeleteNodeListener`\<`string`\>

#### Returns

`void`

#### Inherited from

[`FieldReference`](FieldReference.md).[`unsubscribeOnDelete`](FieldReference.md#unsubscribeondelete)
