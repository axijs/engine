[**@axi-engine/utils**](../README.md)

***

[@axi-engine/utils](../README.md) / throwIfEmpty

# Function: throwIfEmpty()

> **throwIfEmpty**\<`T`\>(`value`, `exceptionMessage`): `asserts value is NonNullable<T>`

Defined in: assertion.ts:37

Throws an error if the value is null, undefined, or an empty array.

## Type Parameters

### T

`T`

The type of the value being checked.

## Parameters

### value

`T`

The value to check.

### exceptionMessage

`string`

The message for the error.

## Returns

`asserts value is NonNullable<T>`

## Throws

if the value is null, undefined, or an empty array.

## Examples

```ts
// Example with a potentially undefined variable
const user: { name: string } | undefined = findUser();
throwIfEmpty(user, 'User not found');
// From here, TypeScript knows `user` is not undefined.
console.log(user.name);
```

```ts
// Example with an array
const items: string[] = getItems();
throwIfEmpty(items, 'Items array cannot be empty');
// From here, you can safely access items[0] without checking for an empty array again.
console.log('First item:', items[0]);
```
