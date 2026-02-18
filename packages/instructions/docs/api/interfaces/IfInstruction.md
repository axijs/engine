[**@axi-engine/instructions**](../README.md)

***

[@axi-engine/instructions](../README.md) / IfInstruction

# Interface: IfInstruction

Defined in: packages/instructions/src/instructions.ts:55

Executes a sequence of Instructions based on a boolean condition.

## Properties

### if

> **if**: `object`

Defined in: packages/instructions/src/instructions.ts:56

#### condition

> **condition**: `Expression`

The condition expression to evaluate.

#### else?

> `optional` **else**: [`Instruction`](../type-aliases/Instruction.md)[]

Optional Instructions to execute if the condition is false.

#### then

> **then**: [`Instruction`](../type-aliases/Instruction.md)[]

Instructions to execute if the condition is true.
