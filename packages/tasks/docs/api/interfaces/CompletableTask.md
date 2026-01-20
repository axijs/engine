[**@axi-engine/tasks**](../README.md)

***

[@axi-engine/tasks](../README.md) / CompletableTask

# Interface: CompletableTask\<T\>

Defined in: types.ts:31

Represents an asynchronous operation that includes a Promise
and can be forcibly completed.

## Extends

- [`Completable`](Completable.md)

## Extended by

- [`AsyncTask`](AsyncTask.md)

## Type Parameters

### T

`T` = `void`

The type of the value that the promise will resolve with.

## Properties

### complete()

> **complete**: () => `void`

Defined in: types.ts:10

Immediately finishes the associated asynchronous operation.
This typically involves skipping any remaining animations or delays.
The associated promise should resolve successfully.

#### Returns

`void`

#### Inherited from

[`Completable`](Completable.md).[`complete`](Completable.md#complete)

***

### promise

> **promise**: `Promise`\<`T`\>

Defined in: types.ts:32
