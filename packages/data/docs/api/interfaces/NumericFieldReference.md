[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / NumericFieldReference

# Interface: NumericFieldReference

Defined in: packages/data/src/references/field-reference.ts:35

## Extends

- [`FieldReference`](FieldReference.md)\<`number`\>

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

> **value**: `number`

Defined in: packages/data/src/references/field-reference.ts:30

Assigning a new value triggers policies and emits the `onChange` event
if the value is different from the current one.

#### Inherited from

[`FieldReference`](FieldReference.md).[`value`](FieldReference.md#value)

## Methods

### dec()

> **dec**(`val`): `void`

Defined in: packages/data/src/references/field-reference.ts:46

Decrements the current value by the specified amount.

#### Parameters

##### val

`number`

The amount to subtract.

#### Returns

`void`

***

### inc()

> **inc**(`val`): `void`

Defined in: packages/data/src/references/field-reference.ts:40

Increments the current value by the specified amount.

#### Parameters

##### val

`number`

The amount to add.

#### Returns

`void`

***

### onChange()

> **onChange**(`listener`): `void`

Defined in: packages/data/src/references/field-reference.ts:16

#### Parameters

##### listener

`ChangeFieldListener`\<`number`\>

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

`DeleteNodeListener`\<`number`\>

#### Returns

`void`

#### Inherited from

[`FieldReference`](FieldReference.md).[`onDelete`](FieldReference.md#ondelete)

***

### unsubscribeOnChange()

> **unsubscribeOnChange**(`listener`): `void`

Defined in: packages/data/src/references/field-reference.ts:20

#### Parameters

##### listener

`ChangeFieldListener`\<`number`\>

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

`DeleteNodeListener`\<`number`\>

#### Returns

`void`

#### Inherited from

[`FieldReference`](FieldReference.md).[`unsubscribeOnDelete`](FieldReference.md#unsubscribeondelete)
