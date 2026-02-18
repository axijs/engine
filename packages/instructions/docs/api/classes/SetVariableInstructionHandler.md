[**@axi-engine/instructions**](../README.md)

***

[@axi-engine/instructions](../README.md) / SetVariableInstructionHandler

# Class: SetVariableInstructionHandler

Defined in: packages/instructions/src/handlers/set-variable-instruction-handler.ts:7

Defines the execution logic for a specific instruction type.

## Implements

- [`InstructionHandler`](../interfaces/InstructionHandler.md)\<[`SetVariableInstruction`](../interfaces/SetVariableInstruction.md)\>

## Constructors

### Constructor

> **new SetVariableInstructionHandler**(): `SetVariableInstructionHandler`

#### Returns

`SetVariableInstructionHandler`

## Properties

### name

> **name**: keyof [`RegisteredInstructions`](../interfaces/RegisteredInstructions.md) = `'set'`

Defined in: packages/instructions/src/handlers/set-variable-instruction-handler.ts:8

#### Implementation of

[`InstructionHandler`](../interfaces/InstructionHandler.md).[`name`](../interfaces/InstructionHandler.md#name)

## Methods

### process()

> **process**(`instruction`, `context`): `Promise`\<`void`\>

Defined in: packages/instructions/src/handlers/set-variable-instruction-handler.ts:10

Executes the logic for the given instruction.

#### Parameters

##### instruction

[`SetVariableInstruction`](../interfaces/SetVariableInstruction.md)

The instruction data object.

##### context

[`InstructionResolverContext`](../interfaces/InstructionResolverContext.md)

Services available during execution.

#### Returns

`Promise`\<`void`\>

A promise that resolves when execution is complete.

#### Implementation of

[`InstructionHandler`](../interfaces/InstructionHandler.md).[`process`](../interfaces/InstructionHandler.md#process)
