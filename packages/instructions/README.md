# @axi-engine/instructions

[![NPM version](https://img.shields.io/npm/v/@axi-engine/instructions.svg)](https://www.npmjs.com/package/@axi-engine/instructions)

## Description

**@axi-engine/instructions** is a declarative execution engine designed for game logic and scripting.
It allows you to define application logic using JSON-serializable objects,
making it ideal for quests, dialogues, cutscenes, and AI behaviors.

It works in tandem with `@axi-engine/expressions` for logic evaluation.
It relies on core interfaces from `@axi-engine/utils` and pairs perfectly with `@axi-engine/data` for concrete data storage implementations.

## Installation

```bash
npm install @axi-engine/instructions
```

## Core Concepts

- **`Instruction`**: A plain JavaScript object that defines an actionable operation (e.g., `set`, `if`, `log`).
- **`DataStorage`**: An interface extending `DataSource` (`{ get, set, delete, ... }`) that allows instructions to read and modify the application state.
- **`InstructionResolver`**: The core engine that processes `Instruction` objects within a given context, delegating execution to specific handlers.

## Usage

### 1. Configuration

Use the builder to create an InstructionResolver.
You can include standard sets of instructions or add custom ones.

```typescript
import {configureInstructions} from '@axi-engine/instructions';

// Create a resolver with all standard instructions (Data, Logic, Utils)
const resolver = configureInstructions()
  .withDefaults()
  .build();
```

### 2. Execution

To execute instructions, you need a context that provides access to your Data Storage and Expression Evaluator.

```TypeScript
const context = {
  storage: () => myDataStorage,       // Implementation of DataStorage (e.g., from @axi-engine/data)
  expressions: () => myEvaluator,     // Instance of ExpressionEvaluator
  instructions: () => resolver        // Self-reference for recursive instructions
};

const script = [
  {log: "Starting..."},
  {create: {field: "quest/status", var: {value: "started"}}}
];

await resolver.execute(script, context);
```

## Built-in Instructions

Here are the core instruction types available out of the box.

| Type         | Example                                                                                                     | Description                                                                           |
|:-------------|:------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------|
| **`log`**    | `{ "log": ["Welcome ", { "path": "player.name" }] }`                                                        | Outputs a message or variable values to the system log.                               |
| **`create`** | `{ "create": { "field": "quest.status", "var": { "value": "active" } } }`                                   | Creates a new variable. Throws an error if the path already exists.                   |
| **`set`**    | `{ "set": { "field": "player.hp", "var": { "value": 50 } } }`                                               | Updates an existing variable. Throws an error if the path does not exist.             |
| **`upset`**  | `{ "upset": { "field": "meta.save_time", "var": { "value": 12345 } } }`                                     | Updates a variable if it exists, or creates it if it doesn't (Upsert).                |
| **`delete`** | `{ "delete": "inventory.temp_items" }`                                                                      | Removes a variable or group at the specified path.                                    |
| **`if`**     | `{ "if": { "condition": { "literal": true }, "then": [ ... ], "else": [ ... ] } }`                          | Executes a list of instructions based on a boolean expression.                        |
| **`switch`** | `{ "switch": { "check": { "path": "class" }, "cases": [ { "case": { "value": "mage" }, "do": [...] } ] } }` | Selects a block of instructions to execute by matching a value against defined cases. |


## Extending with Custom Instructions

todo

## License

MIT
