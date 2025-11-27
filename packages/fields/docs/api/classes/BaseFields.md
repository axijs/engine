[**@axi-engine/fields**](../README.md)

***

[@axi-engine/fields](../README.md) / BaseFields

# Abstract Class: BaseFields\<T\>

Defined in: base-fields.ts:16

An abstract base class for managing a reactive collection of `Field` instances.

This class is designed to be the foundation for state management systems,
such as managing stats, flags, or items.

## Extended by

- [`Fields`](Fields.md)
- [`TypedFields`](TypedFields.md)

## Type Parameters

### T

`T`

The common base type for the values held by the fields in this collection.

## Constructors

### Constructor

> **new BaseFields**\<`T`\>(): `BaseFields`\<`T`\>

#### Returns

`BaseFields`\<`T`\>

## Properties

### \_fields

> `protected` `readonly` **\_fields**: `Signal`\<`Map`\<`string`, [`Field`](Field.md)\<`T`\>\>\>

Defined in: base-fields.ts:17

***

### events

> `readonly` **events**: `AxiEventEmitter`\<`"created"` \| `"removed"`\>

Defined in: base-fields.ts:18

## Accessors

### fields

#### Get Signature

> **get** **fields**(): `ReadonlySignal`\<`ReadonlyMap`\<`string`, [`Field`](Field.md)\<`any`\>\>\>

Defined in: base-fields.ts:25

A readonly signal providing access to the current map of fields.
Use this signal with `effect` to react when fields are added or removed from the collection.
Avoid to change any data in the map manually.

##### Returns

`ReadonlySignal`\<`ReadonlyMap`\<`string`, [`Field`](Field.md)\<`any`\>\>\>

## Methods

### add()

> **add**(`field`): [`Field`](Field.md)\<`T`\>

Defined in: base-fields.ts:54

Adds a pre-existing `Field` instance to the collection.
Throws an error if a field with the same name already exists.

#### Parameters

##### field

[`Field`](Field.md)\<`T`\>

The `Field` instance to add.

#### Returns

[`Field`](Field.md)\<`T`\>

The added `Field` instance.

***

### clear()

> **clear**(): `void`

Defined in: base-fields.ts:124

Removes all fields from the collection, ensuring each is properly destroyed.

#### Returns

`void`

***

### create()

> **create**(`name`, `initialValue`): [`Field`](Field.md)\<`T`\>

Defined in: base-fields.ts:44

Creates and adds a new `Field` to the collection.

#### Parameters

##### name

`string`

The unique name for the new field.

##### initialValue

`T`

The initial value for the new field.

#### Returns

[`Field`](Field.md)\<`T`\>

The newly created `Field` instance.

***

### get()

> **get**(`name`): [`Field`](Field.md)\<`T`\>

Defined in: base-fields.ts:75

Retrieves a field by its name.
Throws an error if the field does not exist.

#### Parameters

##### name

`string`

The name of the field to retrieve.

#### Returns

[`Field`](Field.md)\<`T`\>

The `Field` instance.

***

### has()

> **has**(`name`): `boolean`

Defined in: base-fields.ts:34

Checks if a field with the given name exists in the collection.

#### Parameters

##### name

`string`

The name of the field to check.

#### Returns

`boolean`

`true` if the field exists, otherwise `false`.

***

### hydrate()

> **hydrate**(`snapshot`): `void`

Defined in: base-fields.ts:145

Restores the state of the fields from a snapshot.
It uses the `upset` logic to create or update fields based on the snapshot data.

#### Parameters

##### snapshot

`any`

The snapshot object to load.

#### Returns

`void`

***

### remove()

> **remove**(`names`): `void`

Defined in: base-fields.ts:100

Removes one or more fields from the collection.
This method ensures that the `destroy` method of each removed field is called to clean up its resources.

#### Parameters

##### names

A single name or an array of names to remove.

`string` | `string`[]

#### Returns

`void`

***

### snapshot()

> **snapshot**(): `Record`\<`string`, `any`\>

Defined in: base-fields.ts:132

Creates a serializable snapshot of the current state of all fields.

#### Returns

`Record`\<`string`, `any`\>

A plain JavaScript object representing the values of all fields.

***

### upset()

> **upset**(`name`, `value`): [`Field`](Field.md)\<`T`\>

Defined in: base-fields.ts:86

"Update or Insert": Updates a field's value if it exists, or creates a new one if it doesn't.

#### Parameters

##### name

`string`

The name of the field.

##### value

`T`

The value to set.

#### Returns

[`Field`](Field.md)\<`T`\>

The existing or newly created `Field` instance.
