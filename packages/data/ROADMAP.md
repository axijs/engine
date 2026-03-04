# Roadmap

### Extend serialization (idea):

Implement a differential state tracking mechanism to optimize memory usage for `ScriptPlayer` rollback functionality. Instead of storing full snapshots,
the system could store only state deltas.

Two potential approaches:
1.  **State Comparator:** A utility that compares the current state object against a reference (previous) state to generate a diff.
2.  **Event Interceptor:** A system that subscribes to `CoreStore` and `FieldTree` events to track mutations (`set`, `create`, `delete`) in real-time, effectively creating a transaction log for the current execution step.

> **Note:** This is a long-term consideration. 
> It requires careful evaluation to determine if the added complexity is justified. 
> It is possible that this implementation may be unnecessary for the current scope, or its primary use case might shift from the `ScriptPlayer` to other systems.

### Implement Comprehensive Unit Tests:

Establish a testing framework (Vitest).

Create test suites for core classes: Field, Fields, FieldTree, DataStore, and ExpressionEvaluator.

This is crucial for ensuring system stability, preventing regressions, and enabling confident refactoring.

### Introduce ComputedField:

Create a new read-only Field type whose value is derived from one or more other fields.

It should automatically cache its value and only re-evaluate when its dependencies change.

Use Case: player.can_sprint = player.stamina > 10. The can_sprint field would automatically update when stamina changes.


### Enhanced Support for Complex Objects (ObjectField / JsonField):

Design and implement a dedicated Field type for storing and managing complex, nested objects, providing more granular reactivity than the generic Field<T>.

---

### ~~Streamlined System Initialization (FieldSystem Facade):~~

~~Create a unified factory or class to simplify the setup process, 
bundling the registry, factory, store, 
and serializer into a single, ready-to-use system.~~


