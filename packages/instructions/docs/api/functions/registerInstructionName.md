[**@axi-engine/instructions**](../README.md)

***

[@axi-engine/instructions](../README.md) / registerInstructionName

# Function: registerInstructionName()

> **registerInstructionName**(`name`): `void`

Defined in: packages/instructions/src/config.ts:12

Registers a new instruction name, making it recognizable by the `isInstruction` guard.
This function must be called by the core library for its own instructions,
and by any plugin that adds a new instruction type.

## Parameters

### name

keyof [`RegisteredInstructions`](../interfaces/RegisteredInstructions.md)

The name of the instruction to register (e.g., 'log', 'set').

## Returns

`void`
