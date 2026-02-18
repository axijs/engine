[**@axi-engine/expressions**](../README.md)

***

[@axi-engine/expressions](../README.md) / OrExpressionHandler

# Class: OrExpressionHandler

Defined in: handlers/or-expression-handler.ts:5

Defines the contract for a class that can evaluate a specific type of expression.

Each expression type in the system (e.g., `comparison`, `and`, `in`) must have a
corresponding class that implements this interface. The `ExpressionEvaluator` uses these
handlers to delegate the actual evaluation logic.

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

The unique key for the expression type this handler processes.
This must match one of the keys in the `ExpressionDefinitions` interface.

#### Implementation of

[`ExpressionHandler`](../interfaces/ExpressionHandler.md).[`type`](../interfaces/ExpressionHandler.md#type)

## Methods

### resolve()

> **resolve**(`exp`, `context`): `Promise`\<`boolean`\>

Defined in: handlers/or-expression-handler.ts:8

The core evaluation logic for the expression.

#### Parameters

##### exp

[`OrExpression`](../interfaces/OrExpression.md)

The specific expression object to be evaluated, strongly typed to `T`.

##### context

[`ExpressionEvaluatorContext`](../interfaces/ExpressionEvaluatorContext.md)

The `ExpressionEvaluatorContext` which provides tools for the
  handler, such as a way to recursively resolve child expressions or access the
  data source.

#### Returns

`Promise`\<`boolean`\>

A promise that resolves to the boolean result of the evaluation.

#### Implementation of

[`ExpressionHandler`](../interfaces/ExpressionHandler.md).[`resolve`](../interfaces/ExpressionHandler.md#resolve)
