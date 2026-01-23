[**@axi-engine/utils**](../README.md)

***

[@axi-engine/utils](../README.md) / DataSink

# Interface: DataSink

Defined in: data-source.ts:28

A write-only contract for any system that can accept or mutate data by path.

This interface is the counterpart to `DataSource` and represents the "write" side
of a complete data storage system. It provides a standard set of methods for
creating, updating, and deleting data, abstracting away the underlying
implementation details.

## Extended by

- [`DataStorage`](DataStorage.md)

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
