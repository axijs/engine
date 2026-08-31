[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / NumericFieldRef

# Class: NumericFieldRef

Defined in: packages/data/src/references/numeric-field-ref.ts:4

## Extends

- [`FieldRef`](FieldRef.md)\<`number`\>

## Implements

- [`NumericFieldReference`](../interfaces/NumericFieldReference.md)

## Constructors

### Constructor

> **new NumericFieldRef**(`store`, `path`): `NumericFieldRef`

Defined in: packages/data/src/references/readonly-field-ref.ts:24

#### Parameters

##### store

[`StoreWithEvents`](../type-aliases/StoreWithEvents.md)

##### path

`PathType`

#### Returns

`NumericFieldRef`

#### Inherited from

[`FieldRef`](FieldRef.md).[`constructor`](FieldRef.md#constructor)

## Properties

### \_path

> `readonly` **\_path**: `string`

Defined in: packages/data/src/references/readonly-field-ref.ts:9

#### Inherited from

[`FieldRef`](FieldRef.md).[`_path`](FieldRef.md#_path)

***

### \_pathArr

> `readonly` **\_pathArr**: `string`[]

Defined in: packages/data/src/references/readonly-field-ref.ts:10

#### Inherited from

[`FieldRef`](FieldRef.md).[`_pathArr`](FieldRef.md#_patharr)

***

### \_store

> `readonly` **\_store**: [`StoreWithEvents`](../type-aliases/StoreWithEvents.md)

Defined in: packages/data/src/references/readonly-field-ref.ts:8

#### Inherited from

[`FieldRef`](FieldRef.md).[`_store`](FieldRef.md#_store)

## Accessors

### path

#### Get Signature

> **get** **path**(): `string`

Defined in: packages/data/src/references/readonly-field-ref.ts:12

##### Returns

`string`

#### Implementation of

[`NumericFieldReference`](../interfaces/NumericFieldReference.md).[`path`](../interfaces/NumericFieldReference.md#path)

#### Inherited from

[`FieldRef`](FieldRef.md).[`path`](FieldRef.md#path)

***

### pathArr

#### Get Signature

> **get** **pathArr**(): `string`[]

Defined in: packages/data/src/references/readonly-field-ref.ts:16

##### Returns

`string`[]

#### Implementation of

[`NumericFieldReference`](../interfaces/NumericFieldReference.md).[`pathArr`](../interfaces/NumericFieldReference.md#patharr)

#### Inherited from

[`FieldRef`](FieldRef.md).[`pathArr`](FieldRef.md#patharr)

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

[`NumericFieldReference`](../interfaces/NumericFieldReference.md).[`value`](../interfaces/NumericFieldReference.md#value)

#### Inherited from

[`FieldRef`](FieldRef.md).[`value`](FieldRef.md#value)

## Methods

### dec()

> **dec**(`val`): `void`

Defined in: packages/data/src/references/numeric-field-ref.ts:9

Decrements the current value by the specified amount.

#### Parameters

##### val

`number`

The amount to subtract.

#### Returns

`void`

#### Implementation of

[`NumericFieldReference`](../interfaces/NumericFieldReference.md).[`dec`](../interfaces/NumericFieldReference.md#dec)

***

### inc()

> **inc**(`val`): `void`

Defined in: packages/data/src/references/numeric-field-ref.ts:5

Increments the current value by the specified amount.

#### Parameters

##### val

`number`

The amount to add.

#### Returns

`void`

#### Implementation of

[`NumericFieldReference`](../interfaces/NumericFieldReference.md).[`inc`](../interfaces/NumericFieldReference.md#inc)

***

### onChange()

> **onChange**(`listener`): `Unsubscribable`

Defined in: packages/data/src/references/readonly-field-ref.ts:30

#### Parameters

##### listener

`ChangeFieldListener`\<`number`\>

#### Returns

`Unsubscribable`

#### Implementation of

[`NumericFieldReference`](../interfaces/NumericFieldReference.md).[`onChange`](../interfaces/NumericFieldReference.md#onchange)

#### Inherited from

[`FieldRef`](FieldRef.md).[`onChange`](FieldRef.md#onchange)

***

### onDelete()

> **onDelete**(`listener`): `Unsubscribable`

Defined in: packages/data/src/references/readonly-field-ref.ts:34

#### Parameters

##### listener

`DeleteNodeListener`\<`number`\>

#### Returns

`Unsubscribable`

#### Implementation of

[`NumericFieldReference`](../interfaces/NumericFieldReference.md).[`onDelete`](../interfaces/NumericFieldReference.md#ondelete)

#### Inherited from

[`FieldRef`](FieldRef.md).[`onDelete`](FieldRef.md#ondelete)

***

### unsubscribeOnChange()

> **unsubscribeOnChange**(`listener`): `void`

Defined in: packages/data/src/references/readonly-field-ref.ts:38

#### Parameters

##### listener

`ChangeFieldListener`\<`number`\>

#### Returns

`void`

#### Implementation of

[`NumericFieldReference`](../interfaces/NumericFieldReference.md).[`unsubscribeOnChange`](../interfaces/NumericFieldReference.md#unsubscribeonchange)

#### Inherited from

[`FieldRef`](FieldRef.md).[`unsubscribeOnChange`](FieldRef.md#unsubscribeonchange)

***

### unsubscribeOnDelete()

> **unsubscribeOnDelete**(`listener`): `void`

Defined in: packages/data/src/references/readonly-field-ref.ts:42

#### Parameters

##### listener

`DeleteNodeListener`\<`number`\>

#### Returns

`void`

#### Implementation of

[`NumericFieldReference`](../interfaces/NumericFieldReference.md).[`unsubscribeOnDelete`](../interfaces/NumericFieldReference.md#unsubscribeondelete)

#### Inherited from

[`FieldRef`](FieldRef.md).[`unsubscribeOnDelete`](FieldRef.md#unsubscribeondelete)
