[**@axi-engine/utils**](../README.md)

***

[@axi-engine/utils](../README.md) / isSequentialStart

# Function: isSequentialStart()

> **isSequentialStart**\<`T`\>(`arr1`, `arr2`): `boolean`

Defined in: arrays.ts:36

Checks if the first array is a sequential starting subset of the second array.

## Type Parameters

### T

`T`

## Parameters

### arr1

`T`[]

The potential subset array.

### arr2

`T`[]

The array to check against.

## Returns

`boolean`

`true` if arr1 is a sequential start of arr2, otherwise `false`.

## Example

```ts
isSequentialStart([1, 2], [1, 2, 3]); // true
isSequentialStart([1, 3], [1, 2, 3]); // false
```
