[**@axi-engine/utils**](../README.md)

***

[@axi-engine/utils](../README.md) / DataSource

# Interface: DataSource

Defined in: data-source.ts:6

A read-only contract for any system that can provide data by path.

## Extended by

- [`DataStorage`](DataStorage.md)

## Methods

### get()

> **get**(`path`): `unknown`

Defined in: data-source.ts:8

#### Parameters

##### path

[`PathType`](../type-aliases/PathType.md)

#### Returns

`unknown`

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
