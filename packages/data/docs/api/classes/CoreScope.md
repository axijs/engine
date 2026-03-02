[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / CoreScope

# Class: CoreScope

Defined in: packages/data/src/scope/core-scope.ts:14

## Implements

- [`Scope`](../interfaces/Scope.md)

## Constructors

### Constructor

> **new CoreScope**(`options`): `CoreScope`

Defined in: packages/data/src/scope/core-scope.ts:20

#### Parameters

##### options

[`ScopeOptions`](../interfaces/ScopeOptions.md)

#### Returns

`CoreScope`

## Properties

### data

> **data**: [`CoreStore`](CoreStore.md)

Defined in: packages/data/src/scope/core-scope.ts:16

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

***

### uid

> `readonly` **uid**: `string`

Defined in: packages/data/src/scope/core-scope.ts:15

#### Implementation of

[`Scope`](../interfaces/Scope.md).[`uid`](../interfaces/Scope.md#uid)

## Methods

### clear()

> **clear**(): `void`

Defined in: packages/data/src/scope/core-scope.ts:110

Deletes all values

#### Returns

`void`

#### Implementation of

[`Scope`](../interfaces/Scope.md).[`clear`](../interfaces/Scope.md#clear)

***

### create()

> **create**\<`T`\>(`name`, `value`): `void`

Defined in: packages/data/src/scope/core-scope.ts:89

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

Defined in: packages/data/src/scope/core-scope.ts:101

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

Defined in: packages/data/src/scope/core-scope.ts:114

Destroys the object, releasing all held resources.
After calling this, the object should be considered unusable.

#### Returns

`void`

#### Implementation of

[`Scope`](../interfaces/Scope.md).[`destroy`](../interfaces/Scope.md#destroy)

***

### extend()

> **extend**(`childName?`): [`Scope`](../interfaces/Scope.md)

Defined in: packages/data/src/scope/core-scope.ts:27

create child Scope with optional name

#### Parameters

##### childName?

`string`

#### Returns

[`Scope`](../interfaces/Scope.md)

#### Implementation of

[`Scope`](../interfaces/Scope.md).[`extend`](../interfaces/Scope.md#extend)

***

### findScopeByName()

> **findScopeByName**(`name`): `CoreScope` \| `undefined`

Defined in: packages/data/src/scope/core-scope.ts:180

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

Defined in: packages/data/src/scope/core-scope.ts:35

hierarchically read value from context
if name has only one segment - will return value from this Scope or throw error
if name has several segments - will split path to segments and check parents

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

Defined in: packages/data/src/scope/core-scope.ts:119

hierarchically check is variable with name exists

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

Defined in: packages/data/src/scope/core-scope.ts:53

hierarchically set value to field with name
searching target variable from top frame or context to bottom

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

### tracePath()

> **tracePath**(`path`): `object`

Defined in: packages/data/src/scope/core-scope.ts:145

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

### upset()

> **upset**\<`T`\>(`name`, `value`): `void`

Defined in: packages/data/src/scope/core-scope.ts:77

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

[`Scope`](../interfaces/Scope.md).[`upset`](../interfaces/Scope.md#upset)
