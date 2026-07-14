[**@axi-engine/sound**](../README.md)

***

[@axi-engine/sound](../README.md) / CoreSoundSequence

# Class: CoreSoundSequence

Defined in: core-sound-sequence.ts:12

Atomic, base representation of a single sound or a sequence of sounds.
Sequences are reusable and can be replayed after stopping.

## Implements

- [`SoundSequence`](../interfaces/SoundSequence.md)

## Constructors

### Constructor

> **new CoreSoundSequence**(`sounds`, `options?`): `CoreSoundSequence`

Defined in: core-sound-sequence.ts:82

#### Parameters

##### sounds

`SoundSequenceItems`

##### options?

`SoundSequenceOptions`

#### Returns

`CoreSoundSequence`

## Properties

### \_state

> **\_state**: `SoundSequenceState` = `SoundSequenceState.ready`

Defined in: core-sound-sequence.ts:14

***

### onFinish

> `readonly` **onFinish**: `Emitter`\<`void`\>

Defined in: core-sound-sequence.ts:29

Triggered when the sequence completes playing all tracks (in loop === false only) or has been stopped.

#### Implementation of

[`SoundSequence`](../interfaces/SoundSequence.md).[`onFinish`](../interfaces/SoundSequence.md#onfinish)

***

### onPlay

> `readonly` **onPlay**: `Emitter`\<`void`\>

Defined in: core-sound-sequence.ts:28

Triggered when the sequence start playing.

#### Implementation of

[`SoundSequence`](../interfaces/SoundSequence.md).[`onPlay`](../interfaces/SoundSequence.md#onplay)

***

### onState

> `readonly` **onState**: `StateEmitter`\<`SoundSequenceState`\>

Defined in: core-sound-sequence.ts:30

Triggered whenever the state of the sequence changes.

#### Implementation of

[`SoundSequence`](../interfaces/SoundSequence.md).[`onState`](../interfaces/SoundSequence.md#onstate)

## Accessors

### cursor

#### Get Signature

> **get** **cursor**(): `number`

Defined in: core-sound-sequence.ts:41

##### Returns

`number`

#### Implementation of

[`SoundSequence`](../interfaces/SoundSequence.md).[`cursor`](../interfaces/SoundSequence.md#cursor)

***

### initialVolume

#### Get Signature

> **get** **initialVolume**(): `number`

Defined in: core-sound-sequence.ts:45

The base volume before any tween animations are applied.

##### Returns

`number`

The base volume before any tween animations are applied.

#### Implementation of

[`SoundSequence`](../interfaces/SoundSequence.md).[`initialVolume`](../interfaces/SoundSequence.md#initialvolume)

***

### loop

#### Get Signature

> **get** **loop**(): `boolean`

Defined in: core-sound-sequence.ts:37

##### Returns

`boolean`

#### Set Signature

> **set** **loop**(`val`): `void`

Defined in: core-sound-sequence.ts:32

##### Parameters

###### val

`boolean`

##### Returns

`void`

***

### paused

#### Get Signature

> **get** **paused**(): `boolean`

Defined in: core-sound-sequence.ts:74

Indicates if the sequence is currently paused or transitioning to a paused state.

##### Returns

`boolean`

Indicates if the sequence is currently paused or transitioning to a paused state.

#### Implementation of

[`SoundSequence`](../interfaces/SoundSequence.md).[`paused`](../interfaces/SoundSequence.md#paused)

***

### state

#### Get Signature

> **get** **state**(): `SoundSequenceState`

Defined in: core-sound-sequence.ts:70

Current detailed state of the sequence.

##### Returns

`SoundSequenceState`

Current detailed state of the sequence.

#### Implementation of

[`SoundSequence`](../interfaces/SoundSequence.md).[`state`](../interfaces/SoundSequence.md#state)

***

### stopped

#### Get Signature

> **get** **stopped**(): `boolean`

Defined in: core-sound-sequence.ts:78

Indicates if the sequence is fully stopped or transitioning to a stopped state.

##### Returns

`boolean`

Indicates if the sequence is fully stopped or transitioning to a stopped state.

#### Implementation of

[`SoundSequence`](../interfaces/SoundSequence.md).[`stopped`](../interfaces/SoundSequence.md#stopped)

***

### volume

#### Get Signature

> **get** **volume**(): `number`

Defined in: core-sound-sequence.ts:57

return current volume

##### Returns

`number`

#### Set Signature

> **set** **volume**(`val`): `void`

Defined in: core-sound-sequence.ts:49

Current volume of the sequence (0.0 to 1.0).

##### Parameters

###### val

`number`

##### Returns

`void`

Current volume of the sequence (0.0 to 1.0).

#### Implementation of

[`SoundSequence`](../interfaces/SoundSequence.md).[`volume`](../interfaces/SoundSequence.md#volume)

***

### volumeFactor

#### Get Signature

> **get** **volumeFactor**(): `number`

Defined in: core-sound-sequence.ts:66

Volume multiplier applied by parent systems (e.g., channels).

##### Returns

`number`

#### Set Signature

> **set** **volumeFactor**(`val`): `void`

Defined in: core-sound-sequence.ts:61

Volume multiplier applied by parent systems (e.g., channels).

##### Parameters

###### val

`number`

##### Returns

`void`

Volume multiplier applied by parent systems (e.g., channels).

#### Implementation of

[`SoundSequence`](../interfaces/SoundSequence.md).[`volumeFactor`](../interfaces/SoundSequence.md#volumefactor)

## Methods

### append()

> **append**(`sounds`): `void`

Defined in: core-sound-sequence.ts:93

Adds new sounds to the end of the sequence.

#### Parameters

##### sounds

`SoundSequenceItems`

Items to append.

#### Returns

`void`

#### Implementation of

[`SoundSequence`](../interfaces/SoundSequence.md).[`append`](../interfaces/SoundSequence.md#append)

***

### pause()

> **pause**(`fadeOut?`): `void`

Defined in: core-sound-sequence.ts:115

Pauses the sequence.

#### Parameters

##### fadeOut?

`EasingParam`

Optional fade-out duration or easing configuration.

#### Returns

`void`

#### Implementation of

[`SoundSequence`](../interfaces/SoundSequence.md).[`pause`](../interfaces/SoundSequence.md#pause)

***

### play()

> **play**(`fadeIn?`): `void`

Defined in: core-sound-sequence.ts:101

#### Parameters

##### fadeIn?

`EasingParam`

#### Returns

`void`

#### Implementation of

[`SoundSequence`](../interfaces/SoundSequence.md).[`play`](../interfaces/SoundSequence.md#play)

***

### resume()

> **resume**(`fadeIn?`): `void`

Defined in: core-sound-sequence.ts:127

Resumes a paused sequence.

#### Parameters

##### fadeIn?

`EasingParam`

Optional fade-in duration or easing configuration.

#### Returns

`void`

#### Implementation of

[`SoundSequence`](../interfaces/SoundSequence.md).[`resume`](../interfaces/SoundSequence.md#resume)

***

### stop()

> **stop**(`fadeOut?`): `void`

Defined in: core-sound-sequence.ts:138

Stops the sequence.

#### Parameters

##### fadeOut?

`EasingParam`

Optional fade-out duration or easing configuration.

#### Returns

`void`

#### Implementation of

[`SoundSequence`](../interfaces/SoundSequence.md).[`stop`](../interfaces/SoundSequence.md#stop)

***

### update()

> **update**(`time`): `void`

Defined in: core-sound-sequence.ts:89

Updates internal tweens and timers.

#### Parameters

##### time

`TimeContext`

Context containing time delta from the game loop.

#### Returns

`void`

#### Implementation of

[`SoundSequence`](../interfaces/SoundSequence.md).[`update`](../interfaces/SoundSequence.md#update)
