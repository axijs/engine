[**@axi-engine/fields**](../README.md)

***

[@axi-engine/fields](../README.md) / ClampMaxPolicy

# Class: ClampMaxPolicy

Defined in: fields/src/policies/clamp-max-policy.ts:3

## Implements

- [`Policy`](../interfaces/Policy.md)\<`number`\>

## Constructors

### Constructor

> **new ClampMaxPolicy**(`max`): `ClampMaxPolicy`

Defined in: fields/src/policies/clamp-max-policy.ts:7

#### Parameters

##### max

`number`

#### Returns

`ClampMaxPolicy`

## Properties

### id

> `readonly` **id**: `"clampMax"` = `ClampMaxPolicy.id`

Defined in: fields/src/policies/clamp-max-policy.ts:5

#### Implementation of

[`Policy`](../interfaces/Policy.md).[`id`](../interfaces/Policy.md#id)

***

### max

> **max**: `number`

Defined in: fields/src/policies/clamp-max-policy.ts:7

***

### id

> `readonly` `static` **id**: `"clampMax"` = `'clampMax'`

Defined in: fields/src/policies/clamp-max-policy.ts:4

## Methods

### apply()

> **apply**(`val`): `number`

Defined in: fields/src/policies/clamp-max-policy.ts:10

#### Parameters

##### val

`number`

#### Returns

`number`

#### Implementation of

[`Policy`](../interfaces/Policy.md).[`apply`](../interfaces/Policy.md#apply)

***

### updateBounds()

> **updateBounds**(`max`): `void`

Defined in: fields/src/policies/clamp-max-policy.ts:14

#### Parameters

##### max

`number`

#### Returns

`void`
