[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / StoreEventDispatcher

# Class: StoreEventDispatcher

Defined in: packages/data/src/store/store-event-dispatcher.ts:6

## Constructors

### Constructor

> **new StoreEventDispatcher**(`events`, `changes`): `StoreEventDispatcher`

Defined in: packages/data/src/store/store-event-dispatcher.ts:12

#### Parameters

##### events

`StoreEventBus`

##### changes

[`StoreChangeBuffer`](StoreChangeBuffer.md)

#### Returns

`StoreEventDispatcher`

## Properties

### changes

> **changes**: [`StoreChangeBuffer`](StoreChangeBuffer.md)

Defined in: packages/data/src/store/store-event-dispatcher.ts:10

***

### events

> **events**: `StoreEventBus`

Defined in: packages/data/src/store/store-event-dispatcher.ts:9

***

### mode

> **mode**: [`EventDispatcherMode`](../type-aliases/EventDispatcherMode.md) = `'lazy'`

Defined in: packages/data/src/store/store-event-dispatcher.ts:7

## Methods

### eagerChanged()

> **eagerChanged**(`path`): `void`

Defined in: packages/data/src/store/store-event-dispatcher.ts:25

#### Parameters

##### path

`string`

#### Returns

`void`

***

### eagerCreated()

> **eagerCreated**(`path`): `void`

Defined in: packages/data/src/store/store-event-dispatcher.ts:17

#### Parameters

##### path

`string`

#### Returns

`void`

***

### eagerDeleted()

> **eagerDeleted**(`path`): `void`

Defined in: packages/data/src/store/store-event-dispatcher.ts:34

#### Parameters

##### path

`string`

#### Returns

`void`

***

### flush()

> **flush**(): `void`

Defined in: packages/data/src/store/store-event-dispatcher.ts:42

#### Returns

`void`
