[**@axi-engine/utils**](../README.md)

***

[@axi-engine/utils](../README.md) / StateEmitter

# Class: StateEmitter\<T\>

Defined in: emitter.ts:55

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

Defined in: emitter.ts:58

#### Parameters

##### initialValue?

`T`

#### Returns

`StateEmitter`\<`T`\>

#### Overrides

[`Emitter`](Emitter.md).[`constructor`](Emitter.md#constructor)

## Accessors

### listenerCount

#### Get Signature

> **get** **listenerCount**(): `number`

Defined in: emitter.ts:15

Returns the number of listeners.

##### Returns

`number`

#### Inherited from

[`Emitter`](Emitter.md).[`listenerCount`](Emitter.md#listenercount)

***

### value

#### Get Signature

> **get** **value**(): `T` \| `undefined`

Defined in: emitter.ts:66

Gets the current value synchronously without subscribing.

##### Returns

`T` \| `undefined`

## Methods

### clear()

> **clear**(): `void`

Defined in: emitter.ts:85

Clears all listeners.

#### Returns

`void`

#### Overrides

[`Emitter`](Emitter.md).[`clear`](Emitter.md#clear)

***

### emit()

> **emit**(...`args`): `void`

Defined in: emitter.ts:70

Dispatches the event to all subscribed listeners.

#### Parameters

##### args

...`T`

#### Returns

`void`

#### Overrides

[`Emitter`](Emitter.md).[`emit`](Emitter.md#emit)

***

### subscribe()

> **subscribe**(`listener`): () => `void`

Defined in: emitter.ts:75

Subscribes a listener to this event.

#### Parameters

##### listener

(...`args`) => `void`

#### Returns

A function to unsubscribe the listener.

> (): `void`

##### Returns

`void`

#### Overrides

[`Emitter`](Emitter.md).[`subscribe`](Emitter.md#subscribe)

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

#### Inherited from

[`Emitter`](Emitter.md).[`unsubscribe`](Emitter.md#unsubscribe)
