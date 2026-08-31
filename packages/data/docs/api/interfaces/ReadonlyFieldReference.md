[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / ReadonlyFieldReference

# Interface: ReadonlyFieldReference\<T\>

Defined in: packages/data/src/references/field-reference.ts:8

Represents a wrapper for a specific data node.

## Extended by

- [`FieldReference`](FieldReference.md)

## Type Parameters

### T

`T`

The type of the value stored in the field.

## Properties

### path

> `readonly` **path**: `string`

Defined in: packages/data/src/references/field-reference.ts:9

***

### pathArr

> `readonly` **pathArr**: `string`[]

Defined in: packages/data/src/references/field-reference.ts:10

***

### value

> `readonly` **value**: `T`

Defined in: packages/data/src/references/field-reference.ts:14

The current value of the field.

## Methods

### onChange()

> **onChange**(`listener`): `void`

Defined in: packages/data/src/references/field-reference.ts:16

#### Parameters

##### listener

`ChangeFieldListener`\<`T`\>

#### Returns

`void`

***

### onDelete()

> **onDelete**(`listener`): `void`

Defined in: packages/data/src/references/field-reference.ts:18

#### Parameters

##### listener

`DeleteNodeListener`\<`T`\>

#### Returns

`void`

***

### unsubscribeOnChange()

> **unsubscribeOnChange**(`listener`): `void`

Defined in: packages/data/src/references/field-reference.ts:20

#### Parameters

##### listener

`ChangeFieldListener`\<`T`\>

#### Returns

`void`

***

### unsubscribeOnDelete()

> **unsubscribeOnDelete**(`listener`): `void`

Defined in: packages/data/src/references/field-reference.ts:22

#### Parameters

##### listener

`DeleteNodeListener`\<`T`\>

#### Returns

`void`
