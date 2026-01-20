[**@axi-engine/tasks**](../README.md)

***

[@axi-engine/tasks](../README.md) / Completable

# Interface: Completable

Defined in: types.ts:4

Defines an object that represents an operation that can be forcibly completed.

## Extended by

- [`CompletableTask`](CompletableTask.md)

## Properties

### complete()

> **complete**: () => `void`

Defined in: types.ts:10

Immediately finishes the associated asynchronous operation.
This typically involves skipping any remaining animations or delays.
The associated promise should resolve successfully.

#### Returns

`void`
