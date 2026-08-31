[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / StringFieldRef

# Class: StringFieldRef

Defined in: packages/data/src/references/string-field-ref.ts:4

## Extends

- [`FieldRef`](FieldRef.md)\<`string`\>

## Implements

- [`StringFieldReference`](../interfaces/StringFieldReference.md)

## Constructors

### Constructor

> **new StringFieldRef**(`store`, `path`): `StringFieldRef`

Defined in: packages/data/src/references/readonly-field-ref.ts:24

#### Parameters

##### store

[`StoreWithEvents`](../type-aliases/StoreWithEvents.md)

##### path

`PathType`

#### Returns

`StringFieldRef`

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

[`StringFieldReference`](../interfaces/StringFieldReference.md).[`path`](../interfaces/StringFieldReference.md#path)

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

[`StringFieldReference`](../interfaces/StringFieldReference.md).[`pathArr`](../interfaces/StringFieldReference.md#patharr)

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

[`StringFieldReference`](../interfaces/StringFieldReference.md).[`value`](../interfaces/StringFieldReference.md#value)

#### Inherited from

[`FieldRef`](FieldRef.md).[`value`](FieldRef.md#value)

## Methods

### append()

> **append**(`str`): `this`

Defined in: packages/data/src/references/string-field-ref.ts:5

Appends a string or number to the end of the current value.

#### Parameters

##### str

The value to append.

`string` | `number`

#### Returns

`this`

The field instance for chaining.

#### Implementation of

[`StringFieldReference`](../interfaces/StringFieldReference.md).[`append`](../interfaces/StringFieldReference.md#append)

***

### clear()

> **clear**(): `void`

Defined in: packages/data/src/references/string-field-ref.ts:24

Sets the value to an empty string.

#### Returns

`void`

#### Implementation of

[`StringFieldReference`](../interfaces/StringFieldReference.md).[`clear`](../interfaces/StringFieldReference.md#clear)

***

### isEmpty()

> **isEmpty**(): `boolean`

Defined in: packages/data/src/references/string-field-ref.ts:20

Checks if the current string is empty (length is 0).

#### Returns

`boolean`

`true` if the string is empty, otherwise `false`.

#### Implementation of

[`StringFieldReference`](../interfaces/StringFieldReference.md).[`isEmpty`](../interfaces/StringFieldReference.md#isempty)

***

### onChange()

> **onChange**(`listener`): `Unsubscribable`

Defined in: packages/data/src/references/readonly-field-ref.ts:30

#### Parameters

##### listener

`ChangeFieldListener`\<`string`\>

#### Returns

`Unsubscribable`

#### Implementation of

[`StringFieldReference`](../interfaces/StringFieldReference.md).[`onChange`](../interfaces/StringFieldReference.md#onchange)

#### Inherited from

[`FieldRef`](FieldRef.md).[`onChange`](FieldRef.md#onchange)

***

### onDelete()

> **onDelete**(`listener`): `Unsubscribable`

Defined in: packages/data/src/references/readonly-field-ref.ts:34

#### Parameters

##### listener

`DeleteNodeListener`\<`string`\>

#### Returns

`Unsubscribable`

#### Implementation of

[`StringFieldReference`](../interfaces/StringFieldReference.md).[`onDelete`](../interfaces/StringFieldReference.md#ondelete)

#### Inherited from

[`FieldRef`](FieldRef.md).[`onDelete`](FieldRef.md#ondelete)

***

### prepend()

> **prepend**(`str`): `this`

Defined in: packages/data/src/references/string-field-ref.ts:10

Prepends a string or number to the beginning of the current value.

#### Parameters

##### str

The value to prepend.

`string` | `number`

#### Returns

`this`

The field instance for chaining.

#### Implementation of

[`StringFieldReference`](../interfaces/StringFieldReference.md).[`prepend`](../interfaces/StringFieldReference.md#prepend)

***

### trim()

> **trim**(): `this`

Defined in: packages/data/src/references/string-field-ref.ts:15

Removes whitespace from both ends of the current string value.

#### Returns

`this`

The field instance for chaining.

#### Implementation of

[`StringFieldReference`](../interfaces/StringFieldReference.md).[`trim`](../interfaces/StringFieldReference.md#trim)

***

### unsubscribeOnChange()

> **unsubscribeOnChange**(`listener`): `void`

Defined in: packages/data/src/references/readonly-field-ref.ts:38

#### Parameters

##### listener

`ChangeFieldListener`\<`string`\>

#### Returns

`void`

#### Implementation of

[`StringFieldReference`](../interfaces/StringFieldReference.md).[`unsubscribeOnChange`](../interfaces/StringFieldReference.md#unsubscribeonchange)

#### Inherited from

[`FieldRef`](FieldRef.md).[`unsubscribeOnChange`](FieldRef.md#unsubscribeonchange)

***

### unsubscribeOnDelete()

> **unsubscribeOnDelete**(`listener`): `void`

Defined in: packages/data/src/references/readonly-field-ref.ts:42

#### Parameters

##### listener

`DeleteNodeListener`\<`string`\>

#### Returns

`void`

#### Implementation of

[`StringFieldReference`](../interfaces/StringFieldReference.md).[`unsubscribeOnDelete`](../interfaces/StringFieldReference.md#unsubscribeondelete)

#### Inherited from

[`FieldRef`](FieldRef.md).[`unsubscribeOnDelete`](FieldRef.md#unsubscribeondelete)
