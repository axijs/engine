[**@axi-engine/tasks**](../README.md)

***

[@axi-engine/tasks](../README.md) / CancellableTask

# Interface: CancellableTask\<T\>

Defined in: types.ts:40

Represents an asynchronous operation that includes a Promise
and can be canceled.

## Extends

- [`Cancelable`](Cancelable.md)

## Extended by

- [`AsyncTask`](AsyncTask.md)

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

[`Cancelable`](Cancelable.md).[`cancel`](Cancelable.md#cancel)

***

### promise

> **promise**: `Promise`\<`T`\>

Defined in: types.ts:41
