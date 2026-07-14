[**@axi-engine/sound**](../README.md)

***

[@axi-engine/sound](../README.md) / SoundSequence

# Interface: SoundSequence

Defined in: sound-sequence.ts:10

Atomic, base representation of a single sound or a sequence of sounds.
Sequences are reusable and can be replayed after stopping.

## Properties

### cursor

> `readonly` **cursor**: `number`

Defined in: sound-sequence.ts:17

***

### initialVolume

> `readonly` **initialVolume**: `number`

Defined in: sound-sequence.ts:20

The base volume before any tween animations are applied.

***

### onFinish

> `readonly` **onFinish**: `Emitter`

Defined in: sound-sequence.ts:35

Triggered when the sequence completes playing all tracks (in loop === false only) or has been stopped.

***

### onPlay

> `readonly` **onPlay**: `Emitter`

Defined in: sound-sequence.ts:32

Triggered when the sequence start playing.

***

### onState

> `readonly` **onState**: `StateEmitter`\<`SoundSequenceState`\>

Defined in: sound-sequence.ts:38

Triggered whenever the state of the sequence changes.

***

### paused

> `readonly` **paused**: `boolean`

Defined in: sound-sequence.ts:26

Indicates if the sequence is currently paused or transitioning to a paused state.

***

### state

> `readonly` **state**: `SoundSequenceState`

Defined in: sound-sequence.ts:23

Current detailed state of the sequence.

***

### stopped

> `readonly` **stopped**: `boolean`

Defined in: sound-sequence.ts:29

Indicates if the sequence is fully stopped or transitioning to a stopped state.

***

### volume

> **volume**: `number`

Defined in: sound-sequence.ts:12

Current volume of the sequence (0.0 to 1.0).

***

### volumeFactor

> **volumeFactor**: `number`

Defined in: sound-sequence.ts:15

Volume multiplier applied by parent systems (e.g., channels).

## Methods

### append()

> **append**(`sounds`): `void`

Defined in: sound-sequence.ts:50

Adds new sounds to the end of the sequence.

#### Parameters

##### sounds

`SoundSequenceItems`

Items to append.

#### Returns

`void`

***

### pause()

> **pause**(`fadeOut?`): `void`

Defined in: sound-sequence.ts:62

Pauses the sequence.

#### Parameters

##### fadeOut?

`EasingParam`

Optional fade-out duration or easing configuration.

#### Returns

`void`

***

### play()

> **play**(`fadeIn?`): `void`

Defined in: sound-sequence.ts:56

Starts or restarts the sequence.

#### Parameters

##### fadeIn?

`EasingParam`

Optional fade-in duration or easing configuration.

#### Returns

`void`

***

### resume()

> **resume**(`fadeIn?`): `void`

Defined in: sound-sequence.ts:68

Resumes a paused sequence.

#### Parameters

##### fadeIn?

`EasingParam`

Optional fade-in duration or easing configuration.

#### Returns

`void`

***

### stop()

> **stop**(`fadeOut?`): `void`

Defined in: sound-sequence.ts:74

Stops the sequence.

#### Parameters

##### fadeOut?

`EasingParam`

Optional fade-out duration or easing configuration.

#### Returns

`void`

***

### update()

> **update**(`time`): `void`

Defined in: sound-sequence.ts:44

Updates internal tweens and timers.

#### Parameters

##### time

`TimeContext`

Context containing time delta from the game loop.

#### Returns

`void`
