[**@axi-engine/utils**](../README.md)

***

[@axi-engine/utils](../README.md) / Emitter

# Class: Emitter\<T\>

Defined in: emitter.ts:10

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

Defined in: emitter.ts:16

Returns the number of listeners.

##### Returns

`number`

#### Implementation of

`Subscribable.listenerCount`

## Methods

### clear()

> **clear**(): `void`

Defined in: emitter.ts:60

Clears all listeners.

#### Returns

`void`

#### Implementation of

`Subscribable.clear`

***

### emit()

> **emit**(...`args`): `void`

Defined in: emitter.ts:53

Dispatches the event to all subscribed listeners.

#### Parameters

##### args

...`T`

#### Returns

`void`

***

### once()

> **once**(`listener`): [`Subscription`](Subscription.md)

Defined in: emitter.ts:34

Subscribes a listener that triggers only once and then automatically unsubscribes.

#### Parameters

##### listener

(...`args`) => `void`

The callback function to execute once.

#### Returns

[`Subscription`](Subscription.md)

A Subscription object (can be used to cancel before the event fires).

***

### subscribe()

> **subscribe**(`listener`): [`Subscription`](Subscription.md)

Defined in: emitter.ts:24

Subscribes a listener to this event.

#### Parameters

##### listener

(...`args`) => `void`

#### Returns

[`Subscription`](Subscription.md)

A Subscription object to manage the unsubscription.

#### Implementation of

`Subscribable.subscribe`

***

### unsubscribe()

> **unsubscribe**(`listener`): `boolean`

Defined in: emitter.ts:46

Manually unsubscribe by listener

#### Parameters

##### listener

(...`args`) => `void`

#### Returns

`boolean`

returns true if an listener has been removed, or false if the listener does not exist.

#### Implementation of

`Subscribable.unsubscribe`
