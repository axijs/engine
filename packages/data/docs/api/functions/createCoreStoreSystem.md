[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / createCoreStoreSystem

# Function: createCoreStoreSystem()

> **createCoreStoreSystem**(`fieldsSystem`): [`CoreStoreSystem`](../type-aliases/CoreStoreSystem.md)

Defined in: packages/data/src/store/setup.ts:17

Initializes the high-level DataStore infrastructure.
Creates the store factory and serialization services based on the provided field system.

## Parameters

### fieldsSystem

[`CoreFieldSystem`](../type-aliases/CoreFieldSystem.md)

The initialized low-level field system.

## Returns

[`CoreStoreSystem`](../type-aliases/CoreStoreSystem.md)

A bundle of services for creating and managing DataStores.
