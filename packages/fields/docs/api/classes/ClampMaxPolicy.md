[**@axi-engine/fields**](../README.md)

***

[@axi-engine/fields](../README.md) / ClampMaxPolicy

# Class: ClampMaxPolicy

Defined in: field-policies.ts:40

## Implements

- [`FieldPolicy`](../interfaces/FieldPolicy.md)\<`number`\>

## Constructors

### Constructor

> **new ClampMaxPolicy**(`max`): `ClampMaxPolicy`

Defined in: field-policies.ts:44

#### Parameters

##### max

`number`

#### Returns

`ClampMaxPolicy`

## Properties

### id

> `readonly` **id**: `"clampMax"` = `ClampMaxPolicy.id`

Defined in: field-policies.ts:42

#### Implementation of

[`FieldPolicy`](../interfaces/FieldPolicy.md).[`id`](../interfaces/FieldPolicy.md#id)

***

### max

> **max**: `number`

Defined in: field-policies.ts:44

***

### id

> `readonly` `static` **id**: `"clampMax"` = `'clampMax'`

Defined in: field-policies.ts:41

## Methods

### apply()

> **apply**(`val`): `number`

Defined in: field-policies.ts:47

#### Parameters

##### val

`number`

#### Returns

`number`

#### Implementation of

[`FieldPolicy`](../interfaces/FieldPolicy.md).[`apply`](../interfaces/FieldPolicy.md#apply)

***

### updateBounds()

> **updateBounds**(`max`): `void`

Defined in: field-policies.ts:51

#### Parameters

##### max

`number`

#### Returns

`void`
