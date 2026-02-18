[**@axi-engine/expressions**](../README.md)

***

[@axi-engine/expressions](../README.md) / resolveOperand

# Function: resolveOperand()

> **resolveOperand**(`op`, `source`): `unknown`

Defined in: resolve-operand.ts:21

Recursively resolves an Operand into its final scalar value.

This function processes different types of operands:
- `ValueOperand`: Returns the direct value.
- `ReferenceOperand`: Looks up the value from the provided data source using its path.
- `ArithmeticOperand`: Recursively resolves its left and right sides and then performs the calculation.

## Parameters

### op

[`Operand`](../type-aliases/Operand.md)

The `Operand` object to resolve. This can be a direct value, a path reference, or a nested arithmetic operation.

### source

`DataSource`

The `DataSource` used to look up values for `ReferenceOperand` types.

## Returns

`unknown`

unknown.

## Throws

If a `ReferenceOperand` points to a path that does not resolve to a scalar value.

## Throws

If an `ArithmeticOperand` is used with non-numeric values.

## Throws

If an unknown or unsupported operand type is provided.
