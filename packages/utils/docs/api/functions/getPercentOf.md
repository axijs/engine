[**@axi-engine/utils**](../README.md)

***

[@axi-engine/utils](../README.md) / getPercentOf

# Function: getPercentOf()

> **getPercentOf**(`val`, `percents`, `precision?`): `number`

Defined in: math.ts:26

Calculates a percentage of a given value.

## Parameters

### val

`number`

The base value.

### percents

`number`

The percentage to get.

### precision?

`number`

Optional number of decimal places to round the result to.

## Returns

`number`

The calculated percentage of the value.

## Examples

```ts
getPercentOf(200, 12.5); // returns 25
```

```ts
getPercentOf(100, 33.333, 2); // returns 33.33
```
