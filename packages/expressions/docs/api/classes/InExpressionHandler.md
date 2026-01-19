[**@axi-engine/expressions**](../README.md)

***

[@axi-engine/expressions](../README.md) / InExpressionHandler

# Class: InExpressionHandler

Defined in: handlers/in-expression-handler.ts:16

An expression handler for the `in` expression.

This handler checks if a resolved scalar value is present within a collection (array).
It supports both literal arrays defined directly in the expression and arrays
resolved from a data source via an operand.

## Implements

- [`ExpressionHandler`](../interfaces/ExpressionHandler.md)\<[`InExpression`](../interfaces/InExpression.md)\>

## Constructors

### Constructor

> **new InExpressionHandler**(): `InExpressionHandler`

#### Returns

`InExpressionHandler`

## Properties

### type

> **type**: keyof [`ExpressionDefinitions`](../interfaces/ExpressionDefinitions.md) = `'in'`

Defined in: handlers/in-expression-handler.ts:17

#### Implementation of

[`ExpressionHandler`](../interfaces/ExpressionHandler.md).[`type`](../interfaces/ExpressionHandler.md#type)

## Methods

### resolve()

> **resolve**(`exp`, `context`): `Promise`\<`boolean`\>

Defined in: handlers/in-expression-handler.ts:37

Resolves the `in` expression.

The method performs the following steps:
1. Resolves the `value` operand to a scalar.
2. Obtains the source array, which can be a literal array from the expression
   or the result of resolving the `array` operand.
3. Ensures the source is a valid array.
4. Resolves every item within the source array to a scalar value.
5. Checks if the value from step 1 is included in the resolved array from step 4.

#### Parameters

##### exp

[`InExpression`](../interfaces/InExpression.md)

The `InExpression` object to resolve.

##### context

[`ExpressionEvaluatorContext`](../interfaces/ExpressionEvaluatorContext.md)

The context for the expression evaluation, providing the data source.

#### Returns

`Promise`\<`boolean`\>

A promise that resolves to `true` if the value is found
in the array, and `false` otherwise.

#### Throws

If the source for the array does not resolve to an array.

#### Throws

If any operand within the process fails to resolve correctly.

#### Implementation of

[`ExpressionHandler`](../interfaces/ExpressionHandler.md).[`resolve`](../interfaces/ExpressionHandler.md#resolve)
