[**@axi-engine/expressions**](../README.md)

***

[@axi-engine/expressions](../README.md) / ExpressionEvaluator

# Interface: ExpressionEvaluator

Defined in: expression-evaluator.ts:11

Defines the contract for an engine capable of evaluating logical expression trees.

## Methods

### resolve()

> **resolve**(`expression`, `data`): `Promise`\<`boolean`\>

Defined in: expression-evaluator.ts:20

Evaluates a logical expression against a provided data source.

#### Parameters

##### expression

[`Expression`](../type-aliases/Expression.md)

The expression tree to evaluate.

##### data

`DataSource`

The data source used to resolve variable references within the expression.

#### Returns

`Promise`\<`boolean`\>

A promise that resolves to `true` or `false` based on the evaluation result.
