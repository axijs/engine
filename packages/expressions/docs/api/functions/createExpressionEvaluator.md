[**@axi-engine/expressions**](../README.md)

***

[@axi-engine/expressions](../README.md) / createExpressionEvaluator

# Function: createExpressionEvaluator()

> **createExpressionEvaluator**(`additionalHandlers?`): [`ExpressionEvaluator`](../classes/ExpressionEvaluator.md)

Defined in: setup.ts:36

A factory function that creates and initializes an `ExpressionEvaluator` instance.

This is the recommended way to set up the evaluator, as it comes pre-configured
with handlers for all core expression types (logical, comparison, chance, etc.).
It also provides a simple way to extend the evaluator with custom logic by passing
additional handlers.

## Parameters

### additionalHandlers?

[`ExpressionHandler`](../interfaces/ExpressionHandler.md)\<[`Expression`](../type-aliases/Expression.md)\>[]

An optional array of custom
  `ExpressionHandler` instances to register in addition to the core ones. This allows for
  extending the expression language with new capabilities.

## Returns

[`ExpressionEvaluator`](../classes/ExpressionEvaluator.md)

A fully configured `ExpressionEvaluator` instance,
  ready for resolving expressions.

## Examples

```ts
// Basic setup with only core handlers
const coreEvaluator = createExpressionEvaluator();
const result = await coreEvaluator.resolve(someExpression, dataSource);
```

```ts
// Setup with a custom handler for a new expression type
const customHandlers = [new MyCustomExpressionHandler()];
const extendedEvaluator = createExpressionEvaluator(customHandlers);
const customResult = await extendedEvaluator.resolve(myCustomExpression, dataSource);
```
