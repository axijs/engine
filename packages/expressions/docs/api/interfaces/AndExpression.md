[**@axi-engine/expressions**](../README.md)

***

[@axi-engine/expressions](../README.md) / AndExpression

# Interface: AndExpression

Defined in: expressions.ts:54

Represents a logical AND operation.
It evaluates an array of child expressions and resolves to `true` only if
*all* of them resolve to `true`.

## Example

```ts
{
 *   "and": [
 *     { "exists": "player.key" },
 *     { "comparison": { "op": "==", "left": { "path": "gate.locked" }, "right": { "value": true } } }
 *   ]
 * }
```

## Properties

### and

> **and**: [`Expression`](../type-aliases/Expression.md)[]

Defined in: expressions.ts:55
