[**@axi-engine/fields**](../README.md)

***

[@axi-engine/fields](../README.md) / Fields

# Class: Fields

Defined in: fields/src/fields.ts:12

A container for a collection of named `Field` instances.

This class acts as a "leaf" node in the `FieldTree` hierarchy, managing a flat
key-value store of reactive data points. It uses a `FieldRegistry` to dynamically
create `Field` instances of different types.

## Constructors

### Constructor

> **new Fields**(`fieldRegistry`): `Fields`

Defined in: fields/src/fields.ts:56

Creates an instance of Fields.

#### Parameters

##### fieldRegistry

[`FieldRegistry`](FieldRegistry.md)

The registry used to create new `Field` instances.

#### Returns

`Fields`

## Properties

### \_fieldRegistry

> `readonly` **\_fieldRegistry**: [`FieldRegistry`](FieldRegistry.md)

Defined in: fields/src/fields.ts:17

***

### \_fields

> `readonly` **\_fields**: `Map`\<`string`, [`Field`](../interfaces/Field.md)\<`any`\>\>

Defined in: fields/src/fields.ts:16

***

### typeName

> `readonly` **typeName**: `"fields"` = `Fields.typeName`

Defined in: fields/src/fields.ts:14

***

### typeName

> `readonly` `static` **typeName**: `"fields"` = `'fields'`

Defined in: fields/src/fields.ts:13

## Accessors

### fields

#### Get Signature

> **get** **fields**(): `Map`\<`string`, [`Field`](../interfaces/Field.md)\<`any`\>\>

Defined in: fields/src/fields.ts:48

**`Internal`**

Gets the read-only map of all `Field` instances in this container.

##### Returns

`Map`\<`string`, [`Field`](../interfaces/Field.md)\<`any`\>\>

The collection of fields.

## Methods

### add()

> **add**\<`T`\>(`field`): `T`

Defined in: fields/src/fields.ts:76

Adds a pre-existing `Field` instance to the collection and fires the `onAdd` event.

#### Type Parameters

##### T

`T` *extends* [`Field`](../interfaces/Field.md)\<`any`\>

The specific `Field` type being added.

#### Parameters

##### field

[`Field`](../interfaces/Field.md)\<`any`\>

The `Field` instance to add.

#### Returns

`T`

The added `Field` instance, cast to type `T`.

#### Throws

If a field with the same name already exists.

***

### clear()

> **clear**(): `void`

Defined in: fields/src/fields.ts:172

Removes all fields from the collection, ensuring each is properly destroyed.

#### Returns

`void`

***

### create()

> **create**\<`T`\>(`typeName`, `name`, `initialValue`, `options?`): `T`

Defined in: fields/src/fields.ts:99

Creates a new `Field` instance of a specified type, adds it to the collection, and returns it.
This is the primary factory method for creating fields within this container.

#### Type Parameters

##### T

`T` *extends* [`Field`](../interfaces/Field.md)\<`any`\>

The expected `Field` type to be returned.

#### Parameters

##### typeName

`string`

The registered type name of the field to create (e.g., 'numeric', 'boolean').

##### name

`string`

The unique name for the new field.

##### initialValue

`any`

The initial value for the new field.

##### options?

`any`

Optional configuration passed to the field's constructor.

#### Returns

`T`

The newly created `Field` instance.

***

### destroy()

> **destroy**(): `void`

Defined in: fields/src/fields.ts:176

#### Returns

`void`

***

### get()

> **get**\<`TField`\>(`name`): `TField`

Defined in: fields/src/fields.ts:141

Retrieves a field by its name.

#### Type Parameters

##### TField

`TField` *extends* [`Field`](../interfaces/Field.md)\<`any`\>

The expected `Field` type to be returned.

#### Parameters

##### name

`string`

The name of the field to retrieve.

#### Returns

`TField`

The `Field` instance.

#### Throws

If the field does not exist.

***

### has()

> **has**(`name`): `boolean`

Defined in: fields/src/fields.ts:65

Checks if a field with the given name exists in the collection.

#### Parameters

##### name

`string`

The name of the field to check.

#### Returns

`boolean`

`true` if the field exists, otherwise `false`.

***

### remove()

> **remove**(`names`): `void`

Defined in: fields/src/fields.ts:151

Removes one or more fields from the collection.
This method ensures that the `destroy` method of each removed field is called to clean up its resources.

#### Parameters

##### names

A single name or an array of names to remove.

`string` | `string`[]

#### Returns

`void`

***

### upset()

> **upset**\<`T`\>(`typeName`, `name`, `value`, `options?`): `T`

Defined in: fields/src/fields.ts:120

Updates an existing field's value or creates a new one if it doesn't exist.

#### Type Parameters

##### T

`T` *extends* [`Field`](../interfaces/Field.md)\<`any`\>

The expected `Field` type.

#### Parameters

##### typeName

`string`

The type name to use if a new field needs to be created.

##### name

`string`

The name of the field to update or create.

##### value

`any`

The new value to set.

##### options?

`any`

Optional configuration, used only if a new field is created.

#### Returns

`T`

The existing or newly created `Field` instance.

## Events

### onAdd

> **onAdd**: `Emitter`\<\[`object`\]\>

Defined in: fields/src/fields.ts:26

An event emitter that fires when a new field is added to the collection.

#### Param

The event payload.

#### Param

The name of the added field.

#### Param

The `Field` instance that was added.

***

### onRemove

> **onRemove**: `Emitter`\<\[`object`\]\>

Defined in: fields/src/fields.ts:37

An event emitter that fires after one or more fields have been removed.

#### Param

The event payload.

#### Param

An array of names of the fields that were successfully removed.
