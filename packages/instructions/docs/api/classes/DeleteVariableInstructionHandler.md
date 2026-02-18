[**@axi-engine/instructions**](../README.md)

***

[@axi-engine/instructions](../README.md) / DeleteVariableInstructionHandler

# Class: DeleteVariableInstructionHandler

Defined in: packages/instructions/src/handlers/delete-variable-instruction-handler.ts:5

Defines the execution logic for a specific instruction type.

## Implements

- [`InstructionHandler`](../interfaces/InstructionHandler.md)\<[`DeleteVariableInstruction`](../interfaces/DeleteVariableInstruction.md)\>

## Constructors

### Constructor

> **new DeleteVariableInstructionHandler**(): `DeleteVariableInstructionHandler`

#### Returns

`DeleteVariableInstructionHandler`

## Properties

### name

> **name**: keyof [`RegisteredInstructions`](../interfaces/RegisteredInstructions.md) = `'delete'`

Defined in: packages/instructions/src/handlers/delete-variable-instruction-handler.ts:6

#### Implementation of

[`InstructionHandler`](../interfaces/InstructionHandler.md).[`name`](../interfaces/InstructionHandler.md#name)

## Methods

### process()

> **process**(`instruction`, `context`): `Promise`\<`void`\>

Defined in: packages/instructions/src/handlers/delete-variable-instruction-handler.ts:8

Executes the logic for the given instruction.

#### Parameters

##### instruction

[`DeleteVariableInstruction`](../interfaces/DeleteVariableInstruction.md)

The instruction data object.

##### context

`InstructionResolverContext`

Services available during execution.

#### Returns

`Promise`\<`void`\>

A promise that resolves when execution is complete.

#### Implementation of

[`InstructionHandler`](../interfaces/InstructionHandler.md).[`process`](../interfaces/InstructionHandler.md#process)
