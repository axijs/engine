[**@axi-engine/utils**](../README.md)

***

[@axi-engine/utils](../README.md) / EventChannel

# Class: EventChannel

Defined in: event-channel.ts:17

path-based event channel.

Manages a collection of Emitters mapped to specific paths.
Emitters are lazily created when the first listener subscribes
and automatically destroyed when the last listener unsubscribes

## Template

The type of the payload emitted by this channel.

## Constructors

### Constructor

> **new EventChannel**(): `EventChannel`

#### Returns

`EventChannel`

## Methods

### clear()

> **clear**(): `void`

Defined in: event-channel.ts:97

#### Returns

`void`

***

### emit()

> **emit**\<`T`\>(`path`, `val`): `void`

Defined in: event-channel.ts:71

Emits an event with the specified payload to all listeners subscribed to the given path.
If there are no listeners for the path, the event is safely ignored.

#### Type Parameters

##### T

`T`

#### Parameters

##### path

[`PathType`](../type-aliases/PathType.md)

The target path for the event.

##### val

`T`

The payload to emit.

#### Returns

`void`

***

### has()

> **has**(`path`): `boolean`

Defined in: event-channel.ts:93

#### Parameters

##### path

[`PathType`](../type-aliases/PathType.md)

#### Returns

`boolean`

boolean

***

### prune()

> **prune**(): `void`

Defined in: event-channel.ts:82

Iterates through all active emitters and removes any that have no listeners.
Useful for manual garbage collection or global state resets.

#### Returns

`void`

***

### subscribe()

> **subscribe**\<`T`\>(`path`, `listener`): `Unsubscribable`

Defined in: event-channel.ts:32

Subscribes a listener to events emitted at a specific path.
If an emitter for the path does not exist, it will be created automatically.

#### Type Parameters

##### T

`T`

#### Parameters

##### path

[`PathType`](../type-aliases/PathType.md)

The path to subscribe to (e.g., 'player.stats.hp').

##### listener

(`val`) => `void`

The callback function to invoke when an event occurs.

#### Returns

`Unsubscribable`

An object containing an `unsubscribe` method to remove the listener.

***

### unsubscribe()

> **unsubscribe**(`path`, `listener`): `void`

Defined in: event-channel.ts:54

Manually unsubscribes a listener from a specific path.

#### Parameters

##### path

[`PathType`](../type-aliases/PathType.md)

The path to unsubscribe from.

##### listener

(`val`) => `void`

The callback function to remove.

#### Returns

`void`
