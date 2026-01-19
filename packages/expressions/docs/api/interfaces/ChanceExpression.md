[**@axi-engine/expressions**](../README.md)

***

[@axi-engine/expressions](../README.md) / ChanceExpression

# Interface: ChanceExpression

Defined in: expressions.ts:97

Represents a probabilistic expression that resolves to `true` or `false`
based on a given chance.
The operand should resolve to a number between 0 and 100. step 0.01

## Examples

```ts
// 15% chance to be true
{ "chance": { "value": 15 } }
```

```ts
// Chance is determined by the player's luck stat
{ "chance": { "path": "player.stats.luck" } }
```

## Properties

### chance

> **chance**: [`Operand`](../type-aliases/Operand.md)

Defined in: expressions.ts:98
