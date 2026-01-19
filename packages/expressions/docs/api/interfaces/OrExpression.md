[**@axi-engine/expressions**](../README.md)

***

[@axi-engine/expressions](../README.md) / OrExpression

# Interface: OrExpression

Defined in: expressions.ts:70

Represents a logical OR operation.
It evaluates an array of child expressions and resolves to `true` if
*at least one* of them resolves to `true`.

## Example

```ts
{
 *   "or": [
 *     { "exists": "player.key" },
 *     { "exists": "player.gun" }
 *   ]
 * }
```

## Properties

### or

> **or**: [`Expression`](../type-aliases/Expression.md)[]

Defined in: expressions.ts:71
