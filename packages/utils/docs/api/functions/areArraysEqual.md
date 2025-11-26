[**@axi-engine/utils**](../README.md)

***

[@axi-engine/utils](../README.md) / areArraysEqual

# Function: areArraysEqual()

> **areArraysEqual**\<`T`\>(`arr1?`, `arr2?`): `boolean`

Defined in: arrays.ts:78

Checks if two arrays are strictly equal (same elements in the same order).

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

`true` if the arrays are strictly equal, otherwise `false`.

## Example

```ts
areArraysEqual(['a', 'b'], ['a', 'b']); // true
areArraysEqual(['a', 'b'], ['b', 'a']); // false
areArraysEqual([1, 2], [1, 2, 3]);    // false
```
