[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / CoreField

# Class: CoreField\<T\>

Defined in: data/src/field-definitions/core-field.ts:14

A state container that wraps a value.
It allows applying a pipeline of transformation or validation "policies" before any new value is set.

## Extended by

- [`CoreBooleanField`](CoreBooleanField.md)
- [`CoreStringField`](CoreStringField.md)
- [`CoreNumericField`](CoreNumericField.md)

## Type Parameters

### T

`T`

The type of the value this field holds.

## Implements

- [`Field`](../interfaces/Field.md)\<`T`\>

## Constructors

### Constructor

> **new CoreField**\<`T`\>(`name`, `initialVal`, `options?`): `CoreField`\<`T`\>

Defined in: data/src/field-definitions/core-field.ts:62

Creates an instance of a Field.

#### Parameters

##### name

`string`

A unique identifier for the field.

##### initialVal

`T`

The initial value of the field.

##### options?

[`FieldOptions`](../interfaces/FieldOptions.md)\<`T`\>

Optional configuration for the field.

#### Returns

`CoreField`\<`T`\>

## Properties

### onChange

> `readonly` **onChange**: `Subscribable`\<\[`T`, `T`\]\>

Defined in: data/src/field-definitions/core-field.ts:23

An observable stream that emits an event whenever the value changes.
The payload contains the new value and the old value.

#### Implementation of

[`Field`](../interfaces/Field.md).[`onChange`](../interfaces/Field.md#onchange)

***

### policies

> `readonly` **policies**: [`Policies`](Policies.md)\<`T`\>

Defined in: data/src/field-definitions/core-field.ts:24

The collection of policies applied to this field.

#### Implementation of

[`Field`](../interfaces/Field.md).[`policies`](../interfaces/Field.md#policies)

***

### typeName

> `readonly` **typeName**: `string` = `CoreField.typeName`

Defined in: data/src/field-definitions/core-field.ts:17

A unique string identifier for the field type (e.g., 'numeric', 'boolean').
Used for serialization and type guards.

#### Implementation of

[`Field`](../interfaces/Field.md).[`typeName`](../interfaces/Field.md#typename)

***

### typeName

> `readonly` `static` **typeName**: `string` = `'default'`

Defined in: data/src/field-definitions/core-field.ts:16

A type keyword of the field

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

[`Field`](../interfaces/Field.md).[`name`](../interfaces/Field.md#name)

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

[`Field`](../interfaces/Field.md).[`value`](../interfaces/Field.md#value)

## Methods

### batchUpdate()

> **batchUpdate**(`updateFn`): `void`

Defined in: data/src/field-definitions/core-field.ts:77

Performs an atomic-like update using a callback function.
The callback receives the current value and should return the new value.

#### Parameters

##### updateFn

(`currentValue`) => `T`

A function that transforms the current value into a new one.

#### Returns

`void`

#### Implementation of

[`Field`](../interfaces/Field.md).[`batchUpdate`](../interfaces/Field.md#batchupdate)

***

### destroy()

> **destroy**(): `void`

Defined in: data/src/field-definitions/core-field.ts:85

Cleans up resources used by the field and its policies.
This should be called when the field is no longer needed to prevent memory leaks from reactive policies.

#### Returns

`void`

#### Implementation of

[`Field`](../interfaces/Field.md).[`destroy`](../interfaces/Field.md#destroy)

***

### setValueSilently()

> **setValueSilently**(`val`): `void`

Defined in: data/src/field-definitions/core-field.ts:73

Updates the field's value without triggering the `onChange` event.
Useful for internal synchronization or restoring state where side effects are undesirable.

#### Parameters

##### val

`T`

The new value to set.

#### Returns

`void`

#### Implementation of

[`Field`](../interfaces/Field.md).[`setValueSilently`](../interfaces/Field.md#setvaluesilently)
