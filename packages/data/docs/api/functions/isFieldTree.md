[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / isFieldTree

# Function: isFieldTree()

> **isFieldTree**(`value`): `value is FieldTree<any>`

Defined in: packages/data/src/fields/guards.ts:24

Type guard that checks if a value is an instance of the `FieldTree` class.
It verifies this by checking the static `typeName` property on the instance.

## Parameters

### value

`unknown`

The value to check.

## Returns

`value is FieldTree<any>`

`true` if the value is a `FieldTree` instance, otherwise `false`.
