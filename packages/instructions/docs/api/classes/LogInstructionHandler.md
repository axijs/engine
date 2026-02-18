[**@axi-engine/instructions**](../README.md)

***

[@axi-engine/instructions](../README.md) / LogInstructionHandler

# Class: LogInstructionHandler

Defined in: packages/instructions/src/handlers/log-instruction-handler.ts:7

Defines the execution logic for a specific instruction type.

## Implements

- [`InstructionHandler`](../interfaces/InstructionHandler.md)\<[`LogInstruction`](../interfaces/LogInstruction.md)\>

## Constructors

### Constructor

> **new LogInstructionHandler**(): `LogInstructionHandler`

#### Returns

`LogInstructionHandler`

## Properties

### name

> **name**: keyof [`RegisteredInstructions`](../interfaces/RegisteredInstructions.md) = `'log'`

Defined in: packages/instructions/src/handlers/log-instruction-handler.ts:8

#### Implementation of

[`InstructionHandler`](../interfaces/InstructionHandler.md).[`name`](../interfaces/InstructionHandler.md#name)

## Methods

### process()

> **process**(`instruction`, `context`): `Promise`\<`void`\>

Defined in: packages/instructions/src/handlers/log-instruction-handler.ts:10

Executes the logic for the given instruction.

#### Parameters

##### instruction

[`LogInstruction`](../interfaces/LogInstruction.md)

The instruction data object.

##### context

`InstructionResolverContext`

Services available during execution.

#### Returns

`Promise`\<`void`\>

A promise that resolves when execution is complete.

#### Implementation of

[`InstructionHandler`](../interfaces/InstructionHandler.md).[`process`](../interfaces/InstructionHandler.md#process)
