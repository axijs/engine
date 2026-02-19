# Roadmap

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

### Streamlined System Initialization (FieldSystem Facade):

Create a unified factory or class to simplify the setup process, 
bundling the registry, factory, store, 
and serializer into a single, ready-to-use system.


