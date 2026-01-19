[**@axi-engine/expressions**](../README.md)

***

[@axi-engine/expressions](../README.md) / ExpressionHandler

# Interface: ExpressionHandler\<T\>

Defined in: expression-handler.ts:4

## Type Parameters

### T

`T` *extends* [`Expression`](../type-aliases/Expression.md) = [`Expression`](../type-aliases/Expression.md)

## Properties

### type

> **type**: keyof [`ExpressionDefinitions`](ExpressionDefinitions.md)

Defined in: expression-handler.ts:5

## Methods

### resolve()

> **resolve**(`exp`, `context`): `Promise`\<`boolean`\>

Defined in: expression-handler.ts:7

#### Parameters

##### exp

`T`

##### context

[`ExpressionEvaluatorContext`](ExpressionEvaluatorContext.md)

#### Returns

`Promise`\<`boolean`\>
