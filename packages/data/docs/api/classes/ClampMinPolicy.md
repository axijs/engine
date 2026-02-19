[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / ClampMinPolicy

# Class: ClampMinPolicy

Defined in: data/src/policies/clamp-min-policy.ts:3

## Implements

- [`Policy`](../interfaces/Policy.md)\<`number`\>

## Constructors

### Constructor

> **new ClampMinPolicy**(`min`): `ClampMinPolicy`

Defined in: data/src/policies/clamp-min-policy.ts:7

#### Parameters

##### min

`number`

#### Returns

`ClampMinPolicy`

## Properties

### id

> `readonly` **id**: `"clampMin"` = `ClampMinPolicy.id`

Defined in: data/src/policies/clamp-min-policy.ts:5

#### Implementation of

[`Policy`](../interfaces/Policy.md).[`id`](../interfaces/Policy.md#id)

***

### min

> **min**: `number`

Defined in: data/src/policies/clamp-min-policy.ts:7

***

### id

> `readonly` `static` **id**: `"clampMin"` = `'clampMin'`

Defined in: data/src/policies/clamp-min-policy.ts:4

## Methods

### apply()

> **apply**(`val`): `number`

Defined in: data/src/policies/clamp-min-policy.ts:10

#### Parameters

##### val

`number`

#### Returns

`number`

#### Implementation of

[`Policy`](../interfaces/Policy.md).[`apply`](../interfaces/Policy.md#apply)

***

### updateBounds()

> **updateBounds**(`min`): `void`

Defined in: data/src/policies/clamp-min-policy.ts:14

#### Parameters

##### min

`number`

#### Returns

`void`
