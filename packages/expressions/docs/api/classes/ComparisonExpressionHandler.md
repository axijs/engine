[**@axi-engine/expressions**](../README.md)

***

[@axi-engine/expressions](../README.md) / ComparisonExpressionHandler

# Class: ComparisonExpressionHandler

Defined in: handlers/comparision-expression-handler.ts:6

## Implements

- [`ExpressionHandler`](../interfaces/ExpressionHandler.md)\<[`ComparisonExpression`](../interfaces/ComparisonExpression.md)\>

## Constructors

### Constructor

> **new ComparisonExpressionHandler**(): `ComparisonExpressionHandler`

#### Returns

`ComparisonExpressionHandler`

## Properties

### type

> **type**: keyof [`ExpressionDefinitions`](../interfaces/ExpressionDefinitions.md) = `'comparison'`

Defined in: handlers/comparision-expression-handler.ts:7

#### Implementation of

[`ExpressionHandler`](../interfaces/ExpressionHandler.md).[`type`](../interfaces/ExpressionHandler.md#type)

## Methods

### resolve()

> **resolve**(`exp`, `context`): `Promise`\<`boolean`\>

Defined in: handlers/comparision-expression-handler.ts:9

#### Parameters

##### exp

[`ComparisonExpression`](../interfaces/ComparisonExpression.md)

##### context

[`ExpressionEvaluatorContext`](../interfaces/ExpressionEvaluatorContext.md)

#### Returns

`Promise`\<`boolean`\>

#### Implementation of

[`ExpressionHandler`](../interfaces/ExpressionHandler.md).[`resolve`](../interfaces/ExpressionHandler.md#resolve)
