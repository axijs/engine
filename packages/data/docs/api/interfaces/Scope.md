[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / Scope

# Interface: Scope

Defined in: packages/data/src/scope/scope.ts:4

## Extends

- `DataStorage`.`Destroyable`

## Properties

### name?

> `readonly` `optional` **name**: `string`

Defined in: packages/data/src/scope/scope.ts:6

***

### parent?

> `optional` **parent**: `Scope`

Defined in: packages/data/src/scope/scope.ts:7

***

### uid

> `readonly` **uid**: `string`

Defined in: packages/data/src/scope/scope.ts:5

## Methods

### clear()

> **clear**(): `void`

Defined in: packages/utils/dist/index.d.ts:200

Deletes all values

#### Returns

`void`

#### Inherited from

`DataStorage.clear`

***

### create()

> **create**\<`T`\>(`name`, `value`): `void`

Defined in: packages/data/src/scope/scope.ts:41

Creates a new value in the scope resolved by the path.

#### Type Parameters

##### T

`T` = `any`

#### Parameters

##### name

`PathType`

##### value

`T`

#### Returns

`void`

#### Overrides

`DataStorage.create`

***

### delete()

> **delete**(`name`): `void`

Defined in: packages/data/src/scope/scope.ts:46

Deletes a value from the scope resolved by the path.

#### Parameters

##### name

`PathType`

#### Returns

`void`

#### Overrides

`DataStorage.delete`

***

### destroy()

> **destroy**(): `void`

Defined in: packages/utils/dist/index.d.ts:140

Destroys the object, releasing all held resources.
After calling this, the object should be considered unusable.

#### Returns

`void`

#### Inherited from

`Destroyable.destroy`

***

### extend()

> **extend**(`name?`): `Scope`

Defined in: packages/data/src/scope/scope.ts:12

create child Scope with optional name

#### Parameters

##### name?

`string`

#### Returns

`Scope`

***

### get()

> **get**\<`T`\>(`name`): `T`

Defined in: packages/data/src/scope/scope.ts:23

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

#### Overrides

`DataStorage.get`

***

### has()

> **has**(`name`): `boolean`

Defined in: packages/data/src/scope/scope.ts:52

Checks whether a value exists in this scope or anywhere in its parent scope
chain.

#### Parameters

##### name

`PathType`

#### Returns

`boolean`

#### Overrides

`DataStorage.has`

***

### set()

> **set**\<`T`\>(`name`, `value`): `void`

Defined in: packages/data/src/scope/scope.ts:30

Updates an existing value in the nearest scope where it is found.

A multi-segment path addressing a named scope updates that scope directly.

#### Type Parameters

##### T

`T` = `any`

#### Parameters

##### name

`PathType`

##### value

`T`

#### Returns

`void`

#### Overrides

`DataStorage.set`

***

### tick()

> **tick**(): `void`

Defined in: packages/data/src/scope/scope.ts:14

#### Returns

`void`

***

### upsert()

> **upsert**\<`T`\>(`name`, `value`): `void`

Defined in: packages/data/src/scope/scope.ts:36

Updates an existing value or creates a new one in the scope resolved by the
path. A plain name is therefore created in the current scope.

#### Type Parameters

##### T

`T` = `any`

#### Parameters

##### name

`PathType`

##### value

`T`

#### Returns

`void`

#### Overrides

`DataStorage.upsert`
