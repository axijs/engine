[**@axi-engine/states**](../README.md)

***

[@axi-engine/states](../README.md) / StateMachine

# Class: StateMachine\<T, P\>

Defined in: state-machine.ts:25

A minimal, type-safe finite state machine.
It manages states, transitions, and associated lifecycle hooks (`onEnter`, `onExit`).

## Example

```ts
enum PlayerState { Idle, Walk, Run }

const playerFsm = new StateMachine<PlayerState>();

playerFsm.register(PlayerState.Idle, () => console.log('Player is now idle.'));
playerFsm.register(PlayerState.Walk, () => console.log('Player is walking.'));

async function start() {
  await playerFsm.call(PlayerState.Idle);
  await playerFsm.call(PlayerState.Walk);
}
```

## Type Parameters

### T

`T`

The type used for state identifiers (e.g., a string or an enum).

### P

`P` = `void`

The default payload type for state handlers. Can be overridden per state.

## Constructors

### Constructor

> **new StateMachine**\<`T`, `P`\>(): `StateMachine`\<`T`, `P`\>

#### Returns

`StateMachine`\<`T`, `P`\>

## Properties

### \_state?

> `protected` `optional` **\_state**: `T`

Defined in: state-machine.ts:30

The internal representation of the current state.

***

### onChange

> `readonly` **onChange**: `Emitter`\<\{ `from?`: `T`; `payload?`: `P`; `to?`: `T`; \}\>

Defined in: state-machine.ts:47

Public emitter that fires an event whenever the state changes.
The event provides the old state, the new state, and the payload.

#### See

Emitter

#### Example

```ts
fsm.onChange.subscribe(e => {
  console.log(`State transitioned from ${e.from} to ${e.to}`);
});
```

***

### states

> `protected` **states**: `Map`\<`T`, [`StateHandlerConfig`](../interfaces/StateHandlerConfig.md)\<`T`, `P`\> \| `undefined`\>

Defined in: state-machine.ts:36

A map storing all registered state configurations.

## Accessors

### state

#### Get Signature

> **get** **state**(): `T` \| `undefined`

Defined in: state-machine.ts:53

Gets the current state of the machine.

##### Returns

`T` \| `undefined`

The current state identifier, or `undefined` if the machine has not been started.

## Methods

### call()

> **call**(`newState`, `payload?`): `Promise`\<`void`\>

Defined in: state-machine.ts:99

Transitions the machine to a new state.
This method is asynchronous to accommodate async `onEnter` and `onExit` handlers.
It will execute the `onExit` handler of the old state, then the `onEnter` handler of the new state.

#### Parameters

##### newState

`T`

The identifier of the state to transition to.

##### payload?

`P`

An optional payload to pass to the new state's `onEnter` handler.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the transition is complete.

#### Throws

if the `newState` has not been registered.

#### Throws

if the transition from the current state to the `newState` is not allowed by the `allowedFrom` rule.

#### Example

```ts
try {
  await fsm.call(PlayerState.Run, { speed: 10 });
} catch (e) {
  console.error('State transition failed:', e.message);
}
```

***

### clear()

> **clear**(): `void`

Defined in: state-machine.ts:150

Removes all registered states and resets the machine to its initial, undefined state.
This does not clear `onChange` subscribers.

#### Returns

`void`

#### Example

```ts
fsm.register(MyState.One);
fsm.register(MyState.Two);
// ...
fsm.clear(); // The machine is now empty.
```

***

### register()

> **register**(`state`, `handler?`): `void`

Defined in: state-machine.ts:74

Registers a state and its associated handler or configuration.
If a handler is already registered for the given state, it will be overwritten.

#### Parameters

##### state

`T`

The identifier for the state to register.

##### handler?

[`StateHandlerRegistration`](../type-aliases/StateHandlerRegistration.md)\<`T`, `P`\>

A handler function (`onEnter`) or a full configuration object.

#### Returns

`void`

#### Example

```ts
// Simple registration
fsm.register(MyState.Idle, () => console.log('Entering Idle'));

// Advanced registration
fsm.register(MyState.Walking, {
  onEnter: () => console.log('Start walking animation'),
  onExit: () => console.log('Stop walking animation'),
  allowedFrom: [MyState.Idle]
});
```

***

### unregister()

> **unregister**(`state`): `boolean`

Defined in: state-machine.ts:134

Removes a single state configuration from the machine.
If the removed state is the currently active one, the machine's state will be reset to `undefined`.

#### Parameters

##### state

`T`

The identifier of the state to remove.

#### Returns

`boolean`

`true` if the state was found and removed, otherwise `false`.

#### Example

```ts
fsm.register(MyState.Temp, () => {});
// ...
const wasRemoved = fsm.unregister(MyState.Temp);
console.log('Temporary state removed:', wasRemoved);
```
