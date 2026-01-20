[**@axi-engine/tasks**](../README.md)

***

[@axi-engine/tasks](../README.md) / AsyncTask

# Interface: AsyncTask\<T\>

Defined in: types.ts:50

Represents a fully-featured asynchronous operation that can be
both completed and canceled.
This is the most common task type, providing maximum control.

## Extends

- [`CancellableTask`](CancellableTask.md)\<`T`\>.[`CompletableTask`](CompletableTask.md)\<`T`\>

## Type Parameters

### T

`T` = `void`

The type of the value that the promise will resolve with.

## Properties

### cancel()

> **cancel**: (`reason?`) => `void`

Defined in: types.ts:23

Aborts the associated asynchronous operation.
The associated promise should be rejected with the provided reason.

#### Parameters

##### reason?

`any`

An optional reason for the cancellation.

#### Returns

`void`

#### Inherited from

[`CancellableTask`](CancellableTask.md).[`cancel`](CancellableTask.md#cancel)

***

### complete()

> **complete**: () => `void`

Defined in: types.ts:10

Immediately finishes the associated asynchronous operation.
This typically involves skipping any remaining animations or delays.
The associated promise should resolve successfully.

#### Returns

`void`

#### Inherited from

[`CompletableTask`](CompletableTask.md).[`complete`](CompletableTask.md#complete)

***

### promise

> **promise**: `Promise`\<`T`\>

Defined in: types.ts:41

#### Inherited from

[`CancellableTask`](CancellableTask.md).[`promise`](CancellableTask.md#promise)
