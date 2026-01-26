[**@axi-engine/fields**](../README.md)

***

[@axi-engine/fields](../README.md) / CoreBooleanField

# Class: CoreBooleanField

Defined in: fields/src/field-definitions/core-boolean-field.ts:6

A specialized Field for handling boolean values.
Provides toggle functionality.

## Extends

- [`CoreField`](CoreField.md)\<`boolean`\>

## Implements

- [`BooleanField`](../interfaces/BooleanField.md)

## Constructors

### Constructor

> **new CoreBooleanField**(`name`, `initialVal`, `options?`): `CoreBooleanField`

Defined in: fields/src/field-definitions/core-boolean-field.ts:10

#### Parameters

##### name

`string`

##### initialVal

`boolean`

##### options?

[`CoreBooleanFieldOptions`](../interfaces/CoreBooleanFieldOptions.md)

#### Returns

`CoreBooleanField`

#### Overrides

[`CoreField`](CoreField.md).[`constructor`](CoreField.md#constructor)

## Properties

### onChange

> `readonly` **onChange**: `Subscribable`\<\[`boolean`, `boolean`\]\>

Defined in: fields/src/field-definitions/core-field.ts:23

An observable stream that emits an event whenever the value changes.
The payload contains the new value and the old value.

#### Implementation of

[`BooleanField`](../interfaces/BooleanField.md).[`onChange`](../interfaces/BooleanField.md#onchange)

#### Inherited from

[`CoreField`](CoreField.md).[`onChange`](CoreField.md#onchange)

***

### policies

> `readonly` **policies**: [`Policies`](Policies.md)\<`boolean`\>

Defined in: fields/src/field-definitions/core-field.ts:24

The collection of policies applied to this field.

#### Implementation of

[`BooleanField`](../interfaces/BooleanField.md).[`policies`](../interfaces/BooleanField.md#policies)

#### Inherited from

[`CoreField`](CoreField.md).[`policies`](CoreField.md#policies)

***

### typeName

> `readonly` **typeName**: `string` = `CoreBooleanField.typeName`

Defined in: fields/src/field-definitions/core-boolean-field.ts:8

A unique string identifier for the field type (e.g., 'numeric', 'boolean').
Used for serialization and type guards.

#### Implementation of

[`BooleanField`](../interfaces/BooleanField.md).[`typeName`](../interfaces/BooleanField.md#typename)

#### Overrides

[`CoreField`](CoreField.md).[`typeName`](CoreField.md#typename)

***

### typeName

> `readonly` `static` **typeName**: `string` = `'boolean'`

Defined in: fields/src/field-definitions/core-boolean-field.ts:7

A type keyword of the field

#### Overrides

[`CoreField`](CoreField.md).[`typeName`](CoreField.md#typename-1)

## Accessors

### name

#### Get Signature

> **get** **name**(): `string`

Defined in: fields/src/field-definitions/core-field.ts:27

The name or key of this field within its parent container.

##### Returns

`string`

The name or key of this field within its parent container.

#### Implementation of

[`BooleanField`](../interfaces/BooleanField.md).[`name`](../interfaces/BooleanField.md#name)

#### Inherited from

[`CoreField`](CoreField.md).[`name`](CoreField.md#name)

***

### value

#### Get Signature

> **get** **value**(): `T`

Defined in: fields/src/field-definitions/core-field.ts:35

Gets the current raw value of the field.
For reactive updates, it's recommended to use the `.signal` property instead.

##### Returns

`T`

#### Set Signature

> **set** **value**(`val`): `void`

Defined in: fields/src/field-definitions/core-field.ts:44

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

[`BooleanField`](../interfaces/BooleanField.md).[`value`](../interfaces/BooleanField.md#value)

#### Inherited from

[`CoreField`](CoreField.md).[`value`](CoreField.md#value)

## Methods

### batchUpdate()

> **batchUpdate**(`updateFn`): `void`

Defined in: fields/src/field-definitions/core-field.ts:77

Performs an atomic-like update using a callback function.
The callback receives the current value and should return the new value.

#### Parameters

##### updateFn

(`currentValue`) => `boolean`

A function that transforms the current value into a new one.

#### Returns

`void`

#### Implementation of

[`BooleanField`](../interfaces/BooleanField.md).[`batchUpdate`](../interfaces/BooleanField.md#batchupdate)

#### Inherited from

[`CoreField`](CoreField.md).[`batchUpdate`](CoreField.md#batchupdate)

***

### destroy()

> **destroy**(): `void`

Defined in: fields/src/field-definitions/core-field.ts:85

Cleans up resources used by the field and its policies.
This should be called when the field is no longer needed to prevent memory leaks from reactive policies.

#### Returns

`void`

#### Implementation of

[`BooleanField`](../interfaces/BooleanField.md).[`destroy`](../interfaces/BooleanField.md#destroy)

#### Inherited from

[`CoreField`](CoreField.md).[`destroy`](CoreField.md#destroy)

***

### setValueSilently()

> **setValueSilently**(`val`): `void`

Defined in: fields/src/field-definitions/core-field.ts:73

Updates the field's value without triggering the `onChange` event.
Useful for internal synchronization or restoring state where side effects are undesirable.

#### Parameters

##### val

`boolean`

The new value to set.

#### Returns

`void`

#### Implementation of

[`BooleanField`](../interfaces/BooleanField.md).[`setValueSilently`](../interfaces/BooleanField.md#setvaluesilently)

#### Inherited from

[`CoreField`](CoreField.md).[`setValueSilently`](CoreField.md#setvaluesilently)

***

### toggle()

> **toggle**(): `boolean`

Defined in: fields/src/field-definitions/core-boolean-field.ts:14

Inverts the current boolean value (true -> false, false -> true).

#### Returns

`boolean`

The new value after toggling.

#### Implementation of

[`BooleanField`](../interfaces/BooleanField.md).[`toggle`](../interfaces/BooleanField.md#toggle)
