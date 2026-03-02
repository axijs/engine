[**@axi-engine/utils**](../README.md)

***

[@axi-engine/utils](../README.md) / Destroyable

# Interface: Destroyable

Defined in: types.ts:47

Represents an object that has a lifecycle and requires explicit destruction.

## Extended by

- [`DataStorage`](DataStorage.md)

## Methods

### destroy()

> **destroy**(): `void`

Defined in: types.ts:52

Destroys the object, releasing all held resources.
After calling this, the object should be considered unusable.

#### Returns

`void`
