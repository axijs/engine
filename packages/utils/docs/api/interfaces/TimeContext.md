[**@axi-engine/utils**](../README.md)

***

[@axi-engine/utils](../README.md) / TimeContext

# Interface: TimeContext

Defined in: time.ts:5

Context for time-dependent animations and transformations.
Used across engine modules, at least in sound and scenes.

## Properties

### deltaMs

> **deltaMs**: `number`

Defined in: time.ts:7

Time elapsed since last frame (ms)

***

### deltaTime

> **deltaTime**: `number`

Defined in: time.ts:10

Scalar time value from last frame to this frame. Used for frame-based animations and updates.

***

### timeScale

> **timeScale**: `number`

Defined in: time.ts:16

Frame scale (1.0 = normal speed, 0.5 = slow motion)

***

### totalTime

> **totalTime**: `number`

Defined in: time.ts:13

Total time since game start (ms)
