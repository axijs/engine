[**@axi-engine/fields**](../README.md)

***

[@axi-engine/fields](../README.md) / NumberField

# Class: NumberField

Defined in: number-field.ts:20

A reactive state container that wraps a value, making it observable through a Preact Signal.
It allows applying a pipeline of transformation or validation "policies" before any new value is set.

## Extends

- [`Field`](Field.md)\<`number`\>

## Constructors

### Constructor

> **new NumberField**(`name`, `initialVal`, `options?`): `NumberField`

Defined in: number-field.ts:45

#### Parameters

##### name

`string`

##### initialVal

`number`

##### options?

[`NumberFieldOptions`](../interfaces/NumberFieldOptions.md)

#### Returns

`NumberField`

#### Overrides

[`Field`](Field.md).[`constructor`](Field.md#constructor)

## Properties

### name

> **name**: `string`

Defined in: field.ts:16

A unique identifier for the field.

#### Inherited from

[`Field`](Field.md).[`name`](Field.md#name)

## Accessors

### isMax

#### Get Signature

> **get** **isMax**(): `boolean`

Defined in: number-field.ts:40

##### Returns

`boolean`

***

### isMin

#### Get Signature

> **get** **isMin**(): `boolean`

Defined in: number-field.ts:35

##### Returns

`boolean`

***

### max

#### Get Signature

> **get** **max**(): `number` \| `undefined`

Defined in: number-field.ts:28

##### Returns

`number` \| `undefined`

***

### min

#### Get Signature

> **get** **min**(): `number` \| `undefined`

Defined in: number-field.ts:21

##### Returns

`number` \| `undefined`

***

### signal

#### Get Signature

> **get** **signal**(): `ReadonlySignal`\<`T`\>

Defined in: field.ts:44

Provides readonly access to the underlying Preact Signal.
Subscribe to this signal to react to value changes.

##### Returns

`ReadonlySignal`\<`T`\>

#### Inherited from

[`Field`](Field.md).[`signal`](Field.md#signal)

***

### val

#### Get Signature

> **get** **val**(): `T`

Defined in: field.ts:36

Gets the current raw value of the field.
For reactive updates, it's recommended to use the `.signal` property instead.

##### Returns

`T`

#### Inherited from

[`Field`](Field.md).[`val`](Field.md#val)

## Methods

### addPolicy()

> **addPolicy**(`policy`): `void`

Defined in: field.ts:76

Adds a new policy to the field or replaces an existing one with the same ID.
The new policy will be applied on the next `set()` operation.
If a policy with the same ID already exists, its `destroy` method will be called before it is replaced.

#### Parameters

##### policy

[`FieldPolicy`](../interfaces/FieldPolicy.md)\<`number`\>

The policy instance to add.

#### Returns

`void`

#### Inherited from

[`Field`](Field.md).[`addPolicy`](Field.md#addpolicy)

***

### clearPolicies()

> **clearPolicies**(): `void`

Defined in: field.ts:101

Removes all policies from the field.
After this, `set()` will no longer apply any transformations to the value until new policies are added.

#### Returns

`void`

#### Inherited from

[`Field`](Field.md).[`clearPolicies`](Field.md#clearpolicies)

***

### dec()

> **dec**(`amount`): `void`

Defined in: number-field.ts:61

#### Parameters

##### amount

`number` = `1`

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

#### Inherited from

[`Field`](Field.md).[`destroy`](Field.md#destroy)

***

### getPolicy()

> **getPolicy**\<`P`\>(`id`): `P` \| `undefined`

Defined in: field.ts:66

Retrieves a specific policy instance by its ID.
Useful for accessing a policy's internal state or methods.

#### Type Parameters

##### P

`P` *extends* [`FieldPolicy`](../interfaces/FieldPolicy.md)\<`number`\>

The expected type of the policy.

#### Parameters

##### id

`string`

The unique ID of the policy to retrieve.

#### Returns

`P` \| `undefined`

The policy instance, or `undefined` if not found.

#### Inherited from

[`Field`](Field.md).[`getPolicy`](Field.md#getpolicy)

***

### inc()

> **inc**(`amount`): `void`

Defined in: number-field.ts:57

#### Parameters

##### amount

`number` = `1`

#### Returns

`void`

***

### reapplyPolicies()

> **reapplyPolicies**(): `void`

Defined in: field.ts:110

Forces the current value to be re-processed by all policies.
Useful if a policy's logic has changed and you need to re-evaluate the current state.

#### Returns

`void`

#### Inherited from

[`Field`](Field.md).[`reapplyPolicies`](Field.md#reapplypolicies)

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

#### Inherited from

[`Field`](Field.md).[`removePolicy`](Field.md#removepolicy)

***

### set()

> **set**(`val`): `void`

Defined in: field.ts:53

Sets a new value for the field.
The provided value will be processed by all registered policies before the underlying signal is updated.

#### Parameters

##### val

`number`

The new value to set.

#### Returns

`void`

#### Inherited from

[`Field`](Field.md).[`set`](Field.md#set)
