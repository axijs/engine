[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / ClampPolicy

# Class: ClampPolicy

Defined in: data/src/policies/clamp-policy.ts:3

## Implements

- [`Policy`](../interfaces/Policy.md)\<`number`\>

## Constructors

### Constructor

> **new ClampPolicy**(`min`, `max`): `ClampPolicy`

Defined in: data/src/policies/clamp-policy.ts:7

#### Parameters

##### min

`number`

##### max

`number`

#### Returns

`ClampPolicy`

## Properties

### id

> `readonly` **id**: `"clamp"` = `ClampPolicy.id`

Defined in: data/src/policies/clamp-policy.ts:5

#### Implementation of

[`Policy`](../interfaces/Policy.md).[`id`](../interfaces/Policy.md#id)

***

### max

> **max**: `number`

Defined in: data/src/policies/clamp-policy.ts:7

***

### min

> **min**: `number`

Defined in: data/src/policies/clamp-policy.ts:7

***

### id

> `readonly` `static` **id**: `"clamp"` = `'clamp'`

Defined in: data/src/policies/clamp-policy.ts:4

## Methods

### apply()

> **apply**(`val`): `number`

Defined in: data/src/policies/clamp-policy.ts:10

#### Parameters

##### val

`number`

#### Returns

`number`

#### Implementation of

[`Policy`](../interfaces/Policy.md).[`apply`](../interfaces/Policy.md#apply)

***

### updateBounds()

> **updateBounds**(`min`, `max`): `void`

Defined in: data/src/policies/clamp-policy.ts:14

#### Parameters

##### min

`number`

##### max

`number`

#### Returns

`void`
