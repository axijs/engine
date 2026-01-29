[**@axi-engine/utils**](../README.md)

***

[@axi-engine/utils](../README.md) / Emitter

# Class: Emitter\<T\>

Defined in: emitter.ts:9

A minimal, type-safe event emitter for a single event.
It does not manage state, it only manages subscribers and event dispatching.

## Extended by

- [`StateEmitter`](StateEmitter.md)

## Type Parameters

### T

`T` *extends* `any`[]

A tuple representing the types of the event arguments.

## Implements

- [`Subscribable`](../type-aliases/Subscribable.md)\<`T`\>

## Constructors

### Constructor

> **new Emitter**\<`T`\>(): `Emitter`\<`T`\>

#### Returns

`Emitter`\<`T`\>

## Accessors

### listenerCount

#### Get Signature

> **get** **listenerCount**(): `number`

Defined in: emitter.ts:15

Returns the number of listeners.

##### Returns

`number`

#### Implementation of

`Subscribable.listenerCount`

## Methods

### clear()

> **clear**(): `void`

Defined in: emitter.ts:46

Clears all listeners.

#### Returns

`void`

#### Implementation of

`Subscribable.clear`

***

### emit()

> **emit**(...`args`): `void`

Defined in: emitter.ts:39

Dispatches the event to all subscribed listeners.

#### Parameters

##### args

...`T`

#### Returns

`void`

***

### subscribe()

> **subscribe**(`listener`): () => `void`

Defined in: emitter.ts:23

Subscribes a listener to this event.

#### Parameters

##### listener

(...`args`) => `void`

#### Returns

A function to unsubscribe the listener.

> (): `void`

##### Returns

`void`

#### Implementation of

`Subscribable.subscribe`

***

### unsubscribe()

> **unsubscribe**(`listener`): `boolean`

Defined in: emitter.ts:32

Manually unsubscribe by listener

#### Parameters

##### listener

(...`args`) => `void`

#### Returns

`boolean`

returns true if an listener has been removed, or false if the listener does not exist.

#### Implementation of

`Subscribable.unsubscribe`
