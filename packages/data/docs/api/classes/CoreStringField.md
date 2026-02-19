[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / CoreStringField

# Class: CoreStringField

Defined in: data/src/field-definitions/core-string-field.ts:6

A specialized Field for handling string values.
Provides chainable methods for common string manipulations.

## Extends

- [`CoreField`](CoreField.md)\<`string`\>

## Implements

- [`StringField`](../interfaces/StringField.md)

## Constructors

### Constructor

> **new CoreStringField**(`name`, `initialVal`, `options?`): `CoreStringField`

Defined in: data/src/field-definitions/core-string-field.ts:10

#### Parameters

##### name

`string`

##### initialVal

`string`

##### options?

[`CoreStringFieldOptions`](../interfaces/CoreStringFieldOptions.md)

#### Returns

`CoreStringField`

#### Overrides

[`CoreField`](CoreField.md).[`constructor`](CoreField.md#constructor)

## Properties

### onChange

> `readonly` **onChange**: `Subscribable`\<\[`string`, `string`\]\>

Defined in: data/src/field-definitions/core-field.ts:23

An observable stream that emits an event whenever the value changes.
The payload contains the new value and the old value.

#### Implementation of

[`StringField`](../interfaces/StringField.md).[`onChange`](../interfaces/StringField.md#onchange)

#### Inherited from

[`CoreField`](CoreField.md).[`onChange`](CoreField.md#onchange)

***

### policies

> `readonly` **policies**: [`Policies`](Policies.md)\<`string`\>

Defined in: data/src/field-definitions/core-field.ts:24

The collection of policies applied to this field.

#### Implementation of

[`StringField`](../interfaces/StringField.md).[`policies`](../interfaces/StringField.md#policies)

#### Inherited from

[`CoreField`](CoreField.md).[`policies`](CoreField.md#policies)

***

### typeName

> `readonly` **typeName**: `string` = `CoreStringField.typeName`

Defined in: data/src/field-definitions/core-string-field.ts:8

A unique string identifier for the field type (e.g., 'numeric', 'boolean').
Used for serialization and type guards.

#### Implementation of

[`StringField`](../interfaces/StringField.md).[`typeName`](../interfaces/StringField.md#typename)

#### Overrides

[`CoreField`](CoreField.md).[`typeName`](CoreField.md#typename)

***

### typeName

> `readonly` `static` **typeName**: `string` = `'string'`

Defined in: data/src/field-definitions/core-string-field.ts:7

A type keyword of the field

#### Overrides

[`CoreField`](CoreField.md).[`typeName`](CoreField.md#typename-1)

## Accessors

### name

#### Get Signature

> **get** **name**(): `string`

Defined in: data/src/field-definitions/core-field.ts:27

The name or key of this field within its parent container.

##### Returns

`string`

The name or key of this field within its parent container.

#### Implementation of

[`StringField`](../interfaces/StringField.md).[`name`](../interfaces/StringField.md#name)

#### Inherited from

[`CoreField`](CoreField.md).[`name`](CoreField.md#name)

***

### value

#### Get Signature

> **get** **value**(): `T`

Defined in: data/src/field-definitions/core-field.ts:35

Gets the current raw value of the field.
For reactive updates, it's recommended to use the `.signal` property instead.

##### Returns

`T`

#### Set Signature

> **set** **value**(`val`): `void`

Defined in: data/src/field-definitions/core-field.ts:44

Sets a new value for the field.
The provided value will be processed by all registered policies before the underlying signal is updated.

##### Parameters

###### val

`T`

The new value to set.

##### Returns

`void`

The current value of the field.
Assigning a new value triggers policies and emits the `onChange` event
if the value is different from the current one.

#### Implementation of

[`StringField`](../interfaces/StringField.md).[`value`](../interfaces/StringField.md#value)

#### Inherited from

[`CoreField`](CoreField.md).[`value`](CoreField.md#value)

## Methods

### append()

> **append**(`str`): `CoreStringField`

Defined in: data/src/field-definitions/core-string-field.ts:14

Appends a string or number to the end of the current value.

#### Parameters

##### str

The value to append.

`string` | `number`

#### Returns

`CoreStringField`

The field instance for chaining.

#### Implementation of

[`StringField`](../interfaces/StringField.md).[`append`](../interfaces/StringField.md#append)

***

### batchUpdate()

> **batchUpdate**(`updateFn`): `void`

Defined in: data/src/field-definitions/core-field.ts:77

Performs an atomic-like update using a callback function.
The callback receives the current value and should return the new value.

#### Parameters

##### updateFn

(`currentValue`) => `string`

A function that transforms the current value into a new one.

#### Returns

`void`

#### Implementation of

[`StringField`](../interfaces/StringField.md).[`batchUpdate`](../interfaces/StringField.md#batchupdate)

#### Inherited from

[`CoreField`](CoreField.md).[`batchUpdate`](CoreField.md#batchupdate)

***

### clear()

> **clear**(): `void`

Defined in: data/src/field-definitions/core-string-field.ts:30

Sets the value to an empty string.

#### Returns

`void`

#### Implementation of

[`StringField`](../interfaces/StringField.md).[`clear`](../interfaces/StringField.md#clear)

***

### destroy()

> **destroy**(): `void`

Defined in: data/src/field-definitions/core-field.ts:85

Cleans up resources used by the field and its policies.
This should be called when the field is no longer needed to prevent memory leaks from reactive policies.

#### Returns

`void`

#### Implementation of

[`StringField`](../interfaces/StringField.md).[`destroy`](../interfaces/StringField.md#destroy)

#### Inherited from

[`CoreField`](CoreField.md).[`destroy`](CoreField.md#destroy)

***

### isEmpty()

> **isEmpty**(): `boolean`

Defined in: data/src/field-definitions/core-string-field.ts:26

Checks if the current string is empty (length is 0).

#### Returns

`boolean`

`true` if the string is empty, otherwise `false`.

#### Implementation of

[`StringField`](../interfaces/StringField.md).[`isEmpty`](../interfaces/StringField.md#isempty)

***

### prepend()

> **prepend**(`str`): `CoreStringField`

Defined in: data/src/field-definitions/core-string-field.ts:18

Prepends a string or number to the beginning of the current value.

#### Parameters

##### str

The value to prepend.

`string` | `number`

#### Returns

`CoreStringField`

The field instance for chaining.

#### Implementation of

[`StringField`](../interfaces/StringField.md).[`prepend`](../interfaces/StringField.md#prepend)

***

### setValueSilently()

> **setValueSilently**(`val`): `void`

Defined in: data/src/field-definitions/core-field.ts:73

Updates the field's value without triggering the `onChange` event.
Useful for internal synchronization or restoring state where side effects are undesirable.

#### Parameters

##### val

`string`

The new value to set.

#### Returns

`void`

#### Implementation of

[`StringField`](../interfaces/StringField.md).[`setValueSilently`](../interfaces/StringField.md#setvaluesilently)

#### Inherited from

[`CoreField`](CoreField.md).[`setValueSilently`](CoreField.md#setvaluesilently)

***

### trim()

> **trim**(): `CoreStringField`

Defined in: data/src/field-definitions/core-string-field.ts:22

Removes whitespace from both ends of the current string value.

#### Returns

`CoreStringField`

The field instance for chaining.

#### Implementation of

[`StringField`](../interfaces/StringField.md).[`trim`](../interfaces/StringField.md#trim)
