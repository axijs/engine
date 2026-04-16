[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / createCoreFieldSystem

# Function: createCoreFieldSystem()

> **createCoreFieldSystem**(`config?`): [`CoreFieldSystem`](../type-aliases/CoreFieldSystem.md)

Defined in: packages/data/src/setup.ts:97

Initializes the low-level field infrastructure.
Wires together the factory, hydrator (loader), and snapshotter (saver)
using default or provided configurations.

## Parameters

### config?

[`CoreFieldSystemConfig`](../interfaces/CoreFieldSystemConfig.md)

Configuration for the field system.

## Returns

[`CoreFieldSystem`](../type-aliases/CoreFieldSystem.md)

A bundle of services for managing FieldTrees.
