[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / Store

# Interface: Store

Defined in: packages/data/src/store/store.ts:22

Defines the primary high-level API for interacting with the state management system.
It acts as a facade, simplifying access to the underlying FieldTree and providing
both type-safe and dynamic methods for manipulating data.

## Extends

- `DataStorage`

## Properties

### typeName

> `readonly` **typeName**: `string`

Defined in: packages/data/src/store/store.ts:25

## Methods

### create()

> **create**(`path`, `value`): `void`

Defined in: packages/utils/dist/index.d.ts:220

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

#### Inherited from

`DataStorage.create`

***

### createBoolean()

> **createBoolean**(`path`, `initialValue`, `options?`): [`CoreBooleanField`](../classes/CoreBooleanField.md)

Defined in: packages/data/src/store/store.ts:73

Creates a new, strongly-typed CoreBooleanField.

#### Parameters

##### path

`PathType`

##### initialValue

`boolean`

##### options?

[`CoreBooleanFieldOptions`](CoreBooleanFieldOptions.md)

#### Returns

[`CoreBooleanField`](../classes/CoreBooleanField.md)

#### Throws

An error if a node already exists at the path.

***

### createFields()

> **createFields**(`path`): [`CoreFields`](../classes/CoreFields.md)

Defined in: packages/data/src/store/store.ts:131

Strictly creates a new CoreFields container.
Any missing parent nodes in the path will be created automatically.

#### Parameters

##### path

`PathType`

The path where the new Fields container will be created.

#### Returns

[`CoreFields`](../classes/CoreFields.md)

The newly created CoreFields instance.

#### Throws

An error if a node already exists at the target path.

***

### createGeneric()

> **createGeneric**\<`T`\>(`path`, `initialValue`, `options?`): [`CoreField`](../classes/CoreField.md)\<`T`\>

Defined in: packages/data/src/store/store.ts:91

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

[`FieldOptions`](FieldOptions.md)\<`T`\>

#### Returns

[`CoreField`](../classes/CoreField.md)\<`T`\>

#### Throws

An error if a node already exists at the path.

***

### createIsolated()

> **createIsolated**(): `Store`

Defined in: packages/data/src/store/store.ts:174

Creates a new, independent instance of the Store.

The returned store must operate on a completely separate data structure,
ensuring that operations on the new instance do not affect the current one (and vice versa).
Typically used for creating local execution scopes, stack frames, or sandbox environments.

#### Returns

`Store`

A new, isolated Store instance.

***

### createNumeric()

> **createNumeric**(`path`, `initialValue`, `options?`): [`CoreNumericField`](../classes/CoreNumericField.md)

Defined in: packages/data/src/store/store.ts:79

Creates a new, strongly-typed CoreNumericField.

#### Parameters

##### path

`PathType`

##### initialValue

`number`

##### options?

[`CoreNumericFieldOptions`](CoreNumericFieldOptions.md)

#### Returns

[`CoreNumericField`](../classes/CoreNumericField.md)

#### Throws

An error if a node already exists at the path.

***

### createString()

> **createString**(`path`, `initialValue`, `options?`): [`CoreStringField`](../classes/CoreStringField.md)

Defined in: packages/data/src/store/store.ts:85

Creates a new, strongly-typed CoreStringField.

#### Parameters

##### path

`PathType`

##### initialValue

`string`

##### options?

[`CoreStringFieldOptions`](CoreStringFieldOptions.md)

#### Returns

[`CoreStringField`](../classes/CoreStringField.md)

#### Throws

An error if a node already exists at the path.

***

### createTree()

> **createTree**(`path`): [`CoreFieldTree`](../classes/CoreFieldTree.md)

Defined in: packages/data/src/store/store.ts:140

Strictly creates a new CoreFieldTree node.
Any missing parent nodes in the path will be created automatically.

#### Parameters

##### path

`PathType`

The path where the new FieldTree node will be created.

#### Returns

[`CoreFieldTree`](../classes/CoreFieldTree.md)

The newly created CoreFieldTree instance.

#### Throws

An error if a node already exists at the target path.

***

### createValue()

> **createValue**\<`T`\>(`path`, `val`, `options?`): `T`

Defined in: packages/data/src/store/store.ts:56

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

[`FieldOptions`](FieldOptions.md)\<`T`\> & [`StoreCreateFieldOptions`](StoreCreateFieldOptions.md)

Optional configuration, including policies and the ability to override field type.

#### Returns

`T`

value of the newly created Field instance.

#### Throws

An error if a node already exists at the path or if the parent path is invalid.

***

### delete()

> **delete**(`path`): `void`

Defined in: packages/utils/dist/index.d.ts:234

Deletes the value at the specified path.

#### Parameters

##### path

`PathType`

The path to the value to be deleted.

#### Returns

`void`

#### Inherited from

`DataStorage.delete`

***

### get()

> **get**(`path`): `unknown`

Defined in: packages/utils/dist/index.d.ts:185

#### Parameters

##### path

`PathType`

#### Returns

`unknown`

#### Inherited from

`DataStorage.get`

***

### getBoolean()

> **getBoolean**(`path`): [`CoreBooleanField`](../classes/CoreBooleanField.md)

Defined in: packages/data/src/store/store.ts:97

Retrieves a strongly-typed CoreBooleanField instance.

#### Parameters

##### path

`PathType`

#### Returns

[`CoreBooleanField`](../classes/CoreBooleanField.md)

#### Throws

An error if the path is invalid or the field is not of the expected type.

***

### getField()

> **getField**\<`TField`\>(`path`): `TField`

Defined in: packages/data/src/store/store.ts:122

A generic method to retrieve a Field instance with a specific asserted type.

#### Type Parameters

##### TField

`TField` *extends* [`Field`](Field.md)\<`any`\>

The expected Field class or interface.

#### Parameters

##### path

`PathType`

#### Returns

`TField`

#### Throws

An error if the path is invalid or the field cannot be cast to the specified type.

***

### getFields()

> **getFields**(`path`): [`CoreFields`](../classes/CoreFields.md)

Defined in: packages/data/src/store/store.ts:148

Retrieves an existing CoreFields container.

#### Parameters

##### path

`PathType`

The path to the Fields container.

#### Returns

[`CoreFields`](../classes/CoreFields.md)

The found CoreFields instance.

#### Throws

An error if the path is invalid or the node at the path is not a Fields container.

***

### getGeneric()

> **getGeneric**\<`T`\>(`path`): [`CoreField`](../classes/CoreField.md)\<`T`\>

Defined in: packages/data/src/store/store.ts:115

Retrieves a generic CoreField instance.

#### Type Parameters

##### T

`T`

#### Parameters

##### path

`PathType`

#### Returns

[`CoreField`](../classes/CoreField.md)\<`T`\>

#### Throws

An error if the path is invalid.

***

### getNumeric()

> **getNumeric**(`path`): [`CoreNumericField`](../classes/CoreNumericField.md)

Defined in: packages/data/src/store/store.ts:103

Retrieves a strongly-typed CoreNumericField instance.

#### Parameters

##### path

`PathType`

#### Returns

[`CoreNumericField`](../classes/CoreNumericField.md)

#### Throws

An error if the path is invalid or the field is not of the expected type.

***

### getString()

> **getString**(`path`): [`CoreStringField`](../classes/CoreStringField.md)

Defined in: packages/data/src/store/store.ts:109

Retrieves a strongly-typed CoreStringField instance.

#### Parameters

##### path

`PathType`

#### Returns

[`CoreStringField`](../classes/CoreStringField.md)

#### Throws

An error if the path is invalid or the field is not of the expected type.

***

### getTree()

> **getTree**(`path`): [`CoreFieldTree`](../classes/CoreFieldTree.md)

Defined in: packages/data/src/store/store.ts:156

Retrieves an existing CoreFieldTree node.

#### Parameters

##### path

`PathType`

The path to the FieldTree node.

#### Returns

[`CoreFieldTree`](../classes/CoreFieldTree.md)

The found CoreFieldTree instance.

#### Throws

An error if the path is invalid or the node at the path is not a FieldTree.

***

### getValue()

> **getValue**\<`T`\>(`path`): `T`

Defined in: packages/data/src/store/store.ts:34

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

***

### has()

> **has**(`path`): `boolean`

Defined in: packages/utils/dist/index.d.ts:191

Checks if a path valid.

#### Parameters

##### path

`PathType`

The path to the node.

#### Returns

`boolean`

`true` if the node exists, otherwise `false`.

#### Inherited from

`DataStorage.has`

***

### remove()

> **remove**(`path`): `void`

Defined in: packages/data/src/store/store.ts:163

Removes the node (Field, Fields, or FieldTree) at the end of the specified path.
This method does not remove parent nodes if they become empty.

#### Parameters

##### path

`PathType`

The path to the node to remove.

#### Returns

`void`

***

### set()

> **set**(`path`, `value`): `void`

Defined in: packages/utils/dist/index.d.ts:211

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

#### Inherited from

`DataStorage.set`

***

### setValue()

> **setValue**\<`T`\>(`path`, `val`): `T`

Defined in: packages/data/src/store/store.ts:44

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

***

### upset()

> **upset**(`path`, `value`): `void`

Defined in: packages/utils/dist/index.d.ts:228

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

#### Inherited from

`DataStorage.upset`

***

### upsetValue()

> **upsetValue**\<`T`\>(`path`, `val`, `options?`): `T`

Defined in: packages/data/src/store/store.ts:67

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

[`FieldOptions`](FieldOptions.md)\<`T`\> & [`StoreCreateFieldOptions`](StoreCreateFieldOptions.md)

Optional configuration, including policies and the ability to override field type.

#### Returns

`T`

value of the newly created Field instance.

#### Throws

An error if a node already exists at the path or if the parent path is invalid.
