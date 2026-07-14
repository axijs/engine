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

Defined in: packages/utils/dist/index.d.ts:218

#### Inherited from

`Registry.items`

## Accessors

### size

#### Get Signature

> **get** **size**(): `number`

Defined in: packages/utils/dist/index.d.ts:222

Gets the number of registered items.

##### Returns

`number`

#### Inherited from

`Registry.size`

## Methods

### clear()

> **clear**(): `void`

Defined in: packages/utils/dist/index.d.ts:268

Clears all registered items from the registry.

#### Returns

`void`

#### Inherited from

`Registry.clear`

***

### delete()

> **delete**(`key`): `boolean`

Defined in: packages/utils/dist/index.d.ts:264

#### Parameters

##### key

`string`

#### Returns

`boolean`

#### Inherited from

`Registry.delete`

***

### find()

> **find**(`predicate`): \[`string`, `Constructor`\<[`Field`](../interfaces/Field.md)\<`any`\>\>\] \| `undefined`

Defined in: packages/utils/dist/index.d.ts:245

#### Parameters

##### predicate

(`value`, `key`) => `boolean`

#### Returns

\[`string`, `Constructor`\<[`Field`](../interfaces/Field.md)\<`any`\>\>\] \| `undefined`

#### Inherited from

`Registry.find`

***

### forEach()

> **forEach**(`callback`): `void`

Defined in: packages/utils/dist/index.d.ts:234

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

Defined in: packages/utils/dist/index.d.ts:256

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

Defined in: packages/utils/dist/index.d.ts:263

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

Defined in: packages/utils/dist/index.d.ts:250

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

### keys()

> **keys**(): `MapIterator`\<`string`\>

Defined in: packages/utils/dist/index.d.ts:240

#### Returns

`MapIterator`\<`string`\>

#### Inherited from

`Registry.keys`

***

### register()

> **register**(`key`, `value`): `void`

Defined in: packages/utils/dist/index.d.ts:229

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

Defined in: packages/utils/dist/index.d.ts:239

Returns an iterable iterator of all registered values.

#### Returns

`IterableIterator`\<`Constructor`\<[`Field`](../interfaces/Field.md)\<`any`\>\>\>

An iterable iterator for the values.

#### Inherited from

`Registry.values`
