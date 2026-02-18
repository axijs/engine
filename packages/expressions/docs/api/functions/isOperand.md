[**@axi-engine/expressions**](../README.md)

***

[@axi-engine/expressions](../README.md) / isOperand

# Function: isOperand()

> **isOperand**(`val`): `val is Operand`

Defined in: guards.ts:44

Type guard that checks if a value is any valid `Operand` type.

## Parameters

### val

`unknown`

The value to check.

## Returns

`val is Operand`

`true` if the value is a `ValueOperand`, `ReferenceOperand`,
or `ArithmeticOperand`, otherwise `false`.
