# @axi-engine/expressions

[![NPM version](https://img.shields.io/npm/v/@axi-engine/expressions.svg)](https://www.npmjs.com/package/@axi-engine/expressions)

A flexible, type-safe, and extensible engine for evaluating declarative logical expressions.
It allows you to define complex game logic (like quest conditions, dialogue triggers, or AI behavior) in data files (e.g., JSON) instead of hard-coding it.

## Key Features

-   **Declarative Logic:** Define complex conditions as data, making them easy to author, modify, and store.
-   **Type-Safe:** Built entirely with TypeScript, providing strong type checking and autocompletion.
-   **Extensible:** Easily add your own custom expression types and logic by creating new handlers.
-   **Asynchronous by Design:** Core evaluation is promise-based, allowing for future async operations.
-   **Decoupled:**  Depends only on @axi-engine/utils for shared types and a simple DataSource interface, making it easy to integrate with any state management system.

## Installation

```bash
npm install @axi-engine/expressions
```

## Core Concepts

- **`Expression`**: A plain JavaScript object that defines a logical condition (e.g., `comparison`, `and`, `or`).
- **`DataSource`**: A simple interface (`{ get(path), has(path) }`) that provides the data against which expressions are evaluated. This can be your game's state manager, a local scope, or any other data source.
- **`ExpressionEvaluator`**: The main class that takes an `Expression` and a `DataSource` and resolves them to a boolean result.

## Basic Usage

Here's how to set up the evaluator and resolve a simple expression.

```typescript
import { createExpressionEvaluator } from '@axi-engine/expressions';
import type { Expression } from '@axi-engine/expressions';
import type { DataSource } from '@axi-engine/utils';

// 1. Create the evaluator (it comes with all core handlers pre-registered)
const evaluator = createExpressionEvaluator();

// 2. Define a data source that provides the state
const myGameDataSource: DataSource = {
  get: (path) => {
    const state = new Map<string, any>([
      ['player.level', 10],
      ['player.class', 'mage'],
      ['gate.locked', true],
    ]);
    return state.get(path.join('.'));
  },
  has: (path) => { /* ... */ }
};

// 3. Define an expression, for example in a JSON file or directly in code
const canOpenGate: Expression = {
  and: [
    {
      comparison: {
        op: '>=',
        left: { path: ['player', 'level'] },
        right: { value: 5 }
      }
    },
    {
      comparison: {
        op: '==',
        left: { path: ['gate', 'locked'] },
        right: { value: true }
      }
    }
  ]
};

// 4. Resolve the expression
async function checkCondition() {
  const result = await evaluator.resolve(canOpenGate, myGameDataSource);
  console.log('Can the player open the gate?', result); // -> true
}

checkCondition();
```

## Built-in Expressions

Here are some examples of the core expression types available out of the box.

| Type             | Example                                                                                 | Description                                                                                                           |
|:-----------------|:----------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------|
| **`comparison`** | `{ "comparison": { "op": ">", "left": { "path": "p.hp" }, "right": { "value": 50 } } }` | Compares two values.                                                                                                  |
| **`and`**        | `{ "and": [ { ...expr1 }, { ...expr2 } ] }`                                             | Returns `true` if all child expressions are true.                                                                     |
| **`or`**         | `{ "or": [ { ...expr1 }, { ...expr2 } ] }`                                              | Returns `true` if at least one child expression is true.                                                              |
| **`not`**        | `{ "not": { "exists": "p.curse" } }`                                                    | Inverts the result of a child expression.                                                                             |
| **`exists`**     | `{ "exists": "p.inventory.key" }`                                                       | Returns `true` if a value exists at the given path.                                                                   |
| **`in`**         | `{ "in": { "value": { "path": "p.class" }, "array": ["mage", "warlock"] } }`            | Checks if a value is present in an array. The array can also be a reference: `"array": { "path": "q.valid_classes" }` |
| **`chance`**     | `{ "chance": { "value": 15.5 } }`                                                       | Returns `true` based on a 15.5% probability.                                                                          |
| **`literal`**    | `{ "literal": true }`                                                                   | Directly returns `true` or `false`. Useful for debugging.                                                             |

## Extending with Custom Expressions

Adding your own expression types is straightforward. Let's create a `between` expression.

**1. Define the Expression Type**
Create an interface for your new expression.

```typescript
// my-expressions.ts
import type { Operand } from '@axi-engine/expressions';

export interface BetweenExpression {
  between: {
    value: Operand,
    min: Operand,
    max: Operand
  }
}
```

**2. Augment the Global Definitions**

Use TypeScript's declaration merging to make the evaluator aware of your new type.

```typescript
// my-expressions.ts
import type { ExpressionDefinitions } from '@axi-engine/expressions';

declare module '@axi-engine/expressions' {
  export interface ExpressionDefinitions {
    between: BetweenExpression;
  }
}
```

**3. Create the Handler**

Write the class that contains the evaluation logic.

```typescript
// BetweenExpressionHandler.ts
import { ExpressionHandler, resolveOperandAsScalar } from '@axi-engine/expressions';
import { isNumber } from '@axi-engine/utils';

class BetweenExpressionHandler implements ExpressionHandler<BetweenExpression> {
  type: 'between' = 'between';

  async resolve(exp: BetweenExpression, context: ExpressionEvaluatorContext) {
    const value = resolveOperandAsScalar(exp.between.value, context.source());
    const min = resolveOperandAsScalar(exp.between.min, context.source());
    const max = resolveOperandAsScalar(exp.between.max, context.source());

    if (isNumber(value) && isNumber(min) && isNumber(max)) {
      return value >= min && value <= max;
    }
    return false;
  }
}
```

**4. Register the Handler**

Pass your new handler to the factory function during initialization.

```typescript
import { createExpressionEvaluator } from '@axi-engine/expressions';

const myHandlers = [new BetweenExpressionHandler()];
const evaluator = createExpressionEvaluator(myHandlers);

// Now you can use it!
const expression = {
  between: { value: { path: 'player.level' }, min: { value: 10 }, max: { value: 20 } }
};
```

## API Reference

[**Browse the API Documentation here**](https://github.com/axijs/engine/tree/main/packages/expressions/docs/api)

## License

MIT
