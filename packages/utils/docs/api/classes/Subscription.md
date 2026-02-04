[**@axi-engine/utils**](../README.md)

***

[@axi-engine/utils](../README.md) / Subscription

# Class: Subscription

Defined in: subscription.ts:4

Describes an object that can be unsubscribed from.

## Implements

- [`Unsubscribable`](../interfaces/Unsubscribable.md)

## Constructors

### Constructor

> **new Subscription**(`teardown?`): `Subscription`

Defined in: subscription.ts:12

#### Parameters

##### teardown?

() => `void`

#### Returns

`Subscription`

## Accessors

### closed

#### Get Signature

> **get** **closed**(): `boolean`

Defined in: subscription.ts:8

##### Returns

`boolean`

## Methods

### add()

> **add**(`teardown`): `void`

Defined in: subscription.ts:22

Adds a teardown logic to this subscription.
Accepts a function or another Unsubscribable object.

#### Parameters

##### teardown

[`Unsubscribable`](../interfaces/Unsubscribable.md) | () => `void`

#### Returns

`void`

***

### unsubscribe()

> **unsubscribe**(): `void`

Defined in: subscription.ts:30

#### Returns

`void`

#### Implementation of

[`Unsubscribable`](../interfaces/Unsubscribable.md).[`unsubscribe`](../interfaces/Unsubscribable.md#unsubscribe)
