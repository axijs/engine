[**@axi-engine/utils**](../README.md)

***

[@axi-engine/utils](../README.md) / Constructor

# Type Alias: Constructor()\<T\>

> **Constructor**\<`T`\> = (...`args`) => `T`

Defined in: types.ts:42

Represents a generic constructor for any class.

This utility type is essential for implementing higher-order patterns
like mixins, where a function takes a class as an argument and returns
a new, extended class.

The `...args: any[]` signature allows it to represent constructors
with any number and type of arguments, making it universally applicable.

## Type Parameters

### T

`T` = \{ \}

The type of the instance created by the constructor. Defaults to `{}`.

## Parameters

### args

...`any`[]

## Returns

`T`

## Example

```ts
// Used as a constraint for a base class in a mixin
function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    timestamp = new Date();
  };
}

class User {}
const TimestampedUser = Timestamped(User);
const userInstance = new TimestampedUser();
console.log(userInstance.timestamp); // Logs the current date
```
