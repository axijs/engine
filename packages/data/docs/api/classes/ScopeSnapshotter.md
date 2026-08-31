[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / ScopeSnapshotter

# Class: ScopeSnapshotter

Defined in: packages/data/src/scope-serializers/scope-snapshotter.ts:6

## Constructors

### Constructor

> **new ScopeSnapshotter**(`snapshotter?`): `ScopeSnapshotter`

Defined in: packages/data/src/scope-serializers/scope-snapshotter.ts:12

#### Parameters

##### snapshotter?

[`StoreSnapshotter`](StoreSnapshotter.md)

Optional store snapshotter to use.

#### Returns

`ScopeSnapshotter`

## Properties

### snapshotter

> `readonly` **snapshotter**: [`StoreSnapshotter`](StoreSnapshotter.md)

Defined in: packages/data/src/scope-serializers/scope-snapshotter.ts:7

## Methods

### snapshotHierarchy()

> **snapshotHierarchy**(`scope`): [`ScopeSnapshot`](../interfaces/ScopeSnapshot.md)

Defined in: packages/data/src/scope-serializers/scope-snapshotter.ts:51

Captures the full hierarchy from the root ancestor.

#### Parameters

##### scope

[`CoreScope`](CoreScope.md)

Any scope in the hierarchy.

#### Returns

[`ScopeSnapshot`](../interfaces/ScopeSnapshot.md)

A snapshot of the entire scope tree rooted at the topmost ancestor.

***

### snapshotScope()

> **snapshotScope**(`scope`): [`ScopeSnapshot`](../interfaces/ScopeSnapshot.md)

Defined in: packages/data/src/scope-serializers/scope-snapshotter.ts:22

Captures a single scope and its serialized data.

#### Parameters

##### scope

[`CoreScope`](CoreScope.md)

The scope to snapshot.

#### Returns

[`ScopeSnapshot`](../interfaces/ScopeSnapshot.md)

A snapshot of the scope without child scopes.

***

### snapshotSubtree()

> **snapshotSubtree**(`scope`): [`ScopeSnapshot`](../interfaces/ScopeSnapshot.md)

Defined in: packages/data/src/scope-serializers/scope-snapshotter.ts:37

Captures a scope and all nested child scopes.

#### Parameters

##### scope

[`CoreScope`](CoreScope.md)

The root scope of the subtree.

#### Returns

[`ScopeSnapshot`](../interfaces/ScopeSnapshot.md)

A snapshot containing the scope data and its child snapshots.
