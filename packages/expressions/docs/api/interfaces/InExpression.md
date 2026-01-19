[**@axi-engine/expressions**](../README.md)

***

[@axi-engine/expressions](../README.md) / InExpression

# Interface: InExpression

Defined in: expressions.ts:123

Represents an expression that checks if a value is present within an array.
This is useful for checking against a list of possible values, such as statuses,
factions, or item types.

## Examples

```ts
// Check if player's faction is one of the "evil" ones
{
  "in": {
    "value": { "path": "player.faction" },
    "array": [ "orcs", "goblins", "undead" ]
  }
}
```

```ts
// Check against a dynamic array from the data source
{
  "in": {
    "value": { "path": "player.class" },
    "array": { "path": "quest.valid_classes" }
  }
}
```

## Properties

### in

> **in**: `object`

Defined in: expressions.ts:124

#### array

> **array**: [`Operand`](../type-aliases/Operand.md) \| ScalarType \| Operand[]

The collection to check against. This can be either:
- An operand that resolves to an array.
- A literal array defined directly in the expression.

#### value

> **value**: [`Operand`](../type-aliases/Operand.md)

The operand whose resolved value will be searched for in the array.
should be scalar type (string, number, boolean)
