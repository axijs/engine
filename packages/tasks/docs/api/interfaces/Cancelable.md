[**@axi-engine/tasks**](../README.md)

***

[@axi-engine/tasks](../README.md) / Cancelable

# Interface: Cancelable

Defined in: types.ts:16

Defines an object that represents an operation that can be canceled.

## Extended by

- [`CancellableTask`](CancellableTask.md)

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
