[**@axi-engine/fields**](../README.md)

***

[@axi-engine/fields](../README.md) / FieldSerializer

# Class: FieldSerializer

Defined in: fields/src/serializer/field-serializer.ts:22

Orchestrates the serialization and deserialization of Field instances.

This class acts as a central point for converting complex Field objects into
plain, storable data (snapshots) and vice-versa. It uses a `FieldRegistry`
to resolve class constructors and a `PolicySerializer` to handle the state
of any attached policies.

## Todo

Implement a `patch(field, snapshot)` method.
      Unlike `hydrate`, which creates a new
      instance, `patch` should update the state of an *existing* field instance
      without breaking external references to it.

## Constructors

### Constructor

> **new FieldSerializer**(`fieldRegistry`, `policySerializer`): `FieldSerializer`

Defined in: fields/src/serializer/field-serializer.ts:29

Creates an instance of FieldSerializer.

#### Parameters

##### fieldRegistry

[`FieldRegistry`](FieldRegistry.md)

A registry that maps string type names to Field constructors.

##### policySerializer

[`PolicySerializer`](PolicySerializer.md)

A serializer dedicated to handling Policy instances.

#### Returns

`FieldSerializer`

## Methods

### hydrate()

> **hydrate**(`snapshot`): [`Field`](../interfaces/Field.md)\<`any`\>

Defined in: fields/src/serializer/field-serializer.ts:65

Restores a Field instance from its snapshot representation.
It uses the `__type` property to find the correct constructor and hydrates
the field with its value and all its policies.

#### Parameters

##### snapshot

[`FieldSnapshot`](../interfaces/FieldSnapshot.md)

The plain object snapshot to deserialize.

#### Returns

[`Field`](../interfaces/Field.md)\<`any`\>

A new, fully functional Field instance.

#### Throws

If the snapshot is invalid, missing a `__type`, or if the type is not registered.

***

### snapshot()

> **snapshot**(`field`): [`FieldSnapshot`](../interfaces/FieldSnapshot.md)

Defined in: fields/src/serializer/field-serializer.ts:41

Creates a serializable snapshot of a Field instance.
The snapshot includes the field's type, name, current value, and the state of all its policies.

#### Parameters

##### field

[`Field`](../interfaces/Field.md)\<`any`\>

The Field instance to serialize.

#### Returns

[`FieldSnapshot`](../interfaces/FieldSnapshot.md)

A plain object ready for JSON serialization.
