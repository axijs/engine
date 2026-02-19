[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / CoreFields

# Class: CoreFields

Defined in: data/src/core-fields.ts:7

## Extends

- `FieldsWithDefaultGeneric`\<*typeof* [`Fields`](Fields.md), `this`\> & [`Fields`](Fields.md)\<`this`\> & `object` & `object` & `object` & `object` & `object` & `object` & `object` & `object` & `object`

## Constructors

### Constructor

> **new CoreFields**(...`args`): `CoreFields`

Defined in: utils/dist/index.d.ts:39

#### Parameters

##### args

...`any`[]

#### Returns

`CoreFields`

#### Inherited from

`WithBooleanFields(WithStringFields(WithNumericFields(WithDefaultGenericFields(Fields)))).constructor`

## Properties

### \_fieldRegistry

> `readonly` **\_fieldRegistry**: [`FieldRegistry`](FieldRegistry.md)

Defined in: data/src/fields.ts:17

#### Inherited from

`WithBooleanFields(WithStringFields(WithNumericFields(WithDefaultGenericFields(Fields))))._fieldRegistry`

***

### \_fields

> `readonly` **\_fields**: `Map`\<`string`, [`Field`](../interfaces/Field.md)\<`any`\>\>

Defined in: data/src/fields.ts:16

#### Inherited from

`WithBooleanFields(WithStringFields(WithNumericFields(WithDefaultGenericFields(Fields))))._fields`

***

### createBoolean()

> **createBoolean**: (`name`, `initialValue`, `options?`) => [`CoreBooleanField`](CoreBooleanField.md)

#### Parameters

##### name

`string`

##### initialValue

`boolean`

##### options?

[`CoreBooleanFieldOptions`](../interfaces/CoreBooleanFieldOptions.md)

#### Returns

[`CoreBooleanField`](CoreBooleanField.md)

#### Inherited from

`WithBooleanFields(WithStringFields(WithNumericFields(WithDefaultGenericFields(Fields)))).createBoolean`

***

### createNumeric()

> **createNumeric**: (`name`, `initialValue`, `options?`) => [`CoreNumericField`](CoreNumericField.md)

#### Parameters

##### name

`string`

##### initialValue

`number`

##### options?

[`CoreNumericFieldOptions`](../interfaces/CoreNumericFieldOptions.md)

#### Returns

[`CoreNumericField`](CoreNumericField.md)

#### Inherited from

`WithBooleanFields(WithStringFields(WithNumericFields(WithDefaultGenericFields(Fields)))).createNumeric`

***

### createString()

> **createString**: (`name`, `initialValue`, `options?`) => [`CoreStringField`](CoreStringField.md)

#### Parameters

##### name

`string`

##### initialValue

`string`

##### options?

[`CoreStringFieldOptions`](../interfaces/CoreStringFieldOptions.md)

#### Returns

[`CoreStringField`](CoreStringField.md)

#### Inherited from

`WithBooleanFields(WithStringFields(WithNumericFields(WithDefaultGenericFields(Fields)))).createString`

***

### getBoolean()

> **getBoolean**: (`name`) => [`CoreBooleanField`](CoreBooleanField.md)

#### Parameters

##### name

`string`

#### Returns

[`CoreBooleanField`](CoreBooleanField.md)

#### Inherited from

`WithBooleanFields(WithStringFields(WithNumericFields(WithDefaultGenericFields(Fields)))).getBoolean`

***

### getNumeric()

> **getNumeric**: (`name`) => [`CoreNumericField`](CoreNumericField.md)

#### Parameters

##### name

`string`

#### Returns

[`CoreNumericField`](CoreNumericField.md)

#### Inherited from

`WithBooleanFields(WithStringFields(WithNumericFields(WithDefaultGenericFields(Fields)))).getNumeric`

***

### getString()

> **getString**: (`name`) => [`CoreStringField`](CoreStringField.md)

#### Parameters

##### name

`string`

#### Returns

[`CoreStringField`](CoreStringField.md)

#### Inherited from

`WithBooleanFields(WithStringFields(WithNumericFields(WithDefaultGenericFields(Fields)))).getString`

***

### typeName

> `readonly` **typeName**: `"fields"` = `Fields.typeName`

Defined in: data/src/fields.ts:14

#### Inherited from

`WithBooleanFields(WithStringFields(WithNumericFields(WithDefaultGenericFields(Fields)))).typeName`

***

### upsetBoolean()

> **upsetBoolean**: (`name`, `value`, `options?`) => [`CoreBooleanField`](CoreBooleanField.md)

#### Parameters

##### name

`string`

##### value

`boolean`

##### options?

[`CoreBooleanFieldOptions`](../interfaces/CoreBooleanFieldOptions.md)

#### Returns

[`CoreBooleanField`](CoreBooleanField.md)

#### Inherited from

`WithBooleanFields(WithStringFields(WithNumericFields(WithDefaultGenericFields(Fields)))).upsetBoolean`

***

### upsetNumeric()

> **upsetNumeric**: (`name`, `value`, `options?`) => [`CoreNumericField`](CoreNumericField.md)

#### Parameters

##### name

`string`

##### value

`number`

##### options?

[`CoreNumericFieldOptions`](../interfaces/CoreNumericFieldOptions.md)

#### Returns

[`CoreNumericField`](CoreNumericField.md)

#### Inherited from

`WithBooleanFields(WithStringFields(WithNumericFields(WithDefaultGenericFields(Fields)))).upsetNumeric`

***

### upsetString()

> **upsetString**: (`name`, `value`, `options?`) => [`CoreStringField`](CoreStringField.md)

#### Parameters

##### name

`string`

##### value

`string`

##### options?

[`CoreStringFieldOptions`](../interfaces/CoreStringFieldOptions.md)

#### Returns

[`CoreStringField`](CoreStringField.md)

#### Inherited from

`WithBooleanFields(WithStringFields(WithNumericFields(WithDefaultGenericFields(Fields)))).upsetString`

## Accessors

### fields

#### Get Signature

> **get** **fields**(): `Map`\<`string`, [`Field`](../interfaces/Field.md)\<`any`\>\>

Defined in: data/src/fields.ts:48

**`Internal`**

Gets the read-only map of all `Field` instances in this container.

##### Returns

`Map`\<`string`, [`Field`](../interfaces/Field.md)\<`any`\>\>

The collection of fields.

#### Inherited from

`WithBooleanFields(WithStringFields(WithNumericFields(WithDefaultGenericFields(Fields)))).fields`

## Methods

### add()

> **add**\<`T`\>(`field`): `T`

Defined in: data/src/fields.ts:76

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

#### Inherited from

`WithBooleanFields(WithStringFields(WithNumericFields(WithDefaultGenericFields(Fields)))).add`

***

### clear()

> **clear**(): `void`

Defined in: data/src/fields.ts:175

Removes all fields from the collection, ensuring each is properly destroyed.

#### Returns

`void`

#### Inherited from

`WithBooleanFields(WithStringFields(WithNumericFields(WithDefaultGenericFields(Fields)))).clear`

***

### create()

> **create**\<`T`\>(`typeName`, `name`, `initialValue`, `options?`): `T`

Defined in: data/src/fields.ts:99

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

#### Inherited from

`WithBooleanFields(WithStringFields(WithNumericFields(WithDefaultGenericFields(Fields)))).create`

***

### createGeneric()

> **createGeneric**\<`T`\>(`name`, `initialValue`, `options?`): [`CoreField`](CoreField.md)\<`T`\>

Defined in: data/src/mixins/with-default-generic-fields.mixin.ts:10

#### Type Parameters

##### T

`T`

#### Parameters

##### name

`string`

##### initialValue

`T`

##### options?

[`FieldOptions`](../interfaces/FieldOptions.md)\<`T`\>

#### Returns

[`CoreField`](CoreField.md)\<`T`\>

#### Inherited from

`WithBooleanFields(WithStringFields(WithNumericFields(WithDefaultGenericFields(Fields)))).createGeneric`

***

### destroy()

> **destroy**(): `void`

Defined in: data/src/fields.ts:179

#### Returns

`void`

#### Inherited from

`WithBooleanFields(WithStringFields(WithNumericFields(WithDefaultGenericFields(Fields)))).destroy`

***

### get()

> **get**\<`TField`\>(`name`): `TField`

Defined in: data/src/fields.ts:141

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

#### Inherited from

`WithBooleanFields(WithStringFields(WithNumericFields(WithDefaultGenericFields(Fields)))).get`

***

### getGeneric()

> **getGeneric**\<`T`\>(`name`): [`CoreField`](CoreField.md)\<`T`\>

Defined in: data/src/mixins/with-default-generic-fields.mixin.ts:18

#### Type Parameters

##### T

`T`

#### Parameters

##### name

`string`

#### Returns

[`CoreField`](CoreField.md)\<`T`\>

#### Inherited from

`WithBooleanFields(WithStringFields(WithNumericFields(WithDefaultGenericFields(Fields)))).getGeneric`

***

### has()

> **has**(`name`): `boolean`

Defined in: data/src/fields.ts:65

Checks if a field with the given name exists in the collection.

#### Parameters

##### name

`string`

The name of the field to check.

#### Returns

`boolean`

`true` if the field exists, otherwise `false`.

#### Inherited from

`WithBooleanFields(WithStringFields(WithNumericFields(WithDefaultGenericFields(Fields)))).has`

***

### remove()

> **remove**(`names`): `void`

Defined in: data/src/fields.ts:151

Removes one or more fields from the collection.
This method ensures that the `destroy` method of each removed field is called to clean up its resources.

#### Parameters

##### names

A single name or an array of names to remove.

`string` | `string`[]

#### Returns

`void`

#### Inherited from

`WithBooleanFields(WithStringFields(WithNumericFields(WithDefaultGenericFields(Fields)))).remove`

***

### upset()

> **upset**\<`T`\>(`typeName`, `name`, `value`, `options?`): `T`

Defined in: data/src/fields.ts:120

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

#### Inherited from

`WithBooleanFields(WithStringFields(WithNumericFields(WithDefaultGenericFields(Fields)))).upset`

***

### upsetGeneric()

> **upsetGeneric**\<`T`\>(`name`, `value`, `options?`): [`CoreField`](CoreField.md)\<`T`\>

Defined in: data/src/mixins/with-default-generic-fields.mixin.ts:14

#### Type Parameters

##### T

`T`

#### Parameters

##### name

`string`

##### value

`T`

##### options?

[`FieldOptions`](../interfaces/FieldOptions.md)\<`T`\>

#### Returns

[`CoreField`](CoreField.md)\<`T`\>

#### Inherited from

`WithBooleanFields(WithStringFields(WithNumericFields(WithDefaultGenericFields(Fields)))).upsetGeneric`

## Events

### onAdd

> **onAdd**: `Emitter`\<\[`object`\]\>

Defined in: data/src/fields.ts:26

An event emitter that fires when a new field is added to the collection.

#### Param

The event payload.

#### Param

The name of the added field.

#### Param

The `Field` instance that was added.

#### Inherited from

`WithBooleanFields(WithStringFields(WithNumericFields(WithDefaultGenericFields(Fields)))).onAdd`

***

### onRemove

> **onRemove**: `Emitter`\<\[`object`\]\>

Defined in: data/src/fields.ts:37

An event emitter that fires after one or more fields have been removed.

#### Param

The event payload.

#### Param

An array of names of the fields that were successfully removed.

#### Inherited from

`WithBooleanFields(WithStringFields(WithNumericFields(WithDefaultGenericFields(Fields)))).onRemove`
