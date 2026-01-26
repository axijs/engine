[**@axi-engine/fields**](../README.md)

***

[@axi-engine/fields](../README.md) / CoreNumericField

# Class: CoreNumericField

Defined in: fields/src/field-definitions/core-numeric-field.ts:19

A specialized Field for handling numeric values.
Provides capabilities for range clamping (min/max) and arithmetic operations.

## Extends

- [`CoreField`](CoreField.md)\<`number`\>

## Implements

- [`NumericField`](../interfaces/NumericField.md)

## Constructors

### Constructor

> **new CoreNumericField**(`name`, `initialVal`, `options?`): `CoreNumericField`

Defined in: fields/src/field-definitions/core-numeric-field.ts:37

#### Parameters

##### name

`string`

##### initialVal

`number`

##### options?

[`CoreNumericFieldOptions`](../interfaces/CoreNumericFieldOptions.md)

#### Returns

`CoreNumericField`

#### Overrides

[`CoreField`](CoreField.md).[`constructor`](CoreField.md#constructor)

## Properties

### onChange

> `readonly` **onChange**: `Subscribable`\<\[`number`, `number`\]\>

Defined in: fields/src/field-definitions/core-field.ts:23

An observable stream that emits an event whenever the value changes.
The payload contains the new value and the old value.

#### Implementation of

[`NumericField`](../interfaces/NumericField.md).[`onChange`](../interfaces/NumericField.md#onchange)

#### Inherited from

[`CoreField`](CoreField.md).[`onChange`](CoreField.md#onchange)

***

### policies

> `readonly` **policies**: [`Policies`](Policies.md)\<`number`\>

Defined in: fields/src/field-definitions/core-field.ts:24

The collection of policies applied to this field.

#### Implementation of

[`NumericField`](../interfaces/NumericField.md).[`policies`](../interfaces/NumericField.md#policies)

#### Inherited from

[`CoreField`](CoreField.md).[`policies`](CoreField.md#policies)

***

### typeName

> `readonly` **typeName**: `string` = `CoreNumericField.typeName`

Defined in: fields/src/field-definitions/core-numeric-field.ts:21

A unique string identifier for the field type (e.g., 'numeric', 'boolean').
Used for serialization and type guards.

#### Implementation of

[`NumericField`](../interfaces/NumericField.md).[`typeName`](../interfaces/NumericField.md#typename)

#### Overrides

[`CoreField`](CoreField.md).[`typeName`](CoreField.md#typename)

***

### typeName

> `readonly` `static` **typeName**: `string` = `'numeric'`

Defined in: fields/src/field-definitions/core-numeric-field.ts:20

A type keyword of the field

#### Overrides

[`CoreField`](CoreField.md).[`typeName`](CoreField.md#typename-1)

## Accessors

### max

#### Get Signature

> **get** **max**(): `number` \| `undefined`

Defined in: fields/src/field-definitions/core-numeric-field.ts:30

The maximum allowed value for this field, or undefined if no upper bound exists.

##### Returns

`number` \| `undefined`

The maximum allowed value for this field, or undefined if no upper bound exists.

#### Implementation of

[`NumericField`](../interfaces/NumericField.md).[`max`](../interfaces/NumericField.md#max)

***

### min

#### Get Signature

> **get** **min**(): `number` \| `undefined`

Defined in: fields/src/field-definitions/core-numeric-field.ts:23

The minimum allowed value for this field, or undefined if no lower bound exists.

##### Returns

`number` \| `undefined`

The minimum allowed value for this field, or undefined if no lower bound exists.

#### Implementation of

[`NumericField`](../interfaces/NumericField.md).[`min`](../interfaces/NumericField.md#min)

***

### name

#### Get Signature

> **get** **name**(): `string`

Defined in: fields/src/field-definitions/core-field.ts:27

The name or key of this field within its parent container.

##### Returns

`string`

The name or key of this field within its parent container.

#### Implementation of

[`NumericField`](../interfaces/NumericField.md).[`name`](../interfaces/NumericField.md#name)

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

[`NumericField`](../interfaces/NumericField.md).[`value`](../interfaces/NumericField.md#value)

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

(`currentValue`) => `number`

A function that transforms the current value into a new one.

#### Returns

`void`

#### Implementation of

[`NumericField`](../interfaces/NumericField.md).[`batchUpdate`](../interfaces/NumericField.md#batchupdate)

#### Inherited from

[`CoreField`](CoreField.md).[`batchUpdate`](CoreField.md#batchupdate)

***

### dec()

> **dec**(`amount`): `void`

Defined in: fields/src/field-definitions/core-numeric-field.ts:63

Decrements the current value by the specified amount.

#### Parameters

##### amount

`number` = `1`

#### Returns

`void`

#### Implementation of

[`NumericField`](../interfaces/NumericField.md).[`dec`](../interfaces/NumericField.md#dec)

***

### destroy()

> **destroy**(): `void`

Defined in: fields/src/field-definitions/core-field.ts:85

Cleans up resources used by the field and its policies.
This should be called when the field is no longer needed to prevent memory leaks from reactive policies.

#### Returns

`void`

#### Implementation of

[`NumericField`](../interfaces/NumericField.md).[`destroy`](../interfaces/NumericField.md#destroy)

#### Inherited from

[`CoreField`](CoreField.md).[`destroy`](CoreField.md#destroy)

***

### inc()

> **inc**(`amount`): `void`

Defined in: fields/src/field-definitions/core-numeric-field.ts:59

Increments the current value by the specified amount.

#### Parameters

##### amount

`number` = `1`

#### Returns

`void`

#### Implementation of

[`NumericField`](../interfaces/NumericField.md).[`inc`](../interfaces/NumericField.md#inc)

***

### isMax()

> **isMax**(): `boolean`

Defined in: fields/src/field-definitions/core-numeric-field.ts:54

Checks if the current value is equal to or greater than the maximum limit.

#### Returns

`boolean`

#### Implementation of

[`NumericField`](../interfaces/NumericField.md).[`isMax`](../interfaces/NumericField.md#ismax)

***

### isMin()

> **isMin**(): `boolean`

Defined in: fields/src/field-definitions/core-numeric-field.ts:49

Checks if the current value is equal to or less than the minimum limit.

#### Returns

`boolean`

#### Implementation of

[`NumericField`](../interfaces/NumericField.md).[`isMin`](../interfaces/NumericField.md#ismin)

***

### setValueSilently()

> **setValueSilently**(`val`): `void`

Defined in: fields/src/field-definitions/core-field.ts:73

Updates the field's value without triggering the `onChange` event.
Useful for internal synchronization or restoring state where side effects are undesirable.

#### Parameters

##### val

`number`

The new value to set.

#### Returns

`void`

#### Implementation of

[`NumericField`](../interfaces/NumericField.md).[`setValueSilently`](../interfaces/NumericField.md#setvaluesilently)

#### Inherited from

[`CoreField`](CoreField.md).[`setValueSilently`](CoreField.md#setvaluesilently)
