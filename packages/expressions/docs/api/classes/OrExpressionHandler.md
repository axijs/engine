[**@axi-engine/expressions**](../README.md)

***

[@axi-engine/expressions](../README.md) / OrExpressionHandler

# Class: OrExpressionHandler

Defined in: handlers/or-expression-handler.ts:5

## Implements

- [`ExpressionHandler`](../interfaces/ExpressionHandler.md)\<[`OrExpression`](../interfaces/OrExpression.md)\>

## Constructors

### Constructor

> **new OrExpressionHandler**(): `OrExpressionHandler`

#### Returns

`OrExpressionHandler`

## Properties

### type

> **type**: keyof [`ExpressionDefinitions`](../interfaces/ExpressionDefinitions.md) = `'or'`

Defined in: handlers/or-expression-handler.ts:6

#### Implementation of

[`ExpressionHandler`](../interfaces/ExpressionHandler.md).[`type`](../interfaces/ExpressionHandler.md#type)

## Methods

### resolve()

> **resolve**(`exp`, `context`): `Promise`\<`boolean`\>

Defined in: handlers/or-expression-handler.ts:8

#### Parameters

##### exp

[`OrExpression`](../interfaces/OrExpression.md)

##### context

[`ExpressionEvaluatorContext`](../interfaces/ExpressionEvaluatorContext.md)

#### Returns

`Promise`\<`boolean`\>

#### Implementation of

[`ExpressionHandler`](../interfaces/ExpressionHandler.md).[`resolve`](../interfaces/ExpressionHandler.md#resolve)
