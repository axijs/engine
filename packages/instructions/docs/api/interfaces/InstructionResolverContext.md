[**@axi-engine/instructions**](../README.md)

***

[@axi-engine/instructions](../README.md) / InstructionResolverContext

# Interface: InstructionResolverContext

Defined in: packages/instructions/src/instruction-resolver-context.ts:10

Interface for the context passed to every statement handler.
Provides access to core engine services needed for execution.

## Methods

### expressions()

> **expressions**(): `ExpressionEvaluator`

Defined in: packages/instructions/src/instruction-resolver-context.ts:12

Access the expression evaluator for resolving operands.

#### Returns

`ExpressionEvaluator`

***

### instructions()

> **instructions**(): [`InstructionResolver`](InstructionResolver.md)

Defined in: packages/instructions/src/instruction-resolver-context.ts:15

Access the statement resolver for executing nested instructions.

#### Returns

[`InstructionResolver`](InstructionResolver.md)

***

### storage()

> **storage**(): `DataStorage`

Defined in: packages/instructions/src/instruction-resolver-context.ts:18

Access the data storage for reading/writing variables.

#### Returns

`DataStorage`
