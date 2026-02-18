[**@axi-engine/expressions**](../README.md)

***

[@axi-engine/expressions](../README.md) / ExpressionEvaluatorBuilder

# Class: ExpressionEvaluatorBuilder

Defined in: setup.ts:31

A builder class for configuring and creating a `CoreExpressionEvaluator`.
Allows enabling standard handlers or registering custom ones via a fluent API.

## Constructors

### Constructor

> **new ExpressionEvaluatorBuilder**(): `ExpressionEvaluatorBuilder`

#### Returns

`ExpressionEvaluatorBuilder`

## Methods

### add()

> **add**(`handler`): `this`

Defined in: setup.ts:47

Registers one or more custom expression handlers.

#### Parameters

##### handler

A single handler instance or an array of handlers.

[`ExpressionHandler`](../interfaces/ExpressionHandler.md)\<[`Expression`](../type-aliases/Expression.md)\> | [`ExpressionHandler`](../interfaces/ExpressionHandler.md)\<[`Expression`](../type-aliases/Expression.md)\>[]

#### Returns

`this`

***

### build()

> **build**(): [`CoreExpressionEvaluator`](CoreExpressionEvaluator.md)

Defined in: setup.ts:59

#### Returns

[`CoreExpressionEvaluator`](CoreExpressionEvaluator.md)

CoreExpressionEvaluator

***

### withDefaults()

> **withDefaults**(): `ExpressionEvaluatorBuilder`

Defined in: setup.ts:38

Adds the complete set of standard expression handlers to the configuration.
This is the recommended starting point for most applications.

#### Returns

`ExpressionEvaluatorBuilder`
