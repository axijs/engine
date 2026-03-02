[**@axi-engine/utils**](../README.md)

***

[@axi-engine/utils](../README.md) / Subscription

# Class: Subscription

Defined in: subscription.ts:9

Represents a disposable resource, such as the execution of an Observable or an Event Listener.
Allows grouping multiple teardown logic into a single unit (Composite Subscription).

## Implements

- [`Unsubscribable`](../interfaces/Unsubscribable.md)

## Constructors

### Constructor

> **new Subscription**(`teardown?`): `Subscription`

Defined in: subscription.ts:23

#### Parameters

##### teardown?

() => `void`

Optional initial teardown logic to execute when unsubscribed.

#### Returns

`Subscription`

## Accessors

### closed

#### Get Signature

> **get** **closed**(): `boolean`

Defined in: subscription.ts:16

Indicates whether this subscription has already been unsubscribed.

##### Returns

`boolean`

## Methods

### add()

> **add**(`teardown`): `void`

Defined in: subscription.ts:34

Adds a teardown logic to this subscription.
If the subscription is already closed, the teardown is executed immediately.

#### Parameters

##### teardown

A function or another Unsubscribable object to be managed.

[`Unsubscribable`](../interfaces/Unsubscribable.md) | () => `void`

#### Returns

`void`

***

### unsubscribe()

> **unsubscribe**(): `void`

Defined in: subscription.ts:46

Disposes the resources held by the subscription.
Executes all attached teardown logic and clears the list.

#### Returns

`void`

#### Implementation of

[`Unsubscribable`](../interfaces/Unsubscribable.md).[`unsubscribe`](../interfaces/Unsubscribable.md#unsubscribe)
