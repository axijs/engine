[**@axi-engine/instructions**](../README.md)

***

[@axi-engine/instructions](../README.md) / InstructionResolverBuilder

# Class: InstructionResolverBuilder

Defined in: packages/instructions/src/setup.ts:53

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

Defined in: packages/instructions/src/setup.ts:97

Registers one or more custom instruction handlers.
Useful for plugins or game-specific instructions.

#### Parameters

##### handler

A single handler instance or an array of handlers.

[`InstructionHandler`](../interfaces/InstructionHandler.md)\<[`Instruction`](../type-aliases/Instruction.md), [`InstructionResolverContext`](../interfaces/InstructionResolverContext.md)\> | [`InstructionHandler`](../interfaces/InstructionHandler.md)\<[`Instruction`](../type-aliases/Instruction.md), [`InstructionResolverContext`](../interfaces/InstructionResolverContext.md)\>[]

#### Returns

`this`

***

### build()

> **build**(): [`CoreInstructionResolver`](CoreInstructionResolver.md)

Defined in: packages/instructions/src/setup.ts:110

Constructs the `CoreInstructionResolver` and registers all configured handlers.

#### Returns

[`CoreInstructionResolver`](CoreInstructionResolver.md)

A fully initialized resolver ready to execute instructions.

***

### withData()

> **withData**(): `this`

Defined in: packages/instructions/src/setup.ts:71

Adds only the data manipulation handlers.

#### Returns

`this`

***

### withDefaults()

> **withDefaults**(): `this`

Defined in: packages/instructions/src/setup.ts:60

Adds the complete standard set of handlers (Data, Logical, and Util).
Recommended for most use cases.

#### Returns

`this`

***

### withLogic()

> **withLogic**(): `this`

Defined in: packages/instructions/src/setup.ts:79

Adds only the logical control flow handlers.

#### Returns

`this`

***

### withUtil()

> **withUtil**(): `this`

Defined in: packages/instructions/src/setup.ts:87

Adds only the utility handlers.

#### Returns

`this`
