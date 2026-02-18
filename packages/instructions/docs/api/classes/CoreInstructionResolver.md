[**@axi-engine/instructions**](../README.md)

***

[@axi-engine/instructions](../README.md) / CoreInstructionResolver

# Class: CoreInstructionResolver

Defined in: packages/instructions/src/core-instruction-resolver.ts:15

The core engine for executing declarative statements.
Manages the registry of handlers and dispatches execution to the appropriate handler.

## Constructors

### Constructor

> **new CoreInstructionResolver**(): `CoreInstructionResolver`

#### Returns

`CoreInstructionResolver`

## Properties

### handlers

> `readonly` **handlers**: `Registry`\<keyof [`RegisteredInstructions`](../interfaces/RegisteredInstructions.md), [`InstructionHandler`](../interfaces/InstructionHandler.md)\<`any`, `any`\>\>

Defined in: packages/instructions/src/core-instruction-resolver.ts:17

Registry of handlers mapped by statement name.

## Methods

### execute()

> **execute**\<`C`\>(`instructions`, `context`): `Promise`\<`void`\>

Defined in: packages/instructions/src/core-instruction-resolver.ts:46

Executes a single statement or a sequence of instructions.
Execution stops if any statement throws an error.

#### Type Parameters

##### C

`C` *extends* [`InstructionResolverContext`](../interfaces/InstructionResolverContext.md)

#### Parameters

##### instructions

A single statement object or an array of them.

[`Instruction`](../type-aliases/Instruction.md) | [`Instruction`](../type-aliases/Instruction.md)[]

##### context

`C`

The context providing necessary services (storage, expressions, etc.).

#### Returns

`Promise`\<`void`\>

#### Throws

If execution fails, wrapping the original error and the causing statement.

***

### register()

> **register**(`handler`): `void`

Defined in: packages/instructions/src/core-instruction-resolver.ts:24

Registers a new statement handler and updates the global configuration
to recognize the statement name in type guards.

#### Parameters

##### handler

[`InstructionHandler`](../interfaces/InstructionHandler.md)

The handler instance to register.

#### Returns

`void`

***

### unregister()

> **unregister**(`name`): `void`

Defined in: packages/instructions/src/core-instruction-resolver.ts:33

Unregisters a handler and removes its name from the global configuration.

#### Parameters

##### name

keyof [`RegisteredInstructions`](../interfaces/RegisteredInstructions.md)

The name of the statement to remove.

#### Returns

`void`
