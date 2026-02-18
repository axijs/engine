[**@axi-engine/instructions**](../README.md)

***

[@axi-engine/instructions](../README.md) / InstructionResolver

# Interface: InstructionResolver

Defined in: packages/instructions/src/instruction-resolver.ts:11

The core engine for executing declarative statements.
Manages the registry of handlers and dispatches execution to the appropriate handler.

## Methods

### execute()

> **execute**\<`C`\>(`instructions`, `context`): `Promise`\<`void`\>

Defined in: packages/instructions/src/instruction-resolver.ts:21

Executes a single statement or a sequence of instructions.
Execution stops if any statement throws an error.

#### Type Parameters

##### C

`C` *extends* `InstructionResolverContext`

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
