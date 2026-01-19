[**@axi-engine/expressions**](../README.md)

***

[@axi-engine/expressions](../README.md) / NotExpressionHandler

# Class: NotExpressionHandler

Defined in: handlers/not-expression-handler.ts:5

## Implements

- [`ExpressionHandler`](../interfaces/ExpressionHandler.md)\<[`NotExpression`](../interfaces/NotExpression.md)\>

## Constructors

### Constructor

> **new NotExpressionHandler**(): `NotExpressionHandler`

#### Returns

`NotExpressionHandler`

## Properties

### type

> **type**: keyof [`ExpressionDefinitions`](../interfaces/ExpressionDefinitions.md) = `'not'`

Defined in: handlers/not-expression-handler.ts:6

#### Implementation of

[`ExpressionHandler`](../interfaces/ExpressionHandler.md).[`type`](../interfaces/ExpressionHandler.md#type)

## Methods

### resolve()

> **resolve**(`exp`, `context`): `Promise`\<`boolean`\>

Defined in: handlers/not-expression-handler.ts:8

#### Parameters

##### exp

[`NotExpression`](../interfaces/NotExpression.md)

##### context

[`ExpressionEvaluatorContext`](../interfaces/ExpressionEvaluatorContext.md)

#### Returns

`Promise`\<`boolean`\>

#### Implementation of

[`ExpressionHandler`](../interfaces/ExpressionHandler.md).[`resolve`](../interfaces/ExpressionHandler.md#resolve)
