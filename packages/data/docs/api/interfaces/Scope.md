[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / Scope

# Interface: Scope

Defined in: packages/data/src/scope/scope.ts:3

## Extends

- `DataStorage`

## Properties

### name?

> `readonly` `optional` **name**: `string`

Defined in: packages/data/src/scope/scope.ts:5

***

### uid?

> `readonly` `optional` **uid**: `string`

Defined in: packages/data/src/scope/scope.ts:4

## Methods

### clear()

> **clear**(): `void`

Defined in: packages/utils/dist/index.d.ts:248

Deletes all values

#### Returns

`void`

#### Inherited from

`DataStorage.clear`

***

### create()

> **create**\<`T`\>(`name`, `value`): `void`

Defined in: packages/data/src/scope/scope.ts:31

hierarchically create variable with name and value
will create variable in the top context block or frame

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

Defined in: packages/data/src/scope/scope.ts:37

hierarchically delete variable with name, manual deleting can be dangerous!
deleting works only with variables in local scope

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

Defined in: packages/utils/dist/index.d.ts:48

Destroys the object, releasing all held resources.
After calling this, the object should be considered unusable.

#### Returns

`void`

#### Inherited from

`DataStorage.destroy`

***

### extend()

> **extend**(`name?`): `Scope`

Defined in: packages/data/src/scope/scope.ts:10

create child Scope with optional name

#### Parameters

##### name?

`string`

#### Returns

`Scope`

***

### get()

> **get**\<`T`\>(`name`): `T`

Defined in: packages/data/src/scope/scope.ts:17

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

#### Overrides

`DataStorage.get`

***

### has()

> **has**(`name`): `boolean`

Defined in: packages/data/src/scope/scope.ts:42

hierarchically check is variable with name exists

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

Defined in: packages/data/src/scope/scope.ts:23

hierarchically set value to field with name
searching target variable from top frame or context to bottom

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

### upset()

> **upset**\<`T`\>(`name`, `value`): `void`

Defined in: packages/data/src/scope/scope.ts:25

Updates a value at a specified path if it exists, or creates it if it does not.
This is a convenient and non-strict combination of the `set` and `create` operations.

#### Type Parameters

##### T

`T` = `any`

#### Parameters

##### name

`PathType`

##### value

`T`

The value to set.

#### Returns

`void`

#### Overrides

`DataStorage.upset`
