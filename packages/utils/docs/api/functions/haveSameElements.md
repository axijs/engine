[**@axi-engine/utils**](../README.md)

***

[@axi-engine/utils](../README.md) / haveSameElements

# Function: haveSameElements()

> **haveSameElements**\<`T`\>(`arr1?`, `arr2?`): `boolean`

Defined in: arrays.ts:55

Checks if two arrays contain the same elements, ignoring order.
Works for arrays of primitives like strings or numbers.

## Type Parameters

### T

`T`

The type of elements in the array.

## Parameters

### arr1?

`T`[]

The first array.

### arr2?

`T`[]

The second array.

## Returns

`boolean`

`true` if both arrays contain the same elements, otherwise `false`.

## Example

```ts
haveSameElements(['a', 'b'], ['b', 'a']); // true
haveSameElements([1, 2, 3], [3, 1, 2]); // true
haveSameElements(['a', 'b'], ['a', 'c']); // false
```
