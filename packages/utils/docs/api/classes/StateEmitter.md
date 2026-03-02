[**@axi-engine/utils**](../README.md)

***

[@axi-engine/utils](../README.md) / StateEmitter

# Class: StateEmitter\<T\>

Defined in: emitters/state-emitter.ts:9

An Emitter that stores the last emitted value.
New subscribers immediately receive the last value upon subscription.

## Extends

- [`Emitter`](Emitter.md)\<`T`\>

## Type Parameters

### T

`T` *extends* `any`[]

## Constructors

### Constructor

> **new StateEmitter**\<`T`\>(`initialValue?`): `StateEmitter`\<`T`\>

Defined in: emitters/state-emitter.ts:15

#### Parameters

##### initialValue?

`T`

Optional initial value to set.

#### Returns

`StateEmitter`\<`T`\>

#### Overrides

[`Emitter`](Emitter.md).[`constructor`](Emitter.md#constructor)

## Accessors

### listenerCount

#### Get Signature

> **get** **listenerCount**(): `number`

Defined in: emitters/emitter.ts:15

Returns the number of listeners.

##### Returns

`number`

#### Inherited from

[`Emitter`](Emitter.md).[`listenerCount`](Emitter.md#listenercount)

***

### value

#### Get Signature

> **get** **value**(): `T` \| `undefined`

Defined in: emitters/state-emitter.ts:23

Gets the current value synchronously without subscribing.

##### Returns

`T` \| `undefined`

## Methods

### clear()

> **clear**(): `void`

Defined in: emitters/state-emitter.ts:51

Clears all listeners.

#### Returns

`void`

#### Overrides

[`Emitter`](Emitter.md).[`clear`](Emitter.md#clear)

***

### emit()

> **emit**(...`args`): `void`

Defined in: emitters/state-emitter.ts:31

Updates the state and notifies all listeners.

#### Parameters

##### args

...`T`

The new value(s).

#### Returns

`void`

#### Overrides

[`Emitter`](Emitter.md).[`emit`](Emitter.md#emit)

***

### once()

> **once**(`listener`): [`Subscription`](Subscription.md)

Defined in: emitters/emitter.ts:33

Subscribes a listener that triggers only once and then automatically unsubscribes.

#### Parameters

##### listener

(...`args`) => `void`

The callback function to execute once.

#### Returns

[`Subscription`](Subscription.md)

A Subscription object (can be used to cancel before the event fires).

#### Inherited from

[`Emitter`](Emitter.md).[`once`](Emitter.md#once)

***

### subscribe()

> **subscribe**(`listener`): [`Subscription`](Subscription.md)

Defined in: emitters/state-emitter.ts:41

Subscribes to the event. If a value exists, the listener is called immediately.

#### Parameters

##### listener

(...`args`) => `void`

The callback function.

#### Returns

[`Subscription`](Subscription.md)

A Subscription object.

#### Overrides

[`Emitter`](Emitter.md).[`subscribe`](Emitter.md#subscribe)

***

### unsubscribe()

> **unsubscribe**(`listener`): `boolean`

Defined in: emitters/emitter.ts:45

Manually unsubscribe by listener

#### Parameters

##### listener

(...`args`) => `void`

#### Returns

`boolean`

returns true if an listener has been removed, or false if the listener does not exist.

#### Inherited from

[`Emitter`](Emitter.md).[`unsubscribe`](Emitter.md#unsubscribe)
