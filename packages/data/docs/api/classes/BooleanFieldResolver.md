[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / BooleanFieldResolver

# Class: BooleanFieldResolver

Defined in: packages/data/src/store/store-field-resolver.ts:26

## Implements

- [`StoreFieldResolver`](../interfaces/StoreFieldResolver.md)

## Constructors

### Constructor

> **new BooleanFieldResolver**(): `BooleanFieldResolver`

#### Returns

`BooleanFieldResolver`

## Properties

### typeName

> `readonly` **typeName**: `string` = `CoreBooleanField.typeName`

Defined in: packages/data/src/store/store-field-resolver.ts:27

The typeName this resolver corresponds to in the FieldRegistry.
e.g., 'numeric', 'boolean', 'vector'

#### Implementation of

[`StoreFieldResolver`](../interfaces/StoreFieldResolver.md).[`typeName`](../interfaces/StoreFieldResolver.md#typename)

## Methods

### supports()

> **supports**(`value`): `boolean`

Defined in: packages/data/src/store/store-field-resolver.ts:28

Checks if this resolver can handle the given value.

#### Parameters

##### value

`unknown`

The value to check.

#### Returns

`boolean`

True if the value is supported, otherwise false.

#### Implementation of

[`StoreFieldResolver`](../interfaces/StoreFieldResolver.md).[`supports`](../interfaces/StoreFieldResolver.md#supports)
