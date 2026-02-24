[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / NumericField

# Interface: NumericField

Defined in: packages/data/src/fields/field.ts:79

A specialized Field for handling numeric values.
Provides capabilities for range clamping (min/max) and arithmetic operations.

## Extends

- [`Field`](Field.md)\<`number`\>

## Properties

### max

> `readonly` **max**: `number` \| `undefined`

Defined in: packages/data/src/fields/field.ts:84

The maximum allowed value for this field, or undefined if no upper bound exists.

***

### min

> `readonly` **min**: `number` \| `undefined`

Defined in: packages/data/src/fields/field.ts:81

The minimum allowed value for this field, or undefined if no lower bound exists.

***

### name

> `readonly` **name**: `string`

Defined in: packages/data/src/fields/field.ts:34

The name or key of this field within its parent container.

#### Inherited from

[`Field`](Field.md).[`name`](Field.md#name)

***

### onChange

> **onChange**: `Subscribable`\<\[`number`, `number`\]\>

Defined in: packages/data/src/fields/field.ts:66

An observable stream that emits an event whenever the value changes.
The payload contains the new value and the old value.

#### Inherited from

[`Field`](Field.md).[`onChange`](Field.md#onchange)

***

### policies

> **policies**: [`Policies`](../classes/Policies.md)\<`number`\>

Defined in: packages/data/src/fields/field.ts:46

The collection of policies applied to this field.

#### Inherited from

[`Field`](Field.md).[`policies`](Field.md#policies)

***

### typeName

> `readonly` **typeName**: `string`

Defined in: packages/data/src/fields/field.ts:29

A unique string identifier for the field type (e.g., 'numeric', 'boolean').
Used for serialization and type guards.

#### Inherited from

[`Field`](Field.md).[`typeName`](Field.md#typename)

***

### value

> **value**: `number`

Defined in: packages/data/src/fields/field.ts:41

The current value of the field.
Assigning a new value triggers policies and emits the `onChange` event
if the value is different from the current one.

#### Inherited from

[`Field`](Field.md).[`value`](Field.md#value)

## Methods

### batchUpdate()

> **batchUpdate**(`updateFn`): `void`

Defined in: packages/data/src/fields/field.ts:60

Performs an atomic-like update using a callback function.
The callback receives the current value and should return the new value.

#### Parameters

##### updateFn

(`currentValue`) => `number`

A function that transforms the current value into a new one.

#### Returns

`void`

#### Inherited from

[`Field`](Field.md).[`batchUpdate`](Field.md#batchupdate)

***

### dec()

> **dec**(`val`): `void`

Defined in: packages/data/src/fields/field.ts:106

Decrements the current value by the specified amount.

#### Parameters

##### val

`number`

The amount to subtract.

#### Returns

`void`

***

### destroy()

> **destroy**(): `void`

Defined in: packages/data/src/fields/field.ts:72

Cleans up the field, removing all listeners and releasing resources.
Should be called when the field is no longer needed.

#### Returns

`void`

#### Inherited from

[`Field`](Field.md).[`destroy`](Field.md#destroy)

***

### inc()

> **inc**(`val`): `void`

Defined in: packages/data/src/fields/field.ts:100

Increments the current value by the specified amount.

#### Parameters

##### val

`number`

The amount to add.

#### Returns

`void`

***

### isMax()

> **isMax**(): `boolean`

Defined in: packages/data/src/fields/field.ts:94

Checks if the current value is equal to or greater than the maximum limit.

#### Returns

`boolean`

***

### isMin()

> **isMin**(): `boolean`

Defined in: packages/data/src/fields/field.ts:89

Checks if the current value is equal to or less than the minimum limit.

#### Returns

`boolean`

***

### setValueSilently()

> **setValueSilently**(`val`): `void`

Defined in: packages/data/src/fields/field.ts:53

Updates the field's value without triggering the `onChange` event.
Useful for internal synchronization or restoring state where side effects are undesirable.

#### Parameters

##### val

`number`

The new value to set.

#### Returns

`void`

#### Inherited from

[`Field`](Field.md).[`setValueSilently`](Field.md#setvaluesilently)
