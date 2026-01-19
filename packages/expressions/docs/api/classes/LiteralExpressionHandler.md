[**@axi-engine/expressions**](../README.md)

***

[@axi-engine/expressions](../README.md) / LiteralExpressionHandler

# Class: LiteralExpressionHandler

Defined in: handlers/literal-expression-handler.ts:5

## Implements

- [`ExpressionHandler`](../interfaces/ExpressionHandler.md)\<[`LiteralExpression`](../interfaces/LiteralExpression.md)\>

## Constructors

### Constructor

> **new LiteralExpressionHandler**(): `LiteralExpressionHandler`

#### Returns

`LiteralExpressionHandler`

## Properties

### type

> **type**: keyof [`ExpressionDefinitions`](../interfaces/ExpressionDefinitions.md) = `'literal'`

Defined in: handlers/literal-expression-handler.ts:6

#### Implementation of

[`ExpressionHandler`](../interfaces/ExpressionHandler.md).[`type`](../interfaces/ExpressionHandler.md#type)

## Methods

### resolve()

> **resolve**(`exp`, `_context`): `Promise`\<`boolean`\>

Defined in: handlers/literal-expression-handler.ts:8

#### Parameters

##### exp

[`LiteralExpression`](../interfaces/LiteralExpression.md)

##### \_context

[`ExpressionEvaluatorContext`](../interfaces/ExpressionEvaluatorContext.md)

#### Returns

`Promise`\<`boolean`\>

#### Implementation of

[`ExpressionHandler`](../interfaces/ExpressionHandler.md).[`resolve`](../interfaces/ExpressionHandler.md#resolve)
