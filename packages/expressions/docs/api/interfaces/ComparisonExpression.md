[**@axi-engine/expressions**](../README.md)

***

[@axi-engine/expressions](../README.md) / ComparisonExpression

# Interface: ComparisonExpression

Defined in: expressions.ts:27

Represents a comparison between two operands.
It evaluates the left and right operands and compares them using the specified operator.

## Example

```ts
{
 *   "comparison": {
 *     "op": ">=",
 *     "left": { "path": "player.level" },
 *     "right": { "value": 10 }
 *   }
 * }
```

## Properties

### comparison

> **comparison**: `object`

Defined in: expressions.ts:28

#### left

> **left**: [`Operand`](../type-aliases/Operand.md)

#### op

> **op**: [`ComparisonOperationType`](../type-aliases/ComparisonOperationType.md)

#### right

> **right**: [`Operand`](../type-aliases/Operand.md)
