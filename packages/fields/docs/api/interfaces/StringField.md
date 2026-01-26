[**@axi-engine/fields**](../README.md)

***

[@axi-engine/fields](../README.md) / StringField

# Interface: StringField

Defined in: fields/src/field.ts:125

A specialized Field for handling string values.
Provides chainable methods for common string manipulations.

## Extends

- [`Field`](Field.md)\<`string`\>

## Properties

### name

> `readonly` **name**: `string`

Defined in: fields/src/field.ts:34

The name or key of this field within its parent container.

#### Inherited from

[`Field`](Field.md).[`name`](Field.md#name)

***

### onChange

> **onChange**: `Subscribable`\<\[`string`, `string`\]\>

Defined in: fields/src/field.ts:66

An observable stream that emits an event whenever the value changes.
The payload contains the new value and the old value.

#### Inherited from

[`Field`](Field.md).[`onChange`](Field.md#onchange)

***

### policies

> **policies**: [`Policies`](../classes/Policies.md)\<`string`\>

Defined in: fields/src/field.ts:46

The collection of policies applied to this field.

#### Inherited from

[`Field`](Field.md).[`policies`](Field.md#policies)

***

### typeName

> `readonly` **typeName**: `string`

Defined in: fields/src/field.ts:29

A unique string identifier for the field type (e.g., 'numeric', 'boolean').
Used for serialization and type guards.

#### Inherited from

[`Field`](Field.md).[`typeName`](Field.md#typename)

***

### value

> **value**: `string`

Defined in: fields/src/field.ts:41

The current value of the field.
Assigning a new value triggers policies and emits the `onChange` event
if the value is different from the current one.

#### Inherited from

[`Field`](Field.md).[`value`](Field.md#value)

## Methods

### append()

> **append**(`str`): `this`

Defined in: fields/src/field.ts:131

Appends a string or number to the end of the current value.

#### Parameters

##### str

The value to append.

`string` | `number`

#### Returns

`this`

The field instance for chaining.

***

### batchUpdate()

> **batchUpdate**(`updateFn`): `void`

Defined in: fields/src/field.ts:60

Performs an atomic-like update using a callback function.
The callback receives the current value and should return the new value.

#### Parameters

##### updateFn

(`currentValue`) => `string`

A function that transforms the current value into a new one.

#### Returns

`void`

#### Inherited from

[`Field`](Field.md).[`batchUpdate`](Field.md#batchupdate)

***

### clear()

> **clear**(): `void`

Defined in: fields/src/field.ts:155

Sets the value to an empty string.

#### Returns

`void`

***

### destroy()

> **destroy**(): `void`

Defined in: fields/src/field.ts:72

Cleans up the field, removing all listeners and releasing resources.
Should be called when the field is no longer needed.

#### Returns

`void`

#### Inherited from

[`Field`](Field.md).[`destroy`](Field.md#destroy)

***

### isEmpty()

> **isEmpty**(): `boolean`

Defined in: fields/src/field.ts:150

Checks if the current string is empty (length is 0).

#### Returns

`boolean`

`true` if the string is empty, otherwise `false`.

***

### prepend()

> **prepend**(`str`): `this`

Defined in: fields/src/field.ts:138

Prepends a string or number to the beginning of the current value.

#### Parameters

##### str

The value to prepend.

`string` | `number`

#### Returns

`this`

The field instance for chaining.

***

### setValueSilently()

> **setValueSilently**(`val`): `void`

Defined in: fields/src/field.ts:53

Updates the field's value without triggering the `onChange` event.
Useful for internal synchronization or restoring state where side effects are undesirable.

#### Parameters

##### val

`string`

The new value to set.

#### Returns

`void`

#### Inherited from

[`Field`](Field.md).[`setValueSilently`](Field.md#setvaluesilently)

***

### trim()

> **trim**(): `this`

Defined in: fields/src/field.ts:144

Removes whitespace from both ends of the current string value.

#### Returns

`this`

The field instance for chaining.
