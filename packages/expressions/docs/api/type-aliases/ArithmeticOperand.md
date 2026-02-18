[**@axi-engine/expressions**](../README.md)

***

[@axi-engine/expressions](../README.md) / ArithmeticOperand

# Type Alias: ArithmeticOperand

> **ArithmeticOperand** = `object`

Defined in: types.ts:33

Represents an operand that is a mathematical calculation.
The result of this calculation is used as the operand's value.

## Example

```ts
// Represents the expression: player.hp + 10
{
  "arithmetic": {
    "op": "+",
    "left": { "path": "player.hp" },
    "right": { "value": 10 }
  }
}
```

## Properties

### arithmetic

> **arithmetic**: `object`

Defined in: types.ts:34

#### left

> **left**: [`Operand`](Operand.md)

#### op

> **op**: [`MathOperationType`](MathOperationType.md)

#### right

> **right**: [`Operand`](Operand.md)
