[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / FieldRef

# Class: FieldRef\<T\>

Defined in: packages/data/src/references/field-ref.ts:4

Represents a wrapper for a specific data node.

## Extends

- [`ReadonlyFieldRef`](ReadonlyFieldRef.md)\<`T`\>

## Extended by

- [`BooleanFieldRef`](BooleanFieldRef.md)
- [`NumericFieldRef`](NumericFieldRef.md)
- [`StringFieldRef`](StringFieldRef.md)

## Type Parameters

### T

`T`

The type of the value stored in the field.

## Implements

- [`FieldReference`](../interfaces/FieldReference.md)\<`T`\>

## Constructors

### Constructor

> **new FieldRef**\<`T`\>(`store`, `path`): `FieldRef`\<`T`\>

Defined in: packages/data/src/references/readonly-field-ref.ts:24

#### Parameters

##### store

[`StoreWithEvents`](../type-aliases/StoreWithEvents.md)

##### path

`PathType`

#### Returns

`FieldRef`\<`T`\>

#### Inherited from

[`ReadonlyFieldRef`](ReadonlyFieldRef.md).[`constructor`](ReadonlyFieldRef.md#constructor)

## Properties

### \_path

> `readonly` **\_path**: `string`

Defined in: packages/data/src/references/readonly-field-ref.ts:9

#### Inherited from

[`ReadonlyFieldRef`](ReadonlyFieldRef.md).[`_path`](ReadonlyFieldRef.md#_path)

***

### \_pathArr

> `readonly` **\_pathArr**: `string`[]

Defined in: packages/data/src/references/readonly-field-ref.ts:10

#### Inherited from

[`ReadonlyFieldRef`](ReadonlyFieldRef.md).[`_pathArr`](ReadonlyFieldRef.md#_patharr)

***

### \_store

> `readonly` **\_store**: [`StoreWithEvents`](../type-aliases/StoreWithEvents.md)

Defined in: packages/data/src/references/readonly-field-ref.ts:8

#### Inherited from

[`ReadonlyFieldRef`](ReadonlyFieldRef.md).[`_store`](ReadonlyFieldRef.md#_store)

## Accessors

### path

#### Get Signature

> **get** **path**(): `string`

Defined in: packages/data/src/references/readonly-field-ref.ts:12

##### Returns

`string`

#### Implementation of

[`FieldReference`](../interfaces/FieldReference.md).[`path`](../interfaces/FieldReference.md#path)

#### Inherited from

[`ReadonlyFieldRef`](ReadonlyFieldRef.md).[`path`](ReadonlyFieldRef.md#path)

***

### pathArr

#### Get Signature

> **get** **pathArr**(): `string`[]

Defined in: packages/data/src/references/readonly-field-ref.ts:16

##### Returns

`string`[]

#### Implementation of

[`FieldReference`](../interfaces/FieldReference.md).[`pathArr`](../interfaces/FieldReference.md#patharr)

#### Inherited from

[`ReadonlyFieldRef`](ReadonlyFieldRef.md).[`pathArr`](ReadonlyFieldRef.md#patharr)

***

### value

#### Get Signature

> **get** **value**(): `T`

Defined in: packages/data/src/references/field-ref.ts:9

Assigning a new value triggers policies and emits the `onChange` event
if the value is different from the current one.

##### Returns

`T`

#### Set Signature

> **set** **value**(`val`): `void`

Defined in: packages/data/src/references/field-ref.ts:5

Assigning a new value triggers policies and emits the `onChange` event
if the value is different from the current one.

##### Parameters

###### val

`T`

##### Returns

`void`

Assigning a new value triggers policies and emits the `onChange` event
if the value is different from the current one.

#### Implementation of

[`FieldReference`](../interfaces/FieldReference.md).[`value`](../interfaces/FieldReference.md#value)

#### Overrides

[`ReadonlyFieldRef`](ReadonlyFieldRef.md).[`value`](ReadonlyFieldRef.md#value)

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

[`FieldReference`](../interfaces/FieldReference.md).[`onChange`](../interfaces/FieldReference.md#onchange)

#### Inherited from

[`ReadonlyFieldRef`](ReadonlyFieldRef.md).[`onChange`](ReadonlyFieldRef.md#onchange)

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

[`FieldReference`](../interfaces/FieldReference.md).[`onDelete`](../interfaces/FieldReference.md#ondelete)

#### Inherited from

[`ReadonlyFieldRef`](ReadonlyFieldRef.md).[`onDelete`](ReadonlyFieldRef.md#ondelete)

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

[`FieldReference`](../interfaces/FieldReference.md).[`unsubscribeOnChange`](../interfaces/FieldReference.md#unsubscribeonchange)

#### Inherited from

[`ReadonlyFieldRef`](ReadonlyFieldRef.md).[`unsubscribeOnChange`](ReadonlyFieldRef.md#unsubscribeonchange)

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

[`FieldReference`](../interfaces/FieldReference.md).[`unsubscribeOnDelete`](../interfaces/FieldReference.md#unsubscribeondelete)

#### Inherited from

[`ReadonlyFieldRef`](ReadonlyFieldRef.md).[`unsubscribeOnDelete`](ReadonlyFieldRef.md#unsubscribeondelete)
