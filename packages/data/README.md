# @axi-engine/data

[![NPM version](https://img.shields.io/npm/v/@axi-engine/data.svg)](https://www.npmjs.com/package/@axi-engine/data)

## Description

`@axi-engine/data` is a compact, reactive state management library designed around a tree of typed fields.
It provides a core data layer for the axi-engine ecosystem and can also be used as a standalone package in TypeScript applications.

The package combines:
- low-level field trees and typed field containers,
- a high-level store API for creating, reading, updating, and removing values,
- hierarchical scopes for parent/child data resolution,
- serializers and hydrators for persistence and snapshot flows.

It uses `@axi-engine/utils` for normalized path handling and configurable `PathType` support, allowing both string and array paths.

This package is under active development, and its API may evolve as the library grows.

## Install

```bash
npm install @axi-engine/data
```

## Quick Start

```ts
import {
  createCoreFieldSystem,
  createCoreStoreSystem,
  CoreScope
} from '@axi-engine/data';
import { configure } from '@axi-engine/utils';

// Optional global path configuration.
configure({ pathSeparator: '.' });

// Initialize field system and store system
const fieldSystem = createCoreFieldSystem();
const storeSystem = createCoreStoreSystem(fieldSystem);
const store = storeSystem.factory.create();

// Create values inside the store using string and array paths
store.createValue('player.health', 100);
store.createValue(['player', 'name'], 'Hero');

// Read and update values
const health = store.getValue<number>('player.health');
store.setValue(['player', 'health'], health - 10);

// Capture the store state in a snapshot
const snapshot = storeSystem.snapshotter.snapshot(store);

// Rehydrate a new store from the snapshot
const restoredStore = storeSystem.hydrator.hydrate(snapshot);

// Use a hierarchical scope for named context resolution
const rootScope = new CoreScope({ data: store, name: 'root' });
rootScope.create('player.score', 2500);
const score = rootScope.get<number>('player.score');

const childScope = rootScope.extend('battle');
childScope.upset('player.health', 80);
```

## Package overview

### Fields

The `fields` layer is the low-level reactive data model.
It manages:
- `FieldTree` nodes and `Fields` containers,
- typed field definitions such as `CoreNumericField`, `CoreStringField`, and `CoreBooleanField`,
- policy support for value constraints,
- serializers and hydrators for snapshots and persistence.

### Store

The `store` layer exposes a developer-friendly API for working with state.
`CoreStore` provides:
- typed value creation and retrieval,
- automatic field-type resolution for primitives,
- explicit typed field creation methods,
- tree-based `Fields` and `FieldTree` node management,
- isolated store creation for sandboxed contexts.

### Snapshotting and hydration

The package supports state persistence through snapshot and hydrate helpers.
`createCoreStoreSystem(fieldsSystem)` provides:
- `snapshotter.snapshot(store)` to capture the current store state,
- `hydrator.hydrate(snapshot)` to restore a `CoreStore` from saved data,
- `hydrator.patch(store, snapshot)` to synchronize an existing store with a snapshot.

Snapshots preserve initialized variable containers and field trees, and they can be used for save/load, undo/redo, or network sync.

### Path handling

Paths use `PathType` from `@axi-engine/utils`, which supports both string and array forms (`string | string[]`).
This makes it easy to write either:
- `store.createValue('player.health', 100)`
- `store.createValue(['player', 'health'], 100)`

The default separator is `.` and can be changed globally through `@axi-engine/utils`:

```ts
import { configure } from '@axi-engine/utils';
configure({ pathSeparator: '/' });
```

Internal helpers such as `ensurePathArray` and `ensurePathString` normalize paths for consistent store and scope operations.

### Extending the system

`@axi-engine/data` supports low-level extension with custom field classes.
This is most useful when you need domain-specific field behavior beyond the built-in numeric, string, and boolean types.

A custom field class can extend `CoreField` and implement `Field`, then be registered in the field registry before the store system is created.

```ts
import { CoreField, Field } from '@axi-engine/data';

export class StringArrayField extends CoreField<string[]> implements Field {
  static override readonly typeName = 'stringArray';
  override readonly typeName = StringArrayField.typeName;

  get first(): string | undefined {
    return this.value.length ? this.value[0] : undefined;
  }

  get last(): string | undefined {
    return this.value.length ? this.value[this.value.length - 1] : undefined;
  }

  get empty(): boolean {
    return this.value.length === 0;
  }

  get length(): number {
    return this.value.length;
  }
}
```

Register the field type on the field system registry before building the store:

```ts
const fieldSystem = createCoreFieldSystem();
fieldSystem.factory.fieldRegistry.register(StringArrayField.typeName, StringArrayField);
const storeSystem = createCoreStoreSystem(fieldSystem);
const store = storeSystem.factory.create();
```

Because this extension works at the low level, you typically create the custom field with `CoreFields` directly:

```ts
const decks = store.createFields('decks');
const deck = decks.create(StringArrayField.typeName, 'deck', []);
```

The field system’s serializers and hydrators are configured from the same registry, so snapshotting and hydration continue to work correctly for custom field types.

### Scope

The `scope` layer provides hierarchical variable resolution.
`CoreScope` allows:
- named parent and child scopes,
- hierarchical `get`, `set`, `create`, `upset`, and `delete` operations,
- scope-relative and parent-scope access via path resolution.

## Key features

- Reactive tree-based state storage
- Typed field creation with explicit and inferred types
- Data serialization and hydration support
- Isolated store instances for sandboxed contexts
- Hierarchical scope resolution across parent/child scopes
- Small dependency footprint and TypeScript-first design

## Public API

The package exposes the primary module entry points via `src/index.ts`.
Important exports include:

- `createCoreFieldSystem()` — initializes the core field system with registry, factory, snapshotter, and hydrator
- `createCoreStoreSystem(fieldsSystem)` — initializes the store factory and store serialization helpers
- `CoreScope` — hierarchical scope implementation for scoped variable access
- `CoreStore` — high-level store interface for managing typed values and fields
- `@axi-engine/utils` exports like `PathType`, `configure`, `ensurePathArray`, and `ensurePathString` can be used to normalize path values and configure global path separators.

Additional utilities are available through `fields`, `store`, and `scope` exports, including serializers, policies, and field factories.

## Documentation

[**Browse the API documentation here**](https://github.com/axijs/engine/tree/main/packages/data/docs/api)

## License

MIT

