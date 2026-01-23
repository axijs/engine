[**@axi-engine/utils**](../README.md)

***

[@axi-engine/utils](../README.md) / isObject

# Function: isObject()

> **isObject**(`value`): `value is Record<PropertyKey, unknown>`

Defined in: guards.ts:74

Check if a value is a plain object.
Correctly handles `null` and arrays, returning `false` for them.

## Parameters

### value

`unknown`

The value to check.

## Returns

`value is Record<PropertyKey, unknown>`

`true` if the value is a non-null, non-array object.
