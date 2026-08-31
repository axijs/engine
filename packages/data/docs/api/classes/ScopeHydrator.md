[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / ScopeHydrator

# Class: ScopeHydrator

Defined in: packages/data/src/scope-serializers/scope-hydrator.ts:8

Resolves a parent scope from its uid stored in a scope snapshot.

## Constructors

### Constructor

> **new ScopeHydrator**(`hydrator?`): `ScopeHydrator`

Defined in: packages/data/src/scope-serializers/scope-hydrator.ts:11

#### Parameters

##### hydrator?

[`StoreHydrator`](StoreHydrator.md)

#### Returns

`ScopeHydrator`

## Properties

### hydrator

> `readonly` **hydrator**: [`StoreHydrator`](StoreHydrator.md)

Defined in: packages/data/src/scope-serializers/scope-hydrator.ts:9

## Methods

### hydrateScope()

> **hydrateScope**(`snapshot`, `parent?`): [`CoreScope`](CoreScope.md)

Defined in: packages/data/src/scope-serializers/scope-hydrator.ts:23

Creates a scope from a snapshot and hydrates its store data.

#### Parameters

##### snapshot

[`ScopeSnapshot`](../interfaces/ScopeSnapshot.md)

##### parent?

[`CoreScope`](CoreScope.md)

#### Returns

[`CoreScope`](CoreScope.md)

CoreScope

***

### patchScope()

> **patchScope**(`scope`, `snapshot`, `parent?`): `void`

Defined in: packages/data/src/scope-serializers/scope-hydrator.ts:36

Applies a snapshot to an existing scope and patches its store data.

#### Parameters

##### scope

[`CoreScope`](CoreScope.md)

##### snapshot

[`ScopeSnapshot`](../interfaces/ScopeSnapshot.md)

##### parent?

[`CoreScope`](CoreScope.md)

#### Returns

`void`
