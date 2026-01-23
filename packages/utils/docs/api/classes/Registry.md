[**@axi-engine/utils**](../README.md)

***

[@axi-engine/utils](../README.md) / Registry

# Class: Registry\<K, V\>

Defined in: registry.ts:11

A generic, type-safe wrapper around a Map for managing collections of items by key.
This class provides a consistent API for registering, retrieving, and checking for
the existence of items.

## Type Parameters

### K

`K` *extends* `PropertyKey`

The type of the key (must be a string).

### V

`V`

The type of the value being stored.

## Constructors

### Constructor

> **new Registry**\<`K`, `V`\>(): `Registry`\<`K`, `V`\>

#### Returns

`Registry`\<`K`, `V`\>

## Properties

### items

> `protected` `readonly` **items**: `Map`\<`K`, `V`\>

Defined in: registry.ts:12

## Methods

### clear()

> **clear**(): `void`

Defined in: registry.ts:61

Clears all registered items from the registry.

#### Returns

`void`

***

### delete()

> **delete**(`key`): `boolean`

Defined in: registry.ts:54

#### Parameters

##### key

`K`

#### Returns

`boolean`

***

### get()

> **get**(`key`): `V` \| `undefined`

Defined in: registry.ts:38

Retrieves an item by its key.

#### Parameters

##### key

`K`

The key of the item to retrieve.

#### Returns

`V` \| `undefined`

The item, or `undefined` if not found.

***

### getOrThrow()

> **getOrThrow**(`key`): `V`

Defined in: registry.ts:48

Retrieves an item by its key, throwing an error if it's not found.

#### Parameters

##### key

`K`

The key of the item to retrieve.

#### Returns

`V`

The item.

#### Throws

if no item is found for the given key.

***

### has()

> **has**(`key`): `boolean`

Defined in: registry.ts:29

Checks if an item with the given key is registered.

#### Parameters

##### key

`K`

The key to check.

#### Returns

`boolean`

***

### register()

> **register**(`key`, `value`): `void`

Defined in: registry.ts:20

Registers an item with a specific key.
Warns if an item with the same key is already registered.

#### Parameters

##### key

`K`

The key to associate with the item.

##### value

`V`

The item to register.

#### Returns

`void`
