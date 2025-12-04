[**@axi-engine/fields**](../README.md)

***

[@axi-engine/fields](../README.md) / ClampPolicy

# Class: ClampPolicy

Defined in: policy.ts:7

## Implements

- [`FieldPolicy`](../interfaces/FieldPolicy.md)\<`number`\>

## Constructors

### Constructor

> **new ClampPolicy**(`min`, `max`): `ClampPolicy`

Defined in: policy.ts:11

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

Defined in: policy.ts:9

#### Implementation of

[`FieldPolicy`](../interfaces/FieldPolicy.md).[`id`](../interfaces/FieldPolicy.md#id)

***

### max

> **max**: `number`

Defined in: policy.ts:11

***

### min

> **min**: `number`

Defined in: policy.ts:11

***

### id

> `readonly` `static` **id**: `"clamp"` = `'clamp'`

Defined in: policy.ts:8

## Methods

### apply()

> **apply**(`val`): `number`

Defined in: policy.ts:14

#### Parameters

##### val

`number`

#### Returns

`number`

#### Implementation of

[`FieldPolicy`](../interfaces/FieldPolicy.md).[`apply`](../interfaces/FieldPolicy.md#apply)

***

### updateBounds()

> **updateBounds**(`min`, `max`): `void`

Defined in: policy.ts:18

#### Parameters

##### min

`number`

##### max

`number`

#### Returns

`void`
