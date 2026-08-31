[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / Store

# Class: Store

Defined in: packages/data/src/store/store.ts:25

## Implements

- `DataStorage`
- `StoreEventSubscriber`

## Constructors

### Constructor

> **new Store**(`options?`): `Store`

Defined in: packages/data/src/store/store.ts:44

#### Parameters

##### options?

###### group?

[`FieldGroup`](../interfaces/FieldGroup.md)

###### typeRegistry?

[`FieldTypeRegistry`](FieldTypeRegistry.md)

#### Returns

`Store`

## Properties

### changes

> **changes**: [`StoreChangeBuffer`](StoreChangeBuffer.md)

Defined in: packages/data/src/store/store.ts:29

***

### eventDispatcher

> **eventDispatcher**: [`StoreEventDispatcher`](StoreEventDispatcher.md)

Defined in: packages/data/src/store/store.ts:31

***

### events

> **events**: `StoreEventBus`

Defined in: packages/data/src/store/store.ts:30

***

### group

> **group**: [`FieldGroup`](../interfaces/FieldGroup.md)

Defined in: packages/data/src/store/store.ts:26

***

### onClear

> **onClear**: `Emitter`\<`void`\>

Defined in: packages/data/src/store/store.ts:33

***

### onGroupReplaced

> **onGroupReplaced**: `Emitter`\<[`FieldGroup`](../interfaces/FieldGroup.md)\>

Defined in: packages/data/src/store/store.ts:34

***

### typeRegistry

> **typeRegistry**: [`FieldTypeRegistry`](FieldTypeRegistry.md)

Defined in: packages/data/src/store/store.ts:27

## Accessors

### eventMode

#### Get Signature

> **get** **eventMode**(): [`EventDispatcherMode`](../type-aliases/EventDispatcherMode.md)

Defined in: packages/data/src/store/store.ts:40

##### Returns

[`EventDispatcherMode`](../type-aliases/EventDispatcherMode.md)

#### Set Signature

> **set** **eventMode**(`mode`): `void`

Defined in: packages/data/src/store/store.ts:36

##### Parameters

###### mode

[`EventDispatcherMode`](../type-aliases/EventDispatcherMode.md)

##### Returns

`void`

## Methods

### clear()

> **clear**(): `void`

Defined in: packages/data/src/store/store.ts:174

#### Returns

`void`

#### Implementation of

`DataStorage.clear`

***

### create()

> **create**\<`T`\>(`path`, `value`): `void`

Defined in: packages/data/src/store/store.ts:136

Strictly creates a new value at the specified path.
This operation should typically fail or throw an error if a value already exists
at the path.

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### path

`PathType`

The full path where the new value will be created.

##### value

`T`

The initial value to create.

#### Returns

`void`

#### Implementation of

`DataStorage.create`

***

### delete()

> **delete**(`path`): `void`

Defined in: packages/data/src/store/store.ts:148

Deletes the value at the specified path.

#### Parameters

##### path

`PathType`

The path to the value to be deleted.

#### Returns

`void`

#### Implementation of

`DataStorage.delete`

***

### get()

> **get**\<`T`\>(`path`): `T`

Defined in: packages/data/src/store/store.ts:109

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### path

`PathType`

#### Returns

`T`

#### Implementation of

`DataStorage.get`

***

### getGroup()

> **getGroup**(): [`FieldGroup`](../interfaces/FieldGroup.md)

Defined in: packages/data/src/store/store.ts:52

#### Returns

[`FieldGroup`](../interfaces/FieldGroup.md)

***

### has()

> **has**(`path`): `boolean`

Defined in: packages/data/src/store/store.ts:113

Checks if a path valid.

#### Parameters

##### path

`PathType`

The path to the node.

#### Returns

`boolean`

`true` if the node exists, otherwise `false`.

#### Implementation of

`DataStorage.has`

***

### onAnyChange()

> **onAnyChange**(`listener`): `Subscription`

Defined in: packages/data/src/store/store.ts:89

#### Parameters

##### listener

`AnyListener`

#### Returns

`Subscription`

***

### onAnyCreate()

> **onAnyCreate**(`listener`): `Subscription`

Defined in: packages/data/src/store/store.ts:85

#### Parameters

##### listener

`AnyListener`

#### Returns

`Subscription`

***

### onAnyDelete()

> **onAnyDelete**(`listener`): `Subscription`

Defined in: packages/data/src/store/store.ts:93

#### Parameters

##### listener

`AnyListener`

#### Returns

`Subscription`

***

### onChange()

> **onChange**\<`T`\>(`path`, `listener`): `Unsubscribable`

Defined in: packages/data/src/store/store.ts:65

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### path

`PathType`

##### listener

(`event`) => `void`

#### Returns

`Unsubscribable`

#### Implementation of

`StoreEventSubscriber.onChange`

***

### onCreate()

> **onCreate**\<`T`\>(`path`, `listener`): `Unsubscribable`

Defined in: packages/data/src/store/store.ts:61

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### path

`PathType`

##### listener

(`event`) => `void`

#### Returns

`Unsubscribable`

#### Implementation of

`StoreEventSubscriber.onCreate`

***

### onDelete()

> **onDelete**\<`T`\>(`path`, `listener`): `Unsubscribable`

Defined in: packages/data/src/store/store.ts:69

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### path

`PathType`

##### listener

(`event`) => `void`

#### Returns

`Unsubscribable`

#### Implementation of

`StoreEventSubscriber.onDelete`

***

### replaceGroup()

> **replaceGroup**(`newGroup`): `void`

Defined in: packages/data/src/store/store.ts:56

#### Parameters

##### newGroup

[`FieldGroup`](../interfaces/FieldGroup.md)

#### Returns

`void`

***

### set()

> **set**\<`T`\>(`path`, `value`): `void`

Defined in: packages/data/src/store/store.ts:117

Strictly updates the value at an *existing* path.
This operation should typically fail or throw an error if no value exists at the path.

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### path

`PathType`

The path to the value to be updated.

##### value

`T`

The new value to set.

#### Returns

`void`

#### Implementation of

`DataStorage.set`

***

### tick()

> **tick**(): `void`

Defined in: packages/data/src/store/store.ts:181

#### Returns

`void`

***

### unsubscribeOnAnyChange()

> **unsubscribeOnAnyChange**(`listener`): `boolean`

Defined in: packages/data/src/store/store.ts:101

#### Parameters

##### listener

`AnyListener`

#### Returns

`boolean`

***

### unsubscribeOnAnyCreate()

> **unsubscribeOnAnyCreate**(`listener`): `boolean`

Defined in: packages/data/src/store/store.ts:97

#### Parameters

##### listener

`AnyListener`

#### Returns

`boolean`

***

### unsubscribeOnAnyDelete()

> **unsubscribeOnAnyDelete**(`listener`): `boolean`

Defined in: packages/data/src/store/store.ts:105

#### Parameters

##### listener

`AnyListener`

#### Returns

`boolean`

***

### unsubscribeOnChange()

> **unsubscribeOnChange**\<`T`\>(`path`, `listener`): `void`

Defined in: packages/data/src/store/store.ts:77

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### path

`PathType`

##### listener

(`event`) => `void`

#### Returns

`void`

#### Implementation of

`StoreEventSubscriber.unsubscribeOnChange`

***

### unsubscribeOnCreate()

> **unsubscribeOnCreate**\<`T`\>(`path`, `listener`): `void`

Defined in: packages/data/src/store/store.ts:73

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### path

`PathType`

##### listener

(`event`) => `void`

#### Returns

`void`

#### Implementation of

`StoreEventSubscriber.unsubscribeOnCreate`

***

### unsubscribeOnDelete()

> **unsubscribeOnDelete**\<`T`\>(`path`, `listener`): `void`

Defined in: packages/data/src/store/store.ts:81

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### path

`PathType`

##### listener

(`event`) => `void`

#### Returns

`void`

#### Implementation of

`StoreEventSubscriber.unsubscribeOnDelete`

***

### upsert()

> **upsert**\<`T`\>(`path`, `value`): `void`

Defined in: packages/data/src/store/store.ts:144

Updates a value at a specified path if it exists, or creates it if it does not.
This is a convenient and non-strict combination of the `set` and `create` operations.

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### path

`PathType`

The path to the value to be created or updated.

##### value

`T`

The value to set.

#### Returns

`void`

#### Implementation of

`DataStorage.upsert`
