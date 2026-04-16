[**@axi-engine/tasks**](../README.md)

***

[@axi-engine/tasks](../README.md) / TaskController

# Interface: TaskController\<T\>

Defined in: types.ts:58

Interface for controlling the state of a task externally.
Allows resolving or rejecting the associated promise.

## Type Parameters

### T

`T` = `void`

The type of the value that the promise resolves with.

## Properties

### reject()

> **reject**: (`reason?`) => `void`

Defined in: types.ts:60

#### Parameters

##### reason?

`any`

#### Returns

`void`

***

### resolve()

> **resolve**: (`value`) => `void`

Defined in: types.ts:59

#### Parameters

##### value

`T`

#### Returns

`void`
