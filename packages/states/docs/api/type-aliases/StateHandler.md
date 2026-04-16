[**@axi-engine/states**](../README.md)

***

[@axi-engine/states](../README.md) / StateHandler

# Type Alias: StateHandler\<P\>

> **StateHandler**\<`P`\> = `P` *extends* `void` ? () => `void` \| `Promise`\<`void`\> : (`payload`) => `void` \| `Promise`\<`void`\>

Defined in: state-handler.ts:8

Represents a lifecycle handler function for a state.
If a payload type `P` is provided and is not `void`, the handler receives the payload.
Supports both synchronous and asynchronous execution.

## Type Parameters

### P

`P` = `void`

The type of the payload passed to the handler.
