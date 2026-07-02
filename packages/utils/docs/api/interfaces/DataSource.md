[**@axi-engine/utils**](../README.md)

***

[@axi-engine/utils](../README.md) / DataSource

# Interface: DataSource

Defined in: data.ts:6

A read-only contract for any system that can provide data by path.

## Extended by

- [`DataStorage`](DataStorage.md)

## Methods

### get()

> **get**\<`T`\>(`path`): `T`

Defined in: data.ts:8

#### Type Parameters

##### T

`T` *extends* `unknown`

#### Parameters

##### path

[`PathType`](../type-aliases/PathType.md)

#### Returns

`T`

***

### has()

> **has**(`path`): `boolean`

Defined in: data.ts:15

Checks if a path valid.

#### Parameters

##### path

[`PathType`](../type-aliases/PathType.md)

The path to the node.

#### Returns

`boolean`

`true` if the node exists, otherwise `false`.
