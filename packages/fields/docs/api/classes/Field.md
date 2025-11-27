[**@axi-engine/fields**](../README.md)

***

[@axi-engine/fields](../README.md) / Field

# Class: Field\<T\>

Defined in: field.ts:11

A reactive state container that wraps a value, making it observable through a Preact Signal.
It allows applying a pipeline of transformation or validation "policies" before any new value is set.

## Extended by

- [`NumberField`](NumberField.md)

## Type Parameters

### T

`T`

The type of the value this field holds.

## Constructors

### Constructor

> **new Field**\<`T`\>(`name`, `initialVal`, `options?`): `Field`\<`T`\>

Defined in: field.ts:25

Creates an instance of a Field.

#### Parameters

##### name

`string`

A unique identifier for the field.

##### initialVal

`T`

The initial value of the field.

##### options?

Optional configuration for the field.

###### policies?

[`FieldPolicy`](../interfaces/FieldPolicy.md)\<`T`\>[]

An array of policies to apply to the field's value on every `set` operation.

#### Returns

`Field`\<`T`\>

## Properties

### name

> **name**: `string`

Defined in: field.ts:16

A unique identifier for the field.

## Accessors

### signal

#### Get Signature

> **get** **signal**(): `ReadonlySignal`\<`T`\>

Defined in: field.ts:44

Provides readonly access to the underlying Preact Signal.
Subscribe to this signal to react to value changes.

##### Returns

`ReadonlySignal`\<`T`\>

***

### val

#### Get Signature

> **get** **val**(): `T`

Defined in: field.ts:36

Gets the current raw value of the field.
For reactive updates, it's recommended to use the `.signal` property instead.

##### Returns

`T`

## Methods

### addPolicy()

> **addPolicy**(`policy`): `void`

Defined in: field.ts:76

Adds a new policy to the field or replaces an existing one with the same ID.
The new policy will be applied on the next `set()` operation.
If a policy with the same ID already exists, its `destroy` method will be called before it is replaced.

#### Parameters

##### policy

[`FieldPolicy`](../interfaces/FieldPolicy.md)\<`T`\>

The policy instance to add.

#### Returns

`void`

***

### clearPolicies()

> **clearPolicies**(): `void`

Defined in: field.ts:101

Removes all policies from the field.
After this, `set()` will no longer apply any transformations to the value until new policies are added.

#### Returns

`void`

***

### destroy()

> **destroy**(): `void`

Defined in: field.ts:118

Cleans up resources used by the field and its policies.
This should be called when the field is no longer needed to prevent memory leaks from reactive policies.

#### Returns

`void`

***

### getPolicy()

> **getPolicy**\<`P`\>(`id`): `P` \| `undefined`

Defined in: field.ts:66

Retrieves a specific policy instance by its ID.
Useful for accessing a policy's internal state or methods.

#### Type Parameters

##### P

`P` *extends* [`FieldPolicy`](../interfaces/FieldPolicy.md)\<`T`\>

The expected type of the policy.

#### Parameters

##### id

`string`

The unique ID of the policy to retrieve.

#### Returns

`P` \| `undefined`

The policy instance, or `undefined` if not found.

***

### reapplyPolicies()

> **reapplyPolicies**(): `void`

Defined in: field.ts:110

Forces the current value to be re-processed by all policies.
Useful if a policy's logic has changed and you need to re-evaluate the current state.

#### Returns

`void`

***

### removePolicy()

> **removePolicy**(`policyId`): `boolean`

Defined in: field.ts:88

Removes a policy from the field by its ID and call `destroy` method.

#### Parameters

##### policyId

`string`

The unique ID of the policy to remove.

#### Returns

`boolean`

`true` if the policy was found and removed, otherwise `false`.

***

### set()

> **set**(`val`): `void`

Defined in: field.ts:53

Sets a new value for the field.
The provided value will be processed by all registered policies before the underlying signal is updated.

#### Parameters

##### val

`T`

The new value to set.

#### Returns

`void`
