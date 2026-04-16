[**@axi-engine/states**](../README.md)

***

[@axi-engine/states](../README.md) / StateHandlerConfig

# Interface: StateHandlerConfig\<T, P\>

Defined in: state-handler.ts:20

Configuration object for defining a state's behavior and transition rules.

## Type Parameters

### T

`T`

The type used for state identifiers.

### P

`P` = `void`

The type of the payload passed to the `onEnter` handler.

## Properties

### allowedFrom?

> `optional` **allowedFrom**: `T`[]

Defined in: state-handler.ts:35

Optional list of states from which a transition to this state is permitted.
If undefined, the state can be entered from any state.

***

### onEnter?

> `optional` **onEnter**: [`StateHandler`](../type-aliases/StateHandler.md)\<`P`\>

Defined in: state-handler.ts:24

Hook executed when transitioning into this state.

***

### onExit()?

> `optional` **onExit**: () => `void` \| `Promise`\<`void`\>

Defined in: state-handler.ts:29

Hook executed when transitioning out of this state.

#### Returns

`void` \| `Promise`\<`void`\>
