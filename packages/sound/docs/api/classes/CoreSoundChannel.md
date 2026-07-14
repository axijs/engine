[**@axi-engine/sound**](../README.md)

***

[@axi-engine/sound](../README.md) / CoreSoundChannel

# Class: CoreSoundChannel

Defined in: core-sound-channel.ts:12

## Implements

- `SoundChannel`

## Constructors

### Constructor

> **new CoreSoundChannel**(`config`): `CoreSoundChannel`

Defined in: core-sound-channel.ts:53

#### Parameters

##### config

[`SoundChannelConfig`](../interfaces/SoundChannelConfig.md)

#### Returns

`CoreSoundChannel`

## Properties

### onSizeChanged

> **onSizeChanged**: `StateEmitter`\<`number`\>

Defined in: core-sound-channel.ts:24

***

### onVolumeChanged

> **onVolumeChanged**: `StateEmitter`\<`number`\>

Defined in: core-sound-channel.ts:25

***

### sequences

> **sequences**: `Set`\<[`SoundSequence`](../interfaces/SoundSequence.md)\>

Defined in: core-sound-channel.ts:22

## Accessors

### loop

#### Get Signature

> **get** **loop**(): `boolean`

Defined in: core-sound-channel.ts:41

is need to loop play sound,

##### Default

```ts
false
```

##### Returns

`boolean`

#### Set Signature

> **set** **loop**(`val`): `void`

Defined in: core-sound-channel.ts:37

is need to loop play sound,

##### Default

```ts
false
```

##### Parameters

###### val

`boolean`

##### Returns

`void`

#### Implementation of

`SoundChannel.loop`

***

### maxInstances

#### Get Signature

> **get** **maxInstances**(): `number` \| `undefined`

Defined in: core-sound-channel.ts:49

##### Default

```ts
undefined
```

##### Returns

`number` \| `undefined`

#### Set Signature

> **set** **maxInstances**(`val`): `void`

Defined in: core-sound-channel.ts:45

##### Default

```ts
undefined
```

##### Parameters

###### val

`number` \| `undefined`

##### Returns

`void`

#### Implementation of

`SoundChannel.maxInstances`

***

### volume

#### Get Signature

> **get** **volume**(): `number`

Defined in: core-sound-channel.ts:33

##### Default

```ts
1
```

##### Returns

`number`

#### Set Signature

> **set** **volume**(`value`): `void`

Defined in: core-sound-channel.ts:27

##### Default

```ts
1
```

##### Parameters

###### value

`number`

##### Returns

`void`

#### Implementation of

`SoundChannel.volume`

## Methods

### pause()

> **pause**(`easing?`): `void`

Defined in: core-sound-channel.ts:89

#### Parameters

##### easing?

`EasingParam`

#### Returns

`void`

#### Implementation of

`SoundChannel.pause`

***

### play()

> **play**(`sounds`, `options?`): `void`

Defined in: core-sound-channel.ts:63

#### Parameters

##### sounds

`SoundSequenceItems`

##### options?

`SoundChannelPlayOptions`

#### Returns

`void`

#### Implementation of

`SoundChannel.play`

***

### resume()

> **resume**(`easing?`): `void`

Defined in: core-sound-channel.ts:93

#### Parameters

##### easing?

`EasingParam`

#### Returns

`void`

#### Implementation of

`SoundChannel.resume`

***

### stop()

> **stop**(`easing?`): `void`

Defined in: core-sound-channel.ts:97

#### Parameters

##### easing?

`EasingParam`

#### Returns

`void`

#### Implementation of

`SoundChannel.stop`

***

### update()

> **update**(`time`): `void`

Defined in: core-sound-channel.ts:59

#### Parameters

##### time

`TimeContext`

#### Returns

`void`

#### Implementation of

`SoundChannel.update`
