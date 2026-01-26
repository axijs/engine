[**@axi-engine/fields**](../README.md)

***

[@axi-engine/fields](../README.md) / Policies

# Class: Policies\<T\>

Defined in: fields/src/policies/policies.ts:4

## Type Parameters

### T

`T`

## Constructors

### Constructor

> **new Policies**\<`T`\>(): `Policies`\<`T`\>

#### Returns

`Policies`\<`T`\>

## Accessors

### items

#### Get Signature

> **get** **items**(): `Map`\<`string`, [`Policy`](../interfaces/Policy.md)\<`T`\>\>

Defined in: fields/src/policies/policies.ts:7

##### Returns

`Map`\<`string`, [`Policy`](../interfaces/Policy.md)\<`T`\>\>

## Methods

### add()

> **add**(`policy`): `Policies`\<`T`\>

Defined in: fields/src/policies/policies.ts:28

Adds a new policy to the field or replaces an existing one with the same ID.
The new policy will be applied on the next `set()` operation.
If a policy with the same ID already exists, its `destroy` method will be called before it is replaced.

#### Parameters

##### policy

[`Policy`](../interfaces/Policy.md)\<`T`\>

The policy instance to add.

#### Returns

`Policies`\<`T`\>

***

### apply()

> **apply**(`val`): `T`

Defined in: fields/src/policies/policies.ts:67

Forces the current value to be re-processed by all policies.
Useful if a policy's logic has changed and you need to re-evaluate the current state.

#### Parameters

##### val

`T`

#### Returns

`T`

***

### clear()

> **clear**(): `void`

Defined in: fields/src/policies/policies.ts:58

Removes all policies from the field.
After this, `set()` will no longer apply any transformations to the value until new policies are added.

#### Returns

`void`

***

### get()

> **get**\<`P`\>(`id`): `P` \| `undefined`

Defined in: fields/src/policies/policies.ts:18

Retrieves a specific policy instance by its ID.
Useful for accessing a policy's internal state or methods.

#### Type Parameters

##### P

`P` *extends* [`Policy`](../interfaces/Policy.md)\<`T`\>

The expected type of the policy.

#### Parameters

##### id

`string`

The unique ID of the policy to retrieve.

#### Returns

`P` \| `undefined`

The policy instance, or `undefined` if not found.

***

### isEmpty()

> **isEmpty**(): `boolean`

Defined in: fields/src/policies/policies.ts:50

#### Returns

`boolean`

***

### remove()

> **remove**(`policyId`): `boolean`

Defined in: fields/src/policies/policies.ts:41

Removes a policy from the field by its ID and call `destroy` method.

#### Parameters

##### policyId

`string`

The unique ID of the policy to remove.

#### Returns

`boolean`

`true` if the policy was found and removed, otherwise `false`.
