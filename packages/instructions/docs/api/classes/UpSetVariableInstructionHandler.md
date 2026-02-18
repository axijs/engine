[**@axi-engine/instructions**](../README.md)

***

[@axi-engine/instructions](../README.md) / UpSetVariableInstructionHandler

# Class: UpSetVariableInstructionHandler

Defined in: packages/instructions/src/handlers/up-set-variable-instruction-handler.ts:6

Defines the execution logic for a specific instruction type.

## Implements

- [`InstructionHandler`](../interfaces/InstructionHandler.md)\<[`UpSetVariableInstruction`](../interfaces/UpSetVariableInstruction.md)\>

## Constructors

### Constructor

> **new UpSetVariableInstructionHandler**(): `UpSetVariableInstructionHandler`

#### Returns

`UpSetVariableInstructionHandler`

## Properties

### name

> **name**: keyof [`RegisteredInstructions`](../interfaces/RegisteredInstructions.md) = `'upset'`

Defined in: packages/instructions/src/handlers/up-set-variable-instruction-handler.ts:7

#### Implementation of

[`InstructionHandler`](../interfaces/InstructionHandler.md).[`name`](../interfaces/InstructionHandler.md#name)

## Methods

### process()

> **process**(`instruction`, `context`): `Promise`\<`void`\>

Defined in: packages/instructions/src/handlers/up-set-variable-instruction-handler.ts:9

Executes the logic for the given instruction.

#### Parameters

##### instruction

[`UpSetVariableInstruction`](../interfaces/UpSetVariableInstruction.md)

The instruction data object.

##### context

[`InstructionResolverContext`](../interfaces/InstructionResolverContext.md)

Services available during execution.

#### Returns

`Promise`\<`void`\>

A promise that resolves when execution is complete.

#### Implementation of

[`InstructionHandler`](../interfaces/InstructionHandler.md).[`process`](../interfaces/InstructionHandler.md#process)
