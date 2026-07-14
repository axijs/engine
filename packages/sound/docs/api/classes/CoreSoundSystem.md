[**@axi-engine/sound**](../README.md)

***

[@axi-engine/sound](../README.md) / CoreSoundSystem

# Class: CoreSoundSystem

Defined in: core-sound-system.ts:11

## Implements

- [`SoundSystem`](../interfaces/SoundSystem.md)

## Constructors

### Constructor

> **new CoreSoundSystem**(): `CoreSoundSystem`

Defined in: core-sound-system.ts:27

#### Returns

`CoreSoundSystem`

## Properties

### \_channels

> **\_channels**: `Registry`\<`string`, `SoundChannel`\>

Defined in: core-sound-system.ts:12

#### Implementation of

[`SoundSystem`](../interfaces/SoundSystem.md).[`_channels`](../interfaces/SoundSystem.md#_channels)

## Accessors

### channels

#### Get Signature

> **get** **channels**(): `Registry`\<`string`, `SoundChannel`\>

Defined in: core-sound-system.ts:14

##### Returns

`Registry`\<`string`, `SoundChannel`\>

***

### volume

#### Get Signature

> **get** **volume**(): `number`

Defined in: core-sound-system.ts:23

##### Returns

`number`

#### Set Signature

> **set** **volume**(`val`): `void`

Defined in: core-sound-system.ts:19

from 0 to 1

##### Parameters

###### val

`number`

##### Returns

`void`

#### Implementation of

[`SoundSystem`](../interfaces/SoundSystem.md).[`volume`](../interfaces/SoundSystem.md#volume)

## Methods

### channel()

> **channel**(`name`): `SoundChannel`

Defined in: core-sound-system.ts:35

get previously registered sound channel by name

#### Parameters

##### name

`string`

#### Returns

`SoundChannel`

#### Implementation of

[`SoundSystem`](../interfaces/SoundSystem.md).[`channel`](../interfaces/SoundSystem.md#channel)

***

### pause()

> **pause**(`names`): `void`

Defined in: core-sound-system.ts:47

#### Parameters

##### names

`string` \| `string`[]

#### Returns

`void`

#### Implementation of

[`SoundSystem`](../interfaces/SoundSystem.md).[`pause`](../interfaces/SoundSystem.md#pause)

***

### pauseAll()

> **pauseAll**(): `void`

Defined in: core-sound-system.ts:62

#### Returns

`void`

#### Implementation of

[`SoundSystem`](../interfaces/SoundSystem.md).[`pauseAll`](../interfaces/SoundSystem.md#pauseall)

***

### play()

> **play**(`channelName`, `sounds`, `options?`): `void`

Defined in: core-sound-system.ts:43

#### Parameters

##### channelName

`string`

##### sounds

`SoundSequenceItems`

##### options?

`SoundSequenceOptions`

#### Returns

`void`

***

### queue()

> **queue**(`channelName`, `tracks`): `void`

Defined in: core-sound-system.ts:81

add track to named channel to play after previous track finished

#### Parameters

##### channelName

`string`

##### tracks

`string` \| `string`[]

#### Returns

`void`

***

### register()

> **register**(`channelOrChannels`): `void`

Defined in: core-sound-system.ts:30

#### Parameters

##### channelOrChannels

[`SoundChannelConfig`](../interfaces/SoundChannelConfig.md) \| [`SoundChannelConfig`](../interfaces/SoundChannelConfig.md)[]

#### Returns

`void`

#### Implementation of

[`SoundSystem`](../interfaces/SoundSystem.md).[`register`](../interfaces/SoundSystem.md#register)

***

### resume()

> **resume**(`names`): `void`

Defined in: core-sound-system.ts:51

#### Parameters

##### names

`string` \| `string`[]

#### Returns

`void`

#### Implementation of

[`SoundSystem`](../interfaces/SoundSystem.md).[`resume`](../interfaces/SoundSystem.md#resume)

***

### resumeAll()

> **resumeAll**(): `void`

Defined in: core-sound-system.ts:66

#### Returns

`void`

#### Implementation of

[`SoundSystem`](../interfaces/SoundSystem.md).[`resumeAll`](../interfaces/SoundSystem.md#resumeall)

***

### stop()

> **stop**(`names`): `void`

Defined in: core-sound-system.ts:58

stop named channel

#### Parameters

##### names

`string` \| `string`[]

#### Returns

`void`

#### Implementation of

[`SoundSystem`](../interfaces/SoundSystem.md).[`stop`](../interfaces/SoundSystem.md#stop)

***

### stopAll()

> **stopAll**(): `void`

Defined in: core-sound-system.ts:70

#### Returns

`void`

#### Implementation of

[`SoundSystem`](../interfaces/SoundSystem.md).[`stopAll`](../interfaces/SoundSystem.md#stopall)

***

### update()

> **update**(`time`): `void`

Defined in: core-sound-system.ts:74

#### Parameters

##### time

`TimeContext`

#### Returns

`void`
