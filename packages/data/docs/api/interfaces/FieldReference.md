[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / FieldReference

# Interface: FieldReference\<T\>

Defined in: packages/data/src/references/field-reference.ts:25

Represents a wrapper for a specific data node.

## Extends

- [`ReadonlyFieldReference`](ReadonlyFieldReference.md)\<`T`\>

## Extended by

- [`NumericFieldReference`](NumericFieldReference.md)
- [`BooleanFieldReference`](BooleanFieldReference.md)
- [`StringFieldReference`](StringFieldReference.md)

## Type Parameters

### T

`T`

The type of the value stored in the field.

## Properties

### path

> `readonly` **path**: `string`

Defined in: packages/data/src/references/field-reference.ts:9

#### Inherited from

[`ReadonlyFieldReference`](ReadonlyFieldReference.md).[`path`](ReadonlyFieldReference.md#path)

***

### pathArr

> `readonly` **pathArr**: `string`[]

Defined in: packages/data/src/references/field-reference.ts:10

#### Inherited from

[`ReadonlyFieldReference`](ReadonlyFieldReference.md).[`pathArr`](ReadonlyFieldReference.md#patharr)

***

### value

> **value**: `T`

Defined in: packages/data/src/references/field-reference.ts:30

Assigning a new value triggers policies and emits the `onChange` event
if the value is different from the current one.

#### Overrides

[`ReadonlyFieldReference`](ReadonlyFieldReference.md).[`value`](ReadonlyFieldReference.md#value)

## Methods

### onChange()

> **onChange**(`listener`): `void`

Defined in: packages/data/src/references/field-reference.ts:16

#### Parameters

##### listener

`ChangeFieldListener`\<`T`\>

#### Returns

`void`

#### Inherited from

[`ReadonlyFieldReference`](ReadonlyFieldReference.md).[`onChange`](ReadonlyFieldReference.md#onchange)

***

### onDelete()

> **onDelete**(`listener`): `void`

Defined in: packages/data/src/references/field-reference.ts:18

#### Parameters

##### listener

`DeleteNodeListener`\<`T`\>

#### Returns

`void`

#### Inherited from

[`ReadonlyFieldReference`](ReadonlyFieldReference.md).[`onDelete`](ReadonlyFieldReference.md#ondelete)

***

### unsubscribeOnChange()

> **unsubscribeOnChange**(`listener`): `void`

Defined in: packages/data/src/references/field-reference.ts:20

#### Parameters

##### listener

`ChangeFieldListener`\<`T`\>

#### Returns

`void`

#### Inherited from

[`ReadonlyFieldReference`](ReadonlyFieldReference.md).[`unsubscribeOnChange`](ReadonlyFieldReference.md#unsubscribeonchange)

***

### unsubscribeOnDelete()

> **unsubscribeOnDelete**(`listener`): `void`

Defined in: packages/data/src/references/field-reference.ts:22

#### Parameters

##### listener

`DeleteNodeListener`\<`T`\>

#### Returns

`void`

#### Inherited from

[`ReadonlyFieldReference`](ReadonlyFieldReference.md).[`unsubscribeOnDelete`](ReadonlyFieldReference.md#unsubscribeondelete)
