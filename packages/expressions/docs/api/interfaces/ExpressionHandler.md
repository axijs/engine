[**@axi-engine/expressions**](../README.md)

***

[@axi-engine/expressions](../README.md) / ExpressionHandler

# Interface: ExpressionHandler\<T\>

Defined in: expression-handler.ts:15

Defines the contract for a class that can evaluate a specific type of expression.

Each expression type in the system (e.g., `comparison`, `and`, `in`) must have a
corresponding class that implements this interface. The `ExpressionEvaluator` uses these
handlers to delegate the actual evaluation logic.

## Type Parameters

### T

`T` *extends* [`Expression`](../type-aliases/Expression.md) = [`Expression`](../type-aliases/Expression.md)

The specific `Expression` subtype that this handler is responsible for.
  This provides strong typing within the `resolve` method.

## Properties

### type

> **type**: keyof [`ExpressionDefinitions`](ExpressionDefinitions.md)

Defined in: expression-handler.ts:20

The unique key for the expression type this handler processes.
This must match one of the keys in the `ExpressionDefinitions` interface.

## Methods

### resolve()

> **resolve**(`exp`, `context`): `Promise`\<`boolean`\>

Defined in: expression-handler.ts:31

The core evaluation logic for the expression.

#### Parameters

##### exp

`T`

The specific expression object to be evaluated, strongly typed to `T`.

##### context

[`ExpressionEvaluatorContext`](ExpressionEvaluatorContext.md)

The `ExpressionEvaluatorContext` which provides tools for the
  handler, such as a way to recursively resolve child expressions or access the
  data source.

#### Returns

`Promise`\<`boolean`\>

A promise that resolves to the boolean result of the evaluation.
