# Roadmap

### Complete Test Coverage:

Achieve high test coverage for all core logic

### Type-Safe Task Generators via API Interface:
An interface for the `Tasks` object could be introduced to provide overloaded method signatures. 
This would enable stricter, more accurate type inference, particularly for the `sequence` function, removing the need for developers to manually specify the return type.

**Example:**

```typescript
export interface TasksAPI {
  ...
  // just for exambpe 
  sequence(): CompletableTask<void>;
  sequence<T>(tasks: [...CompletableTask<any>[], CompletableTask<T>]): CompletableTask<T>;
  ...
}

// Current behavior
const result = await Tasks.sequence<number>([ taskA, taskB ]).promise;

// Proposed behavior with overloads
const result = await Tasks.sequence([taskA, taskB]).promise; // `result` type is automatically inferred as `number`
```

### Investigate Variadic Functions vs. Arrays:
Consider replacing array parameters with variadic functions (rest parameters) for task generators like `sequence`. 

This could offer a more concise API (`Tasks.sequence(taskA, taskB)`) but needs to be evaluated for practical usability, 
as array-based operations are currently consistent across the system and may be more convenient.
