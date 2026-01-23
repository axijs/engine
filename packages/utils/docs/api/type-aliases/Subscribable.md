[**@axi-engine/utils**](../README.md)

***

[@axi-engine/utils](../README.md) / Subscribable

# Type Alias: Subscribable\<T\>

> **Subscribable**\<`T`\> = `object`

Defined in: types.ts:49

Defines the public, read-only contract for an event emitter.
It allows subscribing to an event but not emitting it.

## Type Parameters

### T

`T` *extends* `any`[]

A tuple representing the types of the event arguments.

## Properties

### listenerCount

> `readonly` **listenerCount**: `number`

Defined in: types.ts:50

## Methods

### clear()

> **clear**(): `void`

Defined in: types.ts:60

#### Returns

`void`

***

### subscribe()

> **subscribe**(`listener`): () => `void`

Defined in: types.ts:56

Subscribes a listener to this event.

#### Parameters

##### listener

(...`args`) => `void`

#### Returns

A function to unsubscribe the listener.

> (): `void`

##### Returns

`void`

***

### unsubscribe()

> **unsubscribe**(`listener`): `boolean`

Defined in: types.ts:58

#### Parameters

##### listener

(...`args`) => `void`

#### Returns

`boolean`
