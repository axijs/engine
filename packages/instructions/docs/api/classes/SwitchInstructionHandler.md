[**@axi-engine/instructions**](../README.md)

***

[@axi-engine/instructions](../README.md) / SwitchInstructionHandler

# Class: SwitchInstructionHandler

Defined in: packages/instructions/src/handlers/switch-instruction-handler.ts:7

Defines the execution logic for a specific instruction type.

## Implements

- [`InstructionHandler`](../interfaces/InstructionHandler.md)\<[`SwitchInstruction`](../interfaces/SwitchInstruction.md)\>

## Constructors

### Constructor

> **new SwitchInstructionHandler**(): `SwitchInstructionHandler`

#### Returns

`SwitchInstructionHandler`

## Properties

### name

> **name**: keyof [`RegisteredInstructions`](../interfaces/RegisteredInstructions.md) = `'switch'`

Defined in: packages/instructions/src/handlers/switch-instruction-handler.ts:8

#### Implementation of

[`InstructionHandler`](../interfaces/InstructionHandler.md).[`name`](../interfaces/InstructionHandler.md#name)

## Methods

### process()

> **process**(`instruction`, `context`): `Promise`\<`void`\>

Defined in: packages/instructions/src/handlers/switch-instruction-handler.ts:10

Executes the logic for the given instruction.

#### Parameters

##### instruction

[`SwitchInstruction`](../interfaces/SwitchInstruction.md)

The instruction data object.

##### context

[`InstructionResolverContext`](../interfaces/InstructionResolverContext.md)

Services available during execution.

#### Returns

`Promise`\<`void`\>

A promise that resolves when execution is complete.

#### Implementation of

[`InstructionHandler`](../interfaces/InstructionHandler.md).[`process`](../interfaces/InstructionHandler.md#process)
