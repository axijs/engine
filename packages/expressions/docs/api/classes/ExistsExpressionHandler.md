[**@axi-engine/expressions**](../README.md)

***

[@axi-engine/expressions](../README.md) / ExistsExpressionHandler

# Class: ExistsExpressionHandler

Defined in: handlers/exists-expression-handler.ts:5

## Implements

- [`ExpressionHandler`](../interfaces/ExpressionHandler.md)\<[`ExistsExpression`](../interfaces/ExistsExpression.md)\>

## Constructors

### Constructor

> **new ExistsExpressionHandler**(): `ExistsExpressionHandler`

#### Returns

`ExistsExpressionHandler`

## Properties

### type

> **type**: keyof [`ExpressionDefinitions`](../interfaces/ExpressionDefinitions.md) = `'exists'`

Defined in: handlers/exists-expression-handler.ts:6

#### Implementation of

[`ExpressionHandler`](../interfaces/ExpressionHandler.md).[`type`](../interfaces/ExpressionHandler.md#type)

## Methods

### resolve()

> **resolve**(`exp`, `context`): `Promise`\<`boolean`\>

Defined in: handlers/exists-expression-handler.ts:8

#### Parameters

##### exp

[`ExistsExpression`](../interfaces/ExistsExpression.md)

##### context

[`ExpressionEvaluatorContext`](../interfaces/ExpressionEvaluatorContext.md)

#### Returns

`Promise`\<`boolean`\>

#### Implementation of

[`ExpressionHandler`](../interfaces/ExpressionHandler.md).[`resolve`](../interfaces/ExpressionHandler.md#resolve)
