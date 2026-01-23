[**@axi-engine/utils**](../README.md)

***

[@axi-engine/utils](../README.md) / DataStorage

# Interface: DataStorage

Defined in: data-source.ts:69

A full CRUD contract for systems that provide complete data management.
Combines both reading and writing capabilities.

## Extends

- [`DataSource`](DataSource.md).[`DataSink`](DataSink.md)

## Methods

### create()

> **create**(`path`, `value`): `void`

Defined in: data-source.ts:46

Strictly creates a new value at the specified path.
This operation should typically fail or throw an error if a value already exists
at the path.

#### Parameters

##### path

[`PathType`](../type-aliases/PathType.md)

The full path where the new value will be created.

##### value

`unknown`

The initial value to create.

#### Returns

`void`

#### Inherited from

[`DataSink`](DataSink.md).[`create`](DataSink.md#create)

***

### delete()

> **delete**(`path`): `void`

Defined in: data-source.ts:62

Deletes the value at the specified path.

#### Parameters

##### path

[`PathType`](../type-aliases/PathType.md)

The path to the value to be deleted.

#### Returns

`void`

#### Inherited from

[`DataSink`](DataSink.md).[`delete`](DataSink.md#delete)

***

### get()

> **get**(`path`): `unknown`

Defined in: data-source.ts:8

#### Parameters

##### path

[`PathType`](../type-aliases/PathType.md)

#### Returns

`unknown`

#### Inherited from

[`DataSource`](DataSource.md).[`get`](DataSource.md#get)

***

### has()

> **has**(`path`): `boolean`

Defined in: data-source.ts:15

Checks if a path valid.

#### Parameters

##### path

[`PathType`](../type-aliases/PathType.md)

The path to the node.

#### Returns

`boolean`

`true` if the node exists, otherwise `false`.

#### Inherited from

[`DataSource`](DataSource.md).[`has`](DataSource.md#has)

***

### set()

> **set**(`path`, `value`): `void`

Defined in: data-source.ts:36

Strictly updates the value at an *existing* path.
This operation should typically fail or throw an error if no value exists at the path.

#### Parameters

##### path

[`PathType`](../type-aliases/PathType.md)

The path to the value to be updated.

##### value

`unknown`

The new value to set.

#### Returns

`void`

#### Inherited from

[`DataSink`](DataSink.md).[`set`](DataSink.md#set)

***

### upset()

> **upset**(`path`, `value`): `void`

Defined in: data-source.ts:55

Updates a value at a specified path if it exists, or creates it if it does not.
This is a convenient and non-strict combination of the `set` and `create` operations.

#### Parameters

##### path

[`PathType`](../type-aliases/PathType.md)

The path to the value to be created or updated.

##### value

`unknown`

The value to set.

#### Returns

`void`

#### Inherited from

[`DataSink`](DataSink.md).[`upset`](DataSink.md#upset)
