[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / Field

# Interface: Field\<T\>

Defined in: data/src/field.ts:24

Represents a reactive data holder for a specific value type.

A Field wraps a raw value, providing features like change observation (`onChange`),
policy enforcement (validation/transformation), and metadata management (`name`, `typeName`).

## Extended by

- [`NumericField`](NumericField.md)
- [`BooleanField`](BooleanField.md)
- [`StringField`](StringField.md)

## Type Parameters

### T

`T`

The type of the value stored in the field.

## Properties

### name

> `readonly` **name**: `string`

Defined in: data/src/field.ts:34

The name or key of this field within its parent container.

***

### onChange

> **onChange**: `Subscribable`\<\[`T`, `T`\]\>

Defined in: data/src/field.ts:66

An observable stream that emits an event whenever the value changes.
The payload contains the new value and the old value.

***

### policies

> **policies**: [`Policies`](../classes/Policies.md)\<`T`\>

Defined in: data/src/field.ts:46

The collection of policies applied to this field.

***

### typeName

> `readonly` **typeName**: `string`

Defined in: data/src/field.ts:29

A unique string identifier for the field type (e.g., 'numeric', 'boolean').
Used for serialization and type guards.

***

### value

> **value**: `T`

Defined in: data/src/field.ts:41

The current value of the field.
Assigning a new value triggers policies and emits the `onChange` event
if the value is different from the current one.

## Methods

### batchUpdate()

> **batchUpdate**(`updateFn`): `void`

Defined in: data/src/field.ts:60

Performs an atomic-like update using a callback function.
The callback receives the current value and should return the new value.

#### Parameters

##### updateFn

(`currentValue`) => `T`

A function that transforms the current value into a new one.

#### Returns

`void`

***

### destroy()

> **destroy**(): `void`

Defined in: data/src/field.ts:72

Cleans up the field, removing all listeners and releasing resources.
Should be called when the field is no longer needed.

#### Returns

`void`

***

### setValueSilently()

> **setValueSilently**(`val`): `void`

Defined in: data/src/field.ts:53

Updates the field's value without triggering the `onChange` event.
Useful for internal synchronization or restoring state where side effects are undesirable.

#### Parameters

##### val

`T`

The new value to set.

#### Returns

`void`
