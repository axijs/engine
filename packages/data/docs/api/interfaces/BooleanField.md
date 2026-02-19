[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / BooleanField

# Interface: BooleanField

Defined in: data/src/field.ts:113

A specialized Field for handling boolean values.
Provides toggle functionality.

## Extends

- [`Field`](Field.md)\<`boolean`\>

## Properties

### name

> `readonly` **name**: `string`

Defined in: data/src/field.ts:34

The name or key of this field within its parent container.

#### Inherited from

[`Field`](Field.md).[`name`](Field.md#name)

***

### onChange

> **onChange**: `Subscribable`\<\[`boolean`, `boolean`\]\>

Defined in: data/src/field.ts:66

An observable stream that emits an event whenever the value changes.
The payload contains the new value and the old value.

#### Inherited from

[`Field`](Field.md).[`onChange`](Field.md#onchange)

***

### policies

> **policies**: [`Policies`](../classes/Policies.md)\<`boolean`\>

Defined in: data/src/field.ts:46

The collection of policies applied to this field.

#### Inherited from

[`Field`](Field.md).[`policies`](Field.md#policies)

***

### typeName

> `readonly` **typeName**: `string`

Defined in: data/src/field.ts:29

A unique string identifier for the field type (e.g., 'numeric', 'boolean').
Used for serialization and type guards.

#### Inherited from

[`Field`](Field.md).[`typeName`](Field.md#typename)

***

### value

> **value**: `boolean`

Defined in: data/src/field.ts:41

The current value of the field.
Assigning a new value triggers policies and emits the `onChange` event
if the value is different from the current one.

#### Inherited from

[`Field`](Field.md).[`value`](Field.md#value)

## Methods

### batchUpdate()

> **batchUpdate**(`updateFn`): `void`

Defined in: data/src/field.ts:60

Performs an atomic-like update using a callback function.
The callback receives the current value and should return the new value.

#### Parameters

##### updateFn

(`currentValue`) => `boolean`

A function that transforms the current value into a new one.

#### Returns

`void`

#### Inherited from

[`Field`](Field.md).[`batchUpdate`](Field.md#batchupdate)

***

### destroy()

> **destroy**(): `void`

Defined in: data/src/field.ts:72

Cleans up the field, removing all listeners and releasing resources.
Should be called when the field is no longer needed.

#### Returns

`void`

#### Inherited from

[`Field`](Field.md).[`destroy`](Field.md#destroy)

***

### setValueSilently()

> **setValueSilently**(`val`): `void`

Defined in: data/src/field.ts:53

Updates the field's value without triggering the `onChange` event.
Useful for internal synchronization or restoring state where side effects are undesirable.

#### Parameters

##### val

`boolean`

The new value to set.

#### Returns

`void`

#### Inherited from

[`Field`](Field.md).[`setValueSilently`](Field.md#setvaluesilently)

***

### toggle()

> **toggle**(): `boolean`

Defined in: data/src/field.ts:118

Inverts the current boolean value (true -> false, false -> true).

#### Returns

`boolean`

The new value after toggling.
