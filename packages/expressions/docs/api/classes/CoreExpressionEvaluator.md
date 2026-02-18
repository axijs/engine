[**@axi-engine/expressions**](../README.md)

***

[@axi-engine/expressions](../README.md) / CoreExpressionEvaluator

# Class: CoreExpressionEvaluator

Defined in: core-expression-evaluator.ts:24

The class responsible for evaluating expression trees.

It acts as an orchestrator that manages a registry of `ExpressionHandler`
instances and delegates the evaluation of a specific expression to the
appropriate handler.

Users typically do not create this class directly but use the
`createExpressionEvaluator` factory function, which provides a pre-configured
instance with all core handlers.

## Implements

- [`ExpressionEvaluator`](../interfaces/ExpressionEvaluator.md)

## Constructors

### Constructor

> **new CoreExpressionEvaluator**(): `CoreExpressionEvaluator`

#### Returns

`CoreExpressionEvaluator`

## Properties

### handlers

> **handlers**: `Registry`\<keyof [`ExpressionDefinitions`](../interfaces/ExpressionDefinitions.md), [`ExpressionHandler`](../interfaces/ExpressionHandler.md)\<[`Expression`](../type-aliases/Expression.md)\>\>

Defined in: core-expression-evaluator.ts:26

**`Internal`**

A map of registered expression handlers.

## Methods

### register()

> **register**(`handler`): `void`

Defined in: core-expression-evaluator.ts:37

Registers a new `ExpressionHandler` with the evaluator.
This is the primary mechanism for extending the expression language with
custom logic and new expression types.

#### Parameters

##### handler

[`ExpressionHandler`](../interfaces/ExpressionHandler.md)

The `ExpressionHandler` instance to register.

#### Returns

`void`

#### Throws

Throws an error if a handler for the same expression type
is already registered.

***

### resolve()

> **resolve**(`expression`, `data`): `Promise`\<`boolean`\>

Defined in: core-expression-evaluator.ts:54

Resolves a given expression against a data source.

This is the main entry point for the evaluation process. It identifies the
expression type by its key, finds the corresponding handler, creates the
evaluation context, and delegates the evaluation task to the handler.

#### Parameters

##### expression

[`Expression`](../type-aliases/Expression.md)

The expression object to evaluate.

##### data

`DataSource`

The `DataSource` to be used for resolving any `ReferenceOperand`s
within the expression tree.

#### Returns

`Promise`\<`boolean`\>

A promise that resolves to `true` or `false` based on the
evaluation result.

#### Implementation of

[`ExpressionEvaluator`](../interfaces/ExpressionEvaluator.md).[`resolve`](../interfaces/ExpressionEvaluator.md#resolve)
