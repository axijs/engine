[**@axi-engine/fields**](../README.md)

***

[@axi-engine/fields](../README.md) / ClampMinPolicy

# Class: ClampMinPolicy

Defined in: policy.ts:24

## Implements

- [`FieldPolicy`](../interfaces/FieldPolicy.md)\<`number`\>

## Constructors

### Constructor

> **new ClampMinPolicy**(`min`): `ClampMinPolicy`

Defined in: policy.ts:28

#### Parameters

##### min

`number`

#### Returns

`ClampMinPolicy`

## Properties

### id

> `readonly` **id**: `"clampMin"` = `ClampMinPolicy.id`

Defined in: policy.ts:26

#### Implementation of

[`FieldPolicy`](../interfaces/FieldPolicy.md).[`id`](../interfaces/FieldPolicy.md#id)

***

### min

> **min**: `number`

Defined in: policy.ts:28

***

### id

> `readonly` `static` **id**: `"clampMin"` = `'clampMin'`

Defined in: policy.ts:25

## Methods

### apply()

> **apply**(`val`): `number`

Defined in: policy.ts:31

#### Parameters

##### val

`number`

#### Returns

`number`

#### Implementation of

[`FieldPolicy`](../interfaces/FieldPolicy.md).[`apply`](../interfaces/FieldPolicy.md#apply)

***

### updateBounds()

> **updateBounds**(`min`): `void`

Defined in: policy.ts:35

#### Parameters

##### min

`number`

#### Returns

`void`
