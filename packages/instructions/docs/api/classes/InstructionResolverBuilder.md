[**@axi-engine/instructions**](../README.md)

***

[@axi-engine/instructions](../README.md) / InstructionResolverBuilder

# Class: InstructionResolverBuilder

Defined in: packages/instructions/src/setup.ts:54

A builder class for configuring and creating an `InstructionResolver` instance.
Allows selecting specific groups of instructions or adding custom ones using a fluent API.

## Constructors

### Constructor

> **new InstructionResolverBuilder**(): `InstructionResolverBuilder`

#### Returns

`InstructionResolverBuilder`

## Methods

### add()

> **add**(`handler`): `this`

Defined in: packages/instructions/src/setup.ts:98

Registers one or more custom instruction handlers.
Useful for plugins or game-specific instructions.

#### Parameters

##### handler

A single handler instance or an array of handlers.

[`InstructionHandler`](../interfaces/InstructionHandler.md)\<[`Instruction`](../type-aliases/Instruction.md), `InstructionResolverContext`\> | [`InstructionHandler`](../interfaces/InstructionHandler.md)\<[`Instruction`](../type-aliases/Instruction.md), `InstructionResolverContext`\>[]

#### Returns

`this`

***

### build()

> **build**(): [`InstructionResolver`](../interfaces/InstructionResolver.md)

Defined in: packages/instructions/src/setup.ts:111

Constructs the `CoreInstructionResolver` and registers all configured handlers.

#### Returns

[`InstructionResolver`](../interfaces/InstructionResolver.md)

A fully initialized resolver ready to execute instructions.

***

### withData()

> **withData**(): `this`

Defined in: packages/instructions/src/setup.ts:72

Adds only the data manipulation handlers.

#### Returns

`this`

***

### withDefaults()

> **withDefaults**(): `this`

Defined in: packages/instructions/src/setup.ts:61

Adds the complete standard set of handlers (Data, Logical, and Util).
Recommended for most use cases.

#### Returns

`this`

***

### withLogic()

> **withLogic**(): `this`

Defined in: packages/instructions/src/setup.ts:80

Adds only the logical control flow handlers.

#### Returns

`this`

***

### withUtil()

> **withUtil**(): `this`

Defined in: packages/instructions/src/setup.ts:88

Adds only the utility handlers.

#### Returns

`this`
