[**@axi-engine/sound**](../README.md)

***

[@axi-engine/sound](../README.md) / SoundSystem

# Interface: SoundSystem

Defined in: sound-system.ts:5

## Properties

### \_channels

> `readonly` **\_channels**: `Registry`\<`string`, `SoundChannel`\>

Defined in: sound-system.ts:8

***

### volume

> **volume**: `number`

Defined in: sound-system.ts:6

## Methods

### channel()

> **channel**(`name`): `SoundChannel`

Defined in: sound-system.ts:15

get previously registered sound channel by name

#### Parameters

##### name

`string`

#### Returns

`SoundChannel`

***

### pause()

> **pause**(`names`): `void`

Defined in: sound-system.ts:17

#### Parameters

##### names

`string` \| `string`[]

#### Returns

`void`

***

### pauseAll()

> **pauseAll**(): `void`

Defined in: sound-system.ts:26

#### Returns

`void`

***

### register()

> **register**(`channelConfig`): `void`

Defined in: sound-system.ts:10

#### Parameters

##### channelConfig

[`SoundChannelConfig`](SoundChannelConfig.md)

#### Returns

`void`

***

### resume()

> **resume**(`names`): `void`

Defined in: sound-system.ts:19

#### Parameters

##### names

`string` \| `string`[]

#### Returns

`void`

***

### resumeAll()

> **resumeAll**(): `void`

Defined in: sound-system.ts:28

#### Returns

`void`

***

### stop()

> **stop**(`names`): `void`

Defined in: sound-system.ts:24

if name not provided -stop all sound instances in all channels otherwise stop in named channel

#### Parameters

##### names

`string` \| `string`[]

#### Returns

`void`

***

### stopAll()

> **stopAll**(): `void`

Defined in: sound-system.ts:30

#### Returns

`void`
