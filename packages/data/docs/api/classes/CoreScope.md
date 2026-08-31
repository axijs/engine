[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / CoreScope

# Class: CoreScope

Defined in: packages/data/src/scope/core-scope.ts:15

## Implements

- [`Scope`](../interfaces/Scope.md)

## Constructors

### Constructor

> **new CoreScope**(`options`): `CoreScope`

Defined in: packages/data/src/scope/core-scope.ts:30

#### Parameters

##### options

[`ScopeOptions`](../interfaces/ScopeOptions.md)

#### Returns

`CoreScope`

## Properties

### data

> **data**: [`Store`](Store.md)

Defined in: packages/data/src/scope/core-scope.ts:19

***

### name?

> `optional` **name**: `string`

Defined in: packages/data/src/scope/core-scope.ts:17

#### Implementation of

[`Scope`](../interfaces/Scope.md).[`name`](../interfaces/Scope.md#name)

***

### parent?

> `optional` **parent**: `CoreScope`

Defined in: packages/data/src/scope/core-scope.ts:18

#### Implementation of

[`Scope`](../interfaces/Scope.md).[`parent`](../interfaces/Scope.md#parent)

***

### uid

> `readonly` **uid**: `string`

Defined in: packages/data/src/scope/core-scope.ts:16

#### Implementation of

[`Scope`](../interfaces/Scope.md).[`uid`](../interfaces/Scope.md#uid)

## Accessors

### children

#### Get Signature

> **get** **children**(): `Set`\<`CoreScope`\>

Defined in: packages/data/src/scope/core-scope.ts:26

##### Returns

`Set`\<`CoreScope`\>

## Methods

### clear()

> **clear**(): `void`

Defined in: packages/data/src/scope/core-scope.ts:128

Deletes all values

#### Returns

`void`

#### Implementation of

[`Scope`](../interfaces/Scope.md).[`clear`](../interfaces/Scope.md#clear)

***

### create()

> **create**\<`T`\>(`name`, `value`): `void`

Defined in: packages/data/src/scope/core-scope.ts:107

working only for clearly resolved path to variable

#### Type Parameters

##### T

`T`

#### Parameters

##### name

`PathType`

##### value

`T`

#### Returns

`void`

#### Implementation of

[`Scope`](../interfaces/Scope.md).[`create`](../interfaces/Scope.md#create)

***

### delete()

> **delete**(`name`): `void`

Defined in: packages/data/src/scope/core-scope.ts:119

working only for clearly resolved path to variable

#### Parameters

##### name

`PathType`

#### Returns

`void`

#### Implementation of

[`Scope`](../interfaces/Scope.md).[`delete`](../interfaces/Scope.md#delete)

***

### destroy()

> **destroy**(): `void`

Defined in: packages/data/src/scope/core-scope.ts:132

Destroys the object, releasing all held resources.
After calling this, the object should be considered unusable.

#### Returns

`void`

#### Implementation of

[`Scope`](../interfaces/Scope.md).[`destroy`](../interfaces/Scope.md#destroy)

***

### extend()

> **extend**(`childName?`): `CoreScope`

Defined in: packages/data/src/scope/core-scope.ts:37

create child Scope with optional name

#### Parameters

##### childName?

`string`

#### Returns

`CoreScope`

#### Implementation of

[`Scope`](../interfaces/Scope.md).[`extend`](../interfaces/Scope.md#extend)

***

### findScopeByName()

> **findScopeByName**(`name`): `CoreScope` \| `undefined`

Defined in: packages/data/src/scope/core-scope.ts:199

Recursively searches for the nearest scope with the specified name,
traversing up the hierarchy chain.

#### Parameters

##### name

`string`

The name of the scope to find.

#### Returns

`CoreScope` \| `undefined`

The matching scope, or `undefined` if the root is reached without a match.

***

### get()

> **get**\<`T`\>(`name`): `T`

Defined in: packages/data/src/scope/core-scope.ts:53

Reads a value from this scope or, when it is not found locally, from its
parent scope chain.

A multi-segment path can also address a named scope, for example
`global.settings.debug`.

#### Type Parameters

##### T

`T` = `any`

#### Parameters

##### name

`PathType`

#### Returns

`T`

#### Implementation of

[`Scope`](../interfaces/Scope.md).[`get`](../interfaces/Scope.md#get)

***

### has()

> **has**(`name`): `boolean`

Defined in: packages/data/src/scope/core-scope.ts:138

Checks whether a value exists in this scope or anywhere in its parent scope
chain.

#### Parameters

##### name

`PathType`

#### Returns

`boolean`

#### Implementation of

[`Scope`](../interfaces/Scope.md).[`has`](../interfaces/Scope.md#has)

***

### set()

> **set**\<`T`\>(`name`, `value`): `void`

Defined in: packages/data/src/scope/core-scope.ts:71

Updates an existing value in the nearest scope where it is found.

A multi-segment path addressing a named scope updates that scope directly.

#### Type Parameters

##### T

`T`

#### Parameters

##### name

`PathType`

##### value

`T`

#### Returns

`void`

#### Implementation of

[`Scope`](../interfaces/Scope.md).[`set`](../interfaces/Scope.md#set)

***

### tick()

> **tick**(): `void`

Defined in: packages/data/src/scope/core-scope.ts:48

#### Returns

`void`

#### Implementation of

[`Scope`](../interfaces/Scope.md).[`tick`](../interfaces/Scope.md#tick)

***

### tracePath()

> **tracePath**(`path`): `object`

Defined in: packages/data/src/scope/core-scope.ts:164

Resolves the target scope node and the relative path for a variable operation.

This method disambiguates between accessing nested objects within the current scope
and accessing variables defined in named parent scopes.

Resolution Logic:
1. **Single Segment (`var`):** Always targets the current scope.
2. **`this` Keyword (`this.var`):** (SCOPE_SYSTEM_CONFIG.currentScopeKeyword) Explicitly targets the current scope (used to bypass naming conflicts).
3. **Parent Scope Name (`global.var`):** If the first segment matches a parent's name, targets that parent scope.
4. **Complex Path (`obj.prop`):** If no match is found, treats it as a nested path within the current scope.

#### Parameters

##### path

`PathType`

The full path to the variable.

#### Returns

`object`

An object containing the target scope (`node`) and the adjusted path (`path`) relative to that node.

##### path

> **path**: `PathType`

##### scope

> **scope**: `CoreScope`

***

### upsert()

> **upsert**\<`T`\>(`name`, `value`): `void`

Defined in: packages/data/src/scope/core-scope.ts:95

working only for clearly resolved path to variable

#### Type Parameters

##### T

`T`

#### Parameters

##### name

`PathType`

##### value

`T`

#### Returns

`void`

#### Implementation of

[`Scope`](../interfaces/Scope.md).[`upsert`](../interfaces/Scope.md#upsert)
