[**@axi-engine/instructions**](../README.md)

***

[@axi-engine/instructions](../README.md) / IfInstructionHandler

# Class: IfInstructionHandler

Defined in: packages/instructions/src/handlers/if-instruction-handler.ts:7

Defines the execution logic for a specific instruction type.

## Implements

- [`InstructionHandler`](../interfaces/InstructionHandler.md)\<[`IfInstruction`](../interfaces/IfInstruction.md)\>

## Constructors

### Constructor

> **new IfInstructionHandler**(): `IfInstructionHandler`

#### Returns

`IfInstructionHandler`

## Properties

### name

> **name**: keyof [`RegisteredInstructions`](../interfaces/RegisteredInstructions.md) = `'if'`

Defined in: packages/instructions/src/handlers/if-instruction-handler.ts:8

#### Implementation of

[`InstructionHandler`](../interfaces/InstructionHandler.md).[`name`](../interfaces/InstructionHandler.md#name)

## Methods

### process()

> **process**(`instruction`, `context`): `Promise`\<`void`\>

Defined in: packages/instructions/src/handlers/if-instruction-handler.ts:10

Executes the logic for the given instruction.

#### Parameters

##### instruction

[`IfInstruction`](../interfaces/IfInstruction.md)

The instruction data object.

##### context

[`InstructionResolverContext`](../interfaces/InstructionResolverContext.md)

Services available during execution.

#### Returns

`Promise`\<`void`\>

A promise that resolves when execution is complete.

#### Implementation of

[`InstructionHandler`](../interfaces/InstructionHandler.md).[`process`](../interfaces/InstructionHandler.md#process)
