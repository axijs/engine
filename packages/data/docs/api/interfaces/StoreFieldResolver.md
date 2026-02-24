[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / StoreFieldResolver

# Interface: StoreFieldResolver

Defined in: packages/data/src/store/store-field-resolver.ts:4

## Properties

### typeName

> **typeName**: `string`

Defined in: packages/data/src/store/store-field-resolver.ts:9

The typeName this resolver corresponds to in the FieldRegistry.
e.g., 'numeric', 'boolean', 'vector'

## Methods

### supports()

> **supports**(`value`): `boolean`

Defined in: packages/data/src/store/store-field-resolver.ts:16

Checks if this resolver can handle the given value.

#### Parameters

##### value

`unknown`

The value to check.

#### Returns

`boolean`

True if the value is supported, otherwise false.
