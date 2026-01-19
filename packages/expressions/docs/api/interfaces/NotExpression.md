[**@axi-engine/expressions**](../README.md)

***

[@axi-engine/expressions](../README.md) / NotExpression

# Interface: NotExpression

Defined in: expressions.ts:82

Represents a logical NOT operation.
It evaluates a single child expression and inverts its boolean result.

## Example

```ts
{
 *   "not": { "exists": "player.effects.poison" }
 * }
```

## Properties

### not

> **not**: [`Expression`](../type-aliases/Expression.md)

Defined in: expressions.ts:83
