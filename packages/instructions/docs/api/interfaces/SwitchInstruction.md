[**@axi-engine/instructions**](../README.md)

***

[@axi-engine/instructions](../README.md) / SwitchInstruction

# Interface: SwitchInstruction

Defined in: packages/instructions/src/instructions.ts:80

Evaluates an operand and executes the corresponding case Instructions.
Similar to a switch-case structure in programming languages.

## Properties

### switch

> **switch**: `object`

Defined in: packages/instructions/src/instructions.ts:81

#### cases

> **cases**: [`SwitchCase`](SwitchCase.md)[]

Ordered list of cases. First match wins.

#### check

> **check**: `Operand`

The value to test (can be a variable reference or a math result).

#### default?

> `optional` **default**: [`Instruction`](../type-aliases/Instruction.md)[]

Optional fallback if no cases match.
