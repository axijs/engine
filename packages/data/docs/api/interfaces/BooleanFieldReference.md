[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / BooleanFieldReference

# Interface: BooleanFieldReference

Defined in: packages/data/src/references/field-reference.ts:51

## Extends

- [`FieldReference`](FieldReference.md)\<`boolean`\>

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

> **value**: `boolean`

Defined in: packages/data/src/references/field-reference.ts:30

Assigning a new value triggers policies and emits the `onChange` event
if the value is different from the current one.

#### Inherited from

[`FieldReference`](FieldReference.md).[`value`](FieldReference.md#value)

## Methods

### onChange()

> **onChange**(`listener`): `void`

Defined in: packages/data/src/references/field-reference.ts:16

#### Parameters

##### listener

`ChangeFieldListener`\<`boolean`\>

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

`DeleteNodeListener`\<`boolean`\>

#### Returns

`void`

#### Inherited from

[`FieldReference`](FieldReference.md).[`onDelete`](FieldReference.md#ondelete)

***

### toggle()

> **toggle**(): `boolean`

Defined in: packages/data/src/references/field-reference.ts:56

Inverts the current boolean value (true -> false, false -> true).

#### Returns

`boolean`

The new value after toggling.

***

### unsubscribeOnChange()

> **unsubscribeOnChange**(`listener`): `void`

Defined in: packages/data/src/references/field-reference.ts:20

#### Parameters

##### listener

`ChangeFieldListener`\<`boolean`\>

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

`DeleteNodeListener`\<`boolean`\>

#### Returns

`void`

#### Inherited from

[`FieldReference`](FieldReference.md).[`unsubscribeOnDelete`](FieldReference.md#unsubscribeondelete)
