[**@axi-engine/expressions**](../README.md)

***

[@axi-engine/expressions](../README.md) / ExpressionEvaluatorContext

# Interface: ExpressionEvaluatorContext

Defined in: expression-evaluator-context.ts:10

Provides the execution context for an `ExpressionHandler`, giving it the tools
needed to perform its evaluation. An instance of this context is passed to
every handler's `resolve` method.

## Methods

### resolve()

> **resolve**(`expression`): `Promise`\<`boolean`\>

Defined in: expression-evaluator-context.ts:18

A function to recursively resolve nested or child expressions.
This is used by logical handlers like `AndExpressionHandler` or `NotExpressionHandler`
to evaluate their child expressions using the main evaluator logic.

#### Parameters

##### expression

[`Expression`](../type-aliases/Expression.md)

The nested expression to resolve.

#### Returns

`Promise`\<`boolean`\>

A promise that resolves to the boolean result of the nested expression.

***

### source()

> **source**(): `DataSource`

Defined in: expression-evaluator-context.ts:25

A function that returns the `DataSource` for the current evaluation.
This allows the handler to retrieve values needed for `ReferenceOperand`s.

#### Returns

`DataSource`

The active `DataSource`.
