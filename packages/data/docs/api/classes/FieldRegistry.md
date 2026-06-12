[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / FieldRegistry

# Class: FieldRegistry

Defined in: packages/data/src/fields/field-registry.ts:5

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

Defined in: packages/utils/dist/index.d.ts:208

#### Inherited from

`Registry.items`

## Accessors

### size

#### Get Signature

> **get** **size**(): `number`

Defined in: packages/utils/dist/index.d.ts:212

Gets the number of registered items.

##### Returns

`number`

#### Inherited from

`Registry.size`

## Methods

### clear()

> **clear**(): `void`

Defined in: packages/utils/dist/index.d.ts:252

Clears all registered items from the registry.

#### Returns

`void`

#### Inherited from

`Registry.clear`

***

### delete()

> **delete**(`key`): `boolean`

Defined in: packages/utils/dist/index.d.ts:248

#### Parameters

##### key

`string`

#### Returns

`boolean`

#### Inherited from

`Registry.delete`

***

### forEach()

> **forEach**(`callback`): `void`

Defined in: packages/utils/dist/index.d.ts:224

Executes a provided function once for each registered item.

#### Parameters

##### callback

(`value`, `key`, `map`) => `void`

Function to execute for each element.

#### Returns

`void`

#### Inherited from

`Registry.forEach`

***

### get()

> **get**(`key`): `Constructor`\<[`Field`](../interfaces/Field.md)\<`any`\>\> \| `undefined`

Defined in: packages/utils/dist/index.d.ts:240

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

Defined in: packages/utils/dist/index.d.ts:247

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

Defined in: packages/utils/dist/index.d.ts:234

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

Defined in: packages/utils/dist/index.d.ts:219

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

***

### values()

> **values**(): `IterableIterator`\<`Constructor`\<[`Field`](../interfaces/Field.md)\<`any`\>\>\>

Defined in: packages/utils/dist/index.d.ts:229

Returns an iterable iterator of all registered values.

#### Returns

`IterableIterator`\<`Constructor`\<[`Field`](../interfaces/Field.md)\<`any`\>\>\>

An iterable iterator for the values.

#### Inherited from

`Registry.values`
