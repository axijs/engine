[**@axi-engine/expressions**](../README.md)

***

[@axi-engine/expressions](../README.md) / ExpressionEvaluator

# Class: ExpressionEvaluator

Defined in: expression-evaluator.ts:16

## Constructors

### Constructor

> **new ExpressionEvaluator**(): `ExpressionEvaluator`

#### Returns

`ExpressionEvaluator`

## Properties

### handlers

> **handlers**: `Map`\<keyof [`ExpressionDefinitions`](../interfaces/ExpressionDefinitions.md), [`ExpressionHandler`](../interfaces/ExpressionHandler.md)\<[`Expression`](../type-aliases/Expression.md)\>\>

Defined in: expression-evaluator.ts:17

## Methods

### register()

> **register**(`handler`): `void`

Defined in: expression-evaluator.ts:19

#### Parameters

##### handler

[`ExpressionHandler`](../interfaces/ExpressionHandler.md)

#### Returns

`void`

***

### resolve()

> **resolve**(`expression`, `data`): `Promise`\<`boolean`\>

Defined in: expression-evaluator.ts:24

#### Parameters

##### expression

[`Expression`](../type-aliases/Expression.md)

##### data

`DataSource`

#### Returns

`Promise`\<`boolean`\>
