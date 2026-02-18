[**@axi-engine/expressions**](../README.md)

***

[@axi-engine/expressions](../README.md) / resolveMath

# Function: resolveMath()

> **resolveMath**(`op`, `left`, `right`): `number`

Defined in: resolve-math.ts:23

A safe utility function that performs a basic mathematical operation on two operands.

This function includes built-in type checking. It first ensures
that both `left` and `right` operands are numbers before performing the calculation.
If the type check fails or if an unsupported operator is provided, it will throw
a descriptive error.

## Parameters

### op

[`MathOperationType`](../type-aliases/MathOperationType.md)

The mathematical operator to apply ('+', '-', '*', '/').

### left

`unknown`

The left-hand operand. It is validated to be a number.

### right

`unknown`

The right-hand operand. It is validated to be a number.

## Returns

`number`

The numerical result of the calculation.

## Throws

If either `left` or `right` is not a number.

## Throws

If the `op` is not a recognized `MathOperationType`.

## Example

```ts
const result = resolveMath('+', 10, 5); // returns 15
const product = resolveMath('*', 2, 3); // returns 6
```
