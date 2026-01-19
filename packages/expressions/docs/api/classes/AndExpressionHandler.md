[**@axi-engine/expressions**](../README.md)

***

[@axi-engine/expressions](../README.md) / AndExpressionHandler

# Class: AndExpressionHandler

Defined in: handlers/and-expression-handler.ts:5

## Implements

- [`ExpressionHandler`](../interfaces/ExpressionHandler.md)\<[`AndExpression`](../interfaces/AndExpression.md)\>

## Constructors

### Constructor

> **new AndExpressionHandler**(): `AndExpressionHandler`

#### Returns

`AndExpressionHandler`

## Properties

### type

> **type**: keyof [`ExpressionDefinitions`](../interfaces/ExpressionDefinitions.md) = `'and'`

Defined in: handlers/and-expression-handler.ts:6

#### Implementation of

[`ExpressionHandler`](../interfaces/ExpressionHandler.md).[`type`](../interfaces/ExpressionHandler.md#type)

## Methods

### resolve()

> **resolve**(`exp`, `context`): `Promise`\<`boolean`\>

Defined in: handlers/and-expression-handler.ts:8

#### Parameters

##### exp

[`AndExpression`](../interfaces/AndExpression.md)

##### context

[`ExpressionEvaluatorContext`](../interfaces/ExpressionEvaluatorContext.md)

#### Returns

`Promise`\<`boolean`\>

#### Implementation of

[`ExpressionHandler`](../interfaces/ExpressionHandler.md).[`resolve`](../interfaces/ExpressionHandler.md#resolve)
