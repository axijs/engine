[**@axi-engine/instructions**](../README.md)

***

[@axi-engine/instructions](../README.md) / isInstructionOfKind

# Function: isInstructionOfKind()

> **isInstructionOfKind**\<`T`\>(`instruction`, `type`): `instruction is RegisteredInstructions[T]`

Defined in: packages/instructions/src/guards.ts:35

A generic type guard that checks if a instruction is of a specific type.

This function provides type-safe way to narrow down the `Instruction`
union type to a specific instruction interface (e.g., `LogInstruction`, `IfInstruction`).

## Type Parameters

### T

`T` *extends* keyof [`RegisteredInstructions`](../interfaces/RegisteredInstructions.md)

The specific instruction name (type) to check against.

## Parameters

### instruction

[`Instruction`](../type-aliases/Instruction.md)

The instruction object to check.

### type

`T`

The instruction name to match (e.g., 'log', 'if', 'set').

## Returns

`instruction is RegisteredInstructions[T]`

`true` if the instruction's key matches the specified type,

## Example

```ts
if (isInstruction(myInstruction, 'log')) {
  // Inside this block, TypeScript knows `myInstruction` is a `LogInstruction`.
  console.log(myInstruction.log);
}
```
