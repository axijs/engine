[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / FieldRegistry

# Class: FieldRegistry

Defined in: data/src/field-registry.ts:5

## Extends

- `Registry`\<`string`, `Constructor`\<[`Field`](../interfaces/Field.md)\<`any`\>\>\>

## Constructors

### Constructor

> **new FieldRegistry**(): `FieldRegistry`

#### Returns

`FieldRegistry`

#### Inherited from

`Registry<string, Constructor<Field<any>>>.constructor`

## Properties

### items

> `protected` `readonly` **items**: `Map`\<`string`, `Constructor`\<[`Field`](../interfaces/Field.md)\<`any`\>\>\>

Defined in: utils/dist/index.d.ts:461

#### Inherited from

`Registry.items`

## Methods

### clear()

> **clear**(): `void`

Defined in: utils/dist/index.d.ts:491

Clears all registered items from the registry.

#### Returns

`void`

#### Inherited from

`Registry.clear`

***

### delete()

> **delete**(`key`): `boolean`

Defined in: utils/dist/index.d.ts:487

#### Parameters

##### key

`string`

#### Returns

`boolean`

#### Inherited from

`Registry.delete`

***

### get()

> **get**(`key`): `Constructor`\<[`Field`](../interfaces/Field.md)\<`any`\>\> \| `undefined`

Defined in: utils/dist/index.d.ts:479

Retrieves an item by its key.

#### Parameters

##### key

`string`

The key of the item to retrieve.

#### Returns

`Constructor`\<[`Field`](../interfaces/Field.md)\<`any`\>\> \| `undefined`

The item, or `undefined` if not found.

#### Inherited from

`Registry.get`

***

### getOrThrow()

> **getOrThrow**(`key`): `Constructor`

Defined in: utils/dist/index.d.ts:486

Retrieves an item by its key, throwing an error if it's not found.

#### Parameters

##### key

`string`

The key of the item to retrieve.

#### Returns

`Constructor`

The item.

#### Throws

if no item is found for the given key.

#### Inherited from

`Registry.getOrThrow`

***

### has()

> **has**(`key`): `boolean`

Defined in: utils/dist/index.d.ts:473

Checks if an item with the given key is registered.

#### Parameters

##### key

`string`

The key to check.

#### Returns

`boolean`

#### Inherited from

`Registry.has`

***

### register()

> **register**(`key`, `value`): `void`

Defined in: utils/dist/index.d.ts:468

Registers an item with a specific key.
Warns if an item with the same key is already registered.

#### Parameters

##### key

`string`

The key to associate with the item.

##### value

`Constructor`

The item to register.

#### Returns

`void`

#### Inherited from

`Registry.register`
