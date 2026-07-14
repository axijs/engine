[**@axi-engine/sound**](../README.md)

***

[@axi-engine/sound](../README.md) / TweenOptions

# Interface: TweenOptions

Defined in: tween.ts:3

## Properties

### duration

> **duration**: `number`

Defined in: tween.ts:5

***

### easing

> **easing**: keyof `RegisteredEasings`

Defined in: tween.ts:4

***

### from

> **from**: `number`

Defined in: tween.ts:6

***

### onComplete?

> `optional` **onComplete?**: (`tween`) => `void`

Defined in: tween.ts:12

#### Parameters

##### tween

[`Tween`](../classes/Tween.md)

#### Returns

`void`

***

### onStart?

> `optional` **onStart?**: (`tween`) => `void`

Defined in: tween.ts:11

#### Parameters

##### tween

[`Tween`](../classes/Tween.md)

#### Returns

`void`

***

### onUpdate

> **onUpdate**: (`value`, `tween`) => `void`

Defined in: tween.ts:10

#### Parameters

##### value

`number`

##### tween

[`Tween`](../classes/Tween.md)

#### Returns

`void`

***

### paused?

> `optional` **paused?**: `boolean`

Defined in: tween.ts:8

***

### to

> **to**: `number`

Defined in: tween.ts:7
