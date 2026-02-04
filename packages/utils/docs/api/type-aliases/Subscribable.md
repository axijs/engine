[**@axi-engine/utils**](../README.md)

***

[@axi-engine/utils](../README.md) / Subscribable

# Type Alias: Subscribable\<T\>

> **Subscribable**\<`T`\> = `object`

Defined in: types.ts:56

Defines the public, read-only contract for an event emitter.
It allows subscribing to an event but not emitting it.

## Type Parameters

### T

`T` *extends* `any`[]

A tuple representing the types of the event arguments.

## Properties

### listenerCount

> `readonly` **listenerCount**: `number`

Defined in: types.ts:57

## Methods

### clear()

> **clear**(): `void`

Defined in: types.ts:67

#### Returns

`void`

***

### subscribe()

> **subscribe**(`listener`): [`Unsubscribable`](../interfaces/Unsubscribable.md)

Defined in: types.ts:63

Subscribes a listener to this event.

#### Parameters

##### listener

(...`args`) => `void`

#### Returns

[`Unsubscribable`](../interfaces/Unsubscribable.md)

A function to unsubscribe the listener.

***

### unsubscribe()

> **unsubscribe**(`listener`): `boolean`

Defined in: types.ts:65

#### Parameters

##### listener

(...`args`) => `void`

#### Returns

`boolean`
