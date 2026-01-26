[**@axi-engine/fields**](../README.md)

***

[@axi-engine/fields](../README.md) / DataStore

# Class: DataStore

Defined in: fields/src/data-store.ts:20

Defines the primary high-level API for interacting with the state management system.
It acts as a facade, simplifying access to the underlying FieldTree and providing
both type-safe and dynamic methods for manipulating data.

## Implements

- [`Store`](../interfaces/Store.md)

## Constructors

### Constructor

> **new DataStore**(`tree`): `DataStore`

Defined in: fields/src/data-store.ts:35

#### Parameters

##### tree

[`CoreFieldTree`](CoreFieldTree.md)

#### Returns

`DataStore`

## Properties

### typeName

> `readonly` **typeName**: `"dataStore"` = `DataStore.typeName`

Defined in: fields/src/data-store.ts:22

#### Implementation of

[`Store`](../interfaces/Store.md).[`typeName`](../interfaces/Store.md#typename)

***

### typeName

> `readonly` `static` **typeName**: `"dataStore"` = `'dataStore'`

Defined in: fields/src/data-store.ts:21

## Methods

### clearResolvers()

> **clearResolvers**(): `void`

Defined in: fields/src/data-store.ts:45

#### Returns

`void`

***

### create()

> **create**(`path`, `value`): `void`

Defined in: fields/src/data-store.ts:215

Strictly creates a new value at the specified path.
This operation should typically fail or throw an error if a value already exists
at the path.

#### Parameters

##### path

`PathType`

The full path where the new value will be created.

##### value

`unknown`

The initial value to create.

#### Returns

`void`

#### Implementation of

[`Store`](../interfaces/Store.md).[`create`](../interfaces/Store.md#create)

***

### createBoolean()

> **createBoolean**(`path`, `initialValue`, `options?`): [`CoreBooleanField`](CoreBooleanField.md)

Defined in: fields/src/data-store.ts:87

Creates a new, strongly-typed CoreBooleanField.

#### Parameters

##### path

`PathType`

##### initialValue

`boolean`

##### options?

[`CoreBooleanFieldOptions`](../interfaces/CoreBooleanFieldOptions.md)

#### Returns

[`CoreBooleanField`](CoreBooleanField.md)

#### Throws

An error if a node already exists at the path.

#### Implementation of

[`Store`](../interfaces/Store.md).[`createBoolean`](../interfaces/Store.md#createboolean)

***

### createFields()

> **createFields**(`path`): [`CoreFields`](CoreFields.md)

Defined in: fields/src/data-store.ts:135

Strictly creates a new CoreFields container.
Any missing parent nodes in the path will be created automatically.

#### Parameters

##### path

`PathType`

The path where the new Fields container will be created.

#### Returns

[`CoreFields`](CoreFields.md)

The newly created CoreFields instance.

#### Throws

An error if a node already exists at the target path.

#### Implementation of

[`Store`](../interfaces/Store.md).[`createFields`](../interfaces/Store.md#createfields)

***

### createGeneric()

> **createGeneric**\<`T`\>(`path`, `initialValue`, `options?`): [`CoreField`](CoreField.md)\<`T`\>

Defined in: fields/src/data-store.ts:102

Creates a new, generic CoreField instance for any data type.

#### Type Parameters

##### T

`T`

#### Parameters

##### path

`PathType`

##### initialValue

`T`

##### options?

[`FieldOptions`](../interfaces/FieldOptions.md)\<`T`\>

#### Returns

[`CoreField`](CoreField.md)\<`T`\>

#### Throws

An error if a node already exists at the path.

#### Implementation of

[`Store`](../interfaces/Store.md).[`createGeneric`](../interfaces/Store.md#creategeneric)

***

### createIsolated()

> **createIsolated**(): `DataStore`

Defined in: fields/src/data-store.ts:194

Creates a new, independent instance of the Store with a fresh, empty data state (FieldsTree).

The new instance retains the same capabilities (e.g., factory configuration)
as the current one but is completely detached from the existing data hierarchy.
This is useful for creating local scopes, stack frames, or temporary data contexts.

#### Returns

`DataStore`

A new, isolated DataStore instance.

#### Implementation of

[`Store`](../interfaces/Store.md).[`createIsolated`](../interfaces/Store.md#createisolated)

***

### createNumeric()

> **createNumeric**(`path`, `initialValue`, `options?`): [`CoreNumericField`](CoreNumericField.md)

Defined in: fields/src/data-store.ts:92

Creates a new, strongly-typed CoreNumericField.

#### Parameters

##### path

`PathType`

##### initialValue

`number`

##### options?

[`CoreNumericFieldOptions`](../interfaces/CoreNumericFieldOptions.md)

#### Returns

[`CoreNumericField`](CoreNumericField.md)

#### Throws

An error if a node already exists at the path.

#### Implementation of

[`Store`](../interfaces/Store.md).[`createNumeric`](../interfaces/Store.md#createnumeric)

***

### createString()

> **createString**(`path`, `initialValue`, `options?`): [`CoreStringField`](CoreStringField.md)

Defined in: fields/src/data-store.ts:97

Creates a new, strongly-typed CoreStringField.

#### Parameters

##### path

`PathType`

##### initialValue

`string`

##### options?

[`CoreStringFieldOptions`](../interfaces/CoreStringFieldOptions.md)

#### Returns

[`CoreStringField`](CoreStringField.md)

#### Throws

An error if a node already exists at the path.

#### Implementation of

[`Store`](../interfaces/Store.md).[`createString`](../interfaces/Store.md#createstring)

***

### createTree()

> **createTree**(`path`): [`CoreFieldTree`](CoreFieldTree.md)

Defined in: fields/src/data-store.ts:139

Strictly creates a new CoreFieldTree node.
Any missing parent nodes in the path will be created automatically.

#### Parameters

##### path

`PathType`

The path where the new FieldTree node will be created.

#### Returns

[`CoreFieldTree`](CoreFieldTree.md)

The newly created CoreFieldTree instance.

#### Throws

An error if a node already exists at the target path.

#### Implementation of

[`Store`](../interfaces/Store.md).[`createTree`](../interfaces/Store.md#createtree)

***

### createValue()

> **createValue**\<`T`\>(`path`, `val`, `options?`): `T`

Defined in: fields/src/data-store.ts:61

Creates a new Field at a specified path, inferring its type from the provided value.
This is a strict operation and will fail if a node already exists at the target path.

#### Type Parameters

##### T

`T`

The type of the initial value.

#### Parameters

##### path

`PathType`

The full path where the new field will be created.

##### val

`T`

The initial value for the field.

##### options?

[`FieldOptions`](../interfaces/FieldOptions.md)\<`T`\> & [`StoreCreateFieldOptions`](../interfaces/StoreCreateFieldOptions.md)

Optional configuration, including policies and the ability to override field type.

#### Returns

`T`

value of the newly created Field instance.

#### Throws

An error if a node already exists at the path or if the parent path is invalid.

#### Implementation of

[`Store`](../interfaces/Store.md).[`createValue`](../interfaces/Store.md#createvalue)

***

### delete()

> **delete**(`path`): `void`

Defined in: fields/src/data-store.ts:223

Deletes the value at the specified path.

#### Parameters

##### path

`PathType`

The path to the value to be deleted.

#### Returns

`void`

#### Implementation of

[`Store`](../interfaces/Store.md).[`delete`](../interfaces/Store.md#delete)

***

### get()

> **get**(`path`): `unknown`

Defined in: fields/src/data-store.ts:207

#### Parameters

##### path

`PathType`

#### Returns

`unknown`

#### Implementation of

[`Store`](../interfaces/Store.md).[`get`](../interfaces/Store.md#get)

***

### getBoolean()

> **getBoolean**(`path`): [`CoreBooleanField`](CoreBooleanField.md)

Defined in: fields/src/data-store.ts:107

Retrieves a strongly-typed CoreBooleanField instance.

#### Parameters

##### path

`PathType`

#### Returns

[`CoreBooleanField`](CoreBooleanField.md)

#### Throws

An error if the path is invalid or the field is not of the expected type.

#### Implementation of

[`Store`](../interfaces/Store.md).[`getBoolean`](../interfaces/Store.md#getboolean)

***

### getField()

> **getField**\<`TField`\>(`path`): `TField`

Defined in: fields/src/data-store.ts:123

A generic method to retrieve a Field instance with a specific asserted type.

#### Type Parameters

##### TField

`TField` *extends* [`Field`](../interfaces/Field.md)\<`any`\>

The expected Field class or interface.

#### Parameters

##### path

`PathType`

#### Returns

`TField`

#### Throws

An error if the path is invalid or the field cannot be cast to the specified type.

#### Implementation of

[`Store`](../interfaces/Store.md).[`getField`](../interfaces/Store.md#getfield)

***

### getFields()

> **getFields**(`path`): [`CoreFields`](CoreFields.md)

Defined in: fields/src/data-store.ts:143

Retrieves an existing CoreFields container.

#### Parameters

##### path

`PathType`

The path to the Fields container.

#### Returns

[`CoreFields`](CoreFields.md)

The found CoreFields instance.

#### Throws

An error if the path is invalid or the node at the path is not a Fields container.

#### Implementation of

[`Store`](../interfaces/Store.md).[`getFields`](../interfaces/Store.md#getfields)

***

### getGeneric()

> **getGeneric**\<`T`\>(`path`): [`CoreField`](CoreField.md)\<`T`\>

Defined in: fields/src/data-store.ts:119

Retrieves a generic CoreField instance.

#### Type Parameters

##### T

`T`

#### Parameters

##### path

`PathType`

#### Returns

[`CoreField`](CoreField.md)\<`T`\>

#### Throws

An error if the path is invalid.

#### Implementation of

[`Store`](../interfaces/Store.md).[`getGeneric`](../interfaces/Store.md#getgeneric)

***

### getNumeric()

> **getNumeric**(`path`): [`CoreNumericField`](CoreNumericField.md)

Defined in: fields/src/data-store.ts:111

Retrieves a strongly-typed CoreNumericField instance.

#### Parameters

##### path

`PathType`

#### Returns

[`CoreNumericField`](CoreNumericField.md)

#### Throws

An error if the path is invalid or the field is not of the expected type.

#### Implementation of

[`Store`](../interfaces/Store.md).[`getNumeric`](../interfaces/Store.md#getnumeric)

***

### getString()

> **getString**(`path`): [`CoreStringField`](CoreStringField.md)

Defined in: fields/src/data-store.ts:115

Retrieves a strongly-typed CoreStringField instance.

#### Parameters

##### path

`PathType`

#### Returns

[`CoreStringField`](CoreStringField.md)

#### Throws

An error if the path is invalid or the field is not of the expected type.

#### Implementation of

[`Store`](../interfaces/Store.md).[`getString`](../interfaces/Store.md#getstring)

***

### getTree()

> **getTree**(`path`): [`CoreFieldTree`](CoreFieldTree.md)

Defined in: fields/src/data-store.ts:147

Retrieves an existing CoreFieldTree node.

#### Parameters

##### path

`PathType`

The path to the FieldTree node.

#### Returns

[`CoreFieldTree`](CoreFieldTree.md)

The found CoreFieldTree instance.

#### Throws

An error if the path is invalid or the node at the path is not a FieldTree.

#### Implementation of

[`Store`](../interfaces/Store.md).[`getTree`](../interfaces/Store.md#gettree)

***

### getValue()

> **getValue**\<`T`\>(`path`): `T`

Defined in: fields/src/data-store.ts:50

Retrieves the raw value of a Field at a specific path.

#### Type Parameters

##### T

`T`

The expected type of the value.

#### Parameters

##### path

`PathType`

The path to the field (e.g., 'player.stats.hp').

#### Returns

`T`

The raw value stored in the field.

#### Throws

An error if the path is invalid or no field exists at the path.

#### Implementation of

[`Store`](../interfaces/Store.md).[`getValue`](../interfaces/Store.md#getvalue)

***

### has()

> **has**(`path`): `boolean`

Defined in: fields/src/data-store.ts:199

code below -> implementation of the DataStore from utils

#### Parameters

##### path

`PathType`

#### Returns

`boolean`

#### Implementation of

[`Store`](../interfaces/Store.md).[`has`](../interfaces/Store.md#has)

***

### registerResolver()

> **registerResolver**(`resolver`): `void`

Defined in: fields/src/data-store.ts:41

#### Parameters

##### resolver

`DataStoreFieldResolver`

#### Returns

`void`

***

### remove()

> **remove**(`path`): `void`

Defined in: fields/src/data-store.ts:151

Removes the node (Field, Fields, or FieldTree) at the end of the specified path.
This method does not remove parent nodes if they become empty.

#### Parameters

##### path

`PathType`

The path to the node to remove.

#### Returns

`void`

#### Implementation of

[`Store`](../interfaces/Store.md).[`remove`](../interfaces/Store.md#remove)

***

### set()

> **set**(`path`, `value`): `void`

Defined in: fields/src/data-store.ts:211

Strictly updates the value at an *existing* path.
This operation should typically fail or throw an error if no value exists at the path.

#### Parameters

##### path

`PathType`

The path to the value to be updated.

##### value

`unknown`

The new value to set.

#### Returns

`void`

#### Implementation of

[`Store`](../interfaces/Store.md).[`set`](../interfaces/Store.md#set)

***

### setValue()

> **setValue**\<`T`\>(`path`, `val`): `T`

Defined in: fields/src/data-store.ts:54

Strictly sets the value of an *existing* Field at a specific path.

#### Type Parameters

##### T

`T`

The type of the value being set.

#### Parameters

##### path

`PathType`

The path to the existing field.

##### val

`T`

The new value to set.

#### Returns

`T`

The value that was set.

#### Throws

An error if no field exists at the specified path.

#### Implementation of

[`Store`](../interfaces/Store.md).[`setValue`](../interfaces/Store.md#setvalue)

***

### upset()

> **upset**(`path`, `value`): `void`

Defined in: fields/src/data-store.ts:219

Updates a value at a specified path if it exists, or creates it if it does not.
This is a convenient and non-strict combination of the `set` and `create` operations.

#### Parameters

##### path

`PathType`

The path to the value to be created or updated.

##### value

`unknown`

The value to set.

#### Returns

`void`

#### Implementation of

[`Store`](../interfaces/Store.md).[`upset`](../interfaces/Store.md#upset)

***

### upsetValue()

> **upsetValue**\<`T`\>(`path`, `val`, `options?`): `T`

Defined in: fields/src/data-store.ts:74

Creates new or update a Field at a specified path, inferring its type from the provided value.

#### Type Parameters

##### T

`T`

The type of the initial value.

#### Parameters

##### path

`PathType`

The full path where the new field will be created.

##### val

`T`

The initial value for the field.

##### options?

[`FieldOptions`](../interfaces/FieldOptions.md)\<`T`\> & [`StoreCreateFieldOptions`](../interfaces/StoreCreateFieldOptions.md)

Optional configuration, including policies and the ability to override field type.

#### Returns

`T`

value of the newly created Field instance.

#### Throws

An error if a node already exists at the path or if the parent path is invalid.

#### Implementation of

[`Store`](../interfaces/Store.md).[`upsetValue`](../interfaces/Store.md#upsetvalue)
