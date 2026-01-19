[**@axi-engine/expressions**](../README.md)

***

[@axi-engine/expressions](../README.md) / ChanceExpressionHandler

# Class: ChanceExpressionHandler

Defined in: handlers/chance-expression-handler.ts:14

An expression handler for the `chance` expression.

This handler evaluates to `true` or `false` based on a probabilistic check.
It resolves its operand to a numeric percentage value and compares it against
a random number roll.

## Implements

- [`ExpressionHandler`](../interfaces/ExpressionHandler.md)\<[`ChanceExpression`](../interfaces/ChanceExpression.md)\>

## Constructors

### Constructor

> **new ChanceExpressionHandler**(): `ChanceExpressionHandler`

#### Returns

`ChanceExpressionHandler`

## Properties

### type

> **type**: keyof [`ExpressionDefinitions`](../interfaces/ExpressionDefinitions.md) = `'chance'`

Defined in: handlers/chance-expression-handler.ts:15

#### Implementation of

[`ExpressionHandler`](../interfaces/ExpressionHandler.md).[`type`](../interfaces/ExpressionHandler.md#type)

## Methods

### resolve()

> **resolve**(`exp`, `context`): `Promise`\<`boolean`\>

Defined in: handlers/chance-expression-handler.ts:32

Resolves the `chance` expression.

The method first resolves the operand to a scalar value. It supports both
numbers (e.g., `50`) and strings (e.g., `"50"`, `"50%"`), which are parsed
into a numeric percentage. It then generates a random integer from 0 to 99
and returns `true` if this random number is less than the resolved chance value.

#### Parameters

##### exp

[`ChanceExpression`](../interfaces/ChanceExpression.md)

The `ChanceExpression` object to resolve.

##### context

[`ExpressionEvaluatorContext`](../interfaces/ExpressionEvaluatorContext.md)

The context for the expression evaluation, providing access to the data source.

#### Returns

`Promise`\<`boolean`\>

A promise that resolves to `true` if the random roll
succeeds, and `false` otherwise.

#### Throws

If the operand resolves to a value that cannot be parsed into
a number (e.g., a boolean or a non-numeric string).

#### Implementation of

[`ExpressionHandler`](../interfaces/ExpressionHandler.md).[`resolve`](../interfaces/ExpressionHandler.md#resolve)
