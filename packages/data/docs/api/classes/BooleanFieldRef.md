[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / BooleanFieldRef

# Class: BooleanFieldRef

Defined in: packages/data/src/references/boolean-field-ref.ts:4

## Extends

- [`FieldRef`](FieldRef.md)\<`boolean`\>

## Implements

- [`BooleanFieldReference`](../interfaces/BooleanFieldReference.md)

## Constructors

### Constructor

> **new BooleanFieldRef**(`store`, `path`): `BooleanFieldRef`

Defined in: packages/data/src/references/readonly-field-ref.ts:24

#### Parameters

##### store

[`StoreWithEvents`](../type-aliases/StoreWithEvents.md)

##### path

`PathType`

#### Returns

`BooleanFieldRef`

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

[`BooleanFieldReference`](../interfaces/BooleanFieldReference.md).[`path`](../interfaces/BooleanFieldReference.md#path)

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

[`BooleanFieldReference`](../interfaces/BooleanFieldReference.md).[`pathArr`](../interfaces/BooleanFieldReference.md#patharr)

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

[`BooleanFieldReference`](../interfaces/BooleanFieldReference.md).[`value`](../interfaces/BooleanFieldReference.md#value)

#### Inherited from

[`FieldRef`](FieldRef.md).[`value`](FieldRef.md#value)

## Methods

### onChange()

> **onChange**(`listener`): `Unsubscribable`

Defined in: packages/data/src/references/readonly-field-ref.ts:30

#### Parameters

##### listener

`ChangeFieldListener`\<`boolean`\>

#### Returns

`Unsubscribable`

#### Implementation of

[`BooleanFieldReference`](../interfaces/BooleanFieldReference.md).[`onChange`](../interfaces/BooleanFieldReference.md#onchange)

#### Inherited from

[`FieldRef`](FieldRef.md).[`onChange`](FieldRef.md#onchange)

***

### onDelete()

> **onDelete**(`listener`): `Unsubscribable`

Defined in: packages/data/src/references/readonly-field-ref.ts:34

#### Parameters

##### listener

`DeleteNodeListener`\<`boolean`\>

#### Returns

`Unsubscribable`

#### Implementation of

[`BooleanFieldReference`](../interfaces/BooleanFieldReference.md).[`onDelete`](../interfaces/BooleanFieldReference.md#ondelete)

#### Inherited from

[`FieldRef`](FieldRef.md).[`onDelete`](FieldRef.md#ondelete)

***

### toggle()

> **toggle**(): `boolean`

Defined in: packages/data/src/references/boolean-field-ref.ts:5

Inverts the current boolean value (true -> false, false -> true).

#### Returns

`boolean`

The new value after toggling.

#### Implementation of

[`BooleanFieldReference`](../interfaces/BooleanFieldReference.md).[`toggle`](../interfaces/BooleanFieldReference.md#toggle)

***

### unsubscribeOnChange()

> **unsubscribeOnChange**(`listener`): `void`

Defined in: packages/data/src/references/readonly-field-ref.ts:38

#### Parameters

##### listener

`ChangeFieldListener`\<`boolean`\>

#### Returns

`void`

#### Implementation of

[`BooleanFieldReference`](../interfaces/BooleanFieldReference.md).[`unsubscribeOnChange`](../interfaces/BooleanFieldReference.md#unsubscribeonchange)

#### Inherited from

[`FieldRef`](FieldRef.md).[`unsubscribeOnChange`](FieldRef.md#unsubscribeonchange)

***

### unsubscribeOnDelete()

> **unsubscribeOnDelete**(`listener`): `void`

Defined in: packages/data/src/references/readonly-field-ref.ts:42

#### Parameters

##### listener

`DeleteNodeListener`\<`boolean`\>

#### Returns

`void`

#### Implementation of

[`BooleanFieldReference`](../interfaces/BooleanFieldReference.md).[`unsubscribeOnDelete`](../interfaces/BooleanFieldReference.md#unsubscribeondelete)

#### Inherited from

[`FieldRef`](FieldRef.md).[`unsubscribeOnDelete`](FieldRef.md#unsubscribeondelete)
