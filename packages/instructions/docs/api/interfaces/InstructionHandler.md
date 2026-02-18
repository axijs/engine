[**@axi-engine/instructions**](../README.md)

***

[@axi-engine/instructions](../README.md) / InstructionHandler

# Interface: InstructionHandler\<T, C\>

Defined in: packages/instructions/src/instruction-handler.ts:10

Defines the execution logic for a specific instruction type.

## Type Parameters

### T

`T` *extends* [`Instruction`](../type-aliases/Instruction.md) = [`Instruction`](../type-aliases/Instruction.md)

The specific instruction interface (e.g., LogInstruction).

### C

`C` *extends* `InstructionResolverContext` = `InstructionResolverContext`

The context type, defaults to standard instructionResolverContext.

## Properties

### name

> **name**: keyof [`RegisteredInstructions`](RegisteredInstructions.md)

Defined in: packages/instructions/src/instruction-handler.ts:14

## Methods

### process()

> **process**(`instruction`, `context`): `Promise`\<`void`\>

Defined in: packages/instructions/src/instruction-handler.ts:22

Executes the logic for the given instruction.

#### Parameters

##### instruction

`T`

The instruction data object.

##### context

`C`

Services available during execution.

#### Returns

`Promise`\<`void`\>

A promise that resolves when execution is complete.
