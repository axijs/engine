[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / StringFieldResolver

# Class: StringFieldResolver

Defined in: packages/data/src/store/store-field-resolver.ts:32

## Implements

- [`StoreFieldResolver`](../interfaces/StoreFieldResolver.md)

## Constructors

### Constructor

> **new StringFieldResolver**(): `StringFieldResolver`

#### Returns

`StringFieldResolver`

## Properties

### typeName

> `readonly` **typeName**: `string` = `CoreStringField.typeName`

Defined in: packages/data/src/store/store-field-resolver.ts:33

The typeName this resolver corresponds to in the FieldRegistry.
e.g., 'numeric', 'boolean', 'vector'

#### Implementation of

[`StoreFieldResolver`](../interfaces/StoreFieldResolver.md).[`typeName`](../interfaces/StoreFieldResolver.md#typename)

## Methods

### supports()

> **supports**(`value`): `boolean`

Defined in: packages/data/src/store/store-field-resolver.ts:34

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
