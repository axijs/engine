[**@axi-engine/expressions**](../README.md)

***

[@axi-engine/expressions](../README.md) / resolveOperandAsScalar

# Function: resolveOperandAsScalar()

> **resolveOperandAsScalar**(`op`, `source`): `ScalarType`

Defined in: resolve-operand.ts:62

Resolves an operand and asserts that the result is a `ScalarType`.

This function acts as a type-safe convenience wrapper around the more generic
`resolveOperand` function. It is the preferred way to resolve operands within
expression handlers that are designed to work only with scalar values
(string, number, or boolean), as it centralizes type checking.

## Parameters

### op

[`Operand`](../type-aliases/Operand.md)

The `Operand` object to resolve.

### source

`DataSource`

The `DataSource` used to look up values for reference operands.

## Returns

`ScalarType`

The resolved scalar value.

## Throws

If the resolved value from the operand is not a `ScalarType`
(e.g., it's an object, array, or undefined).
