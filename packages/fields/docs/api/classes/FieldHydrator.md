[**@axi-engine/fields**](../README.md)

***

[@axi-engine/fields](../README.md) / FieldHydrator

# Class: FieldHydrator

Defined in: fields/src/serializers/field-hydrator.ts:17

Orchestrates the serialization and deserialization of Field instances.

This class acts as a central point for converting complex Field objects into
plain, storable data (snapshots) and vice-versa. It uses a `FieldRegistry`
to resolve class constructors and a `PolicySerializer` to handle the state
of any attached policies.

## Constructors

### Constructor

> **new FieldHydrator**(`fieldRegistry`, `policySerializer`): `FieldHydrator`

Defined in: fields/src/serializers/field-hydrator.ts:24

Creates an instance of FieldSerializer.

#### Parameters

##### fieldRegistry

[`FieldRegistry`](FieldRegistry.md)

A registry that maps string type names to Field constructors.

##### policySerializer

[`PolicySerializer`](PolicySerializer.md)

A serializer dedicated to handling Policy instances.

#### Returns

`FieldHydrator`

## Methods

### hydrate()

> **hydrate**(`snapshot`): [`Field`](../interfaces/Field.md)\<`any`\>

Defined in: fields/src/serializers/field-hydrator.ts:38

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

### patch()

> **patch**(`field`, `snapshot`): `void`

Defined in: fields/src/serializers/field-hydrator.ts:57

Updates an existing Field instance with data from a snapshot.

This method modifies the field in-place, preserving the object reference.
It updates the field's value and completely replaces its current policies
with the ones defined in the snapshot.

#### Parameters

##### field

[`Field`](../interfaces/Field.md)\<`any`\>

The existing Field instance to update.

##### snapshot

[`FieldSnapshot`](../interfaces/FieldSnapshot.md)

The snapshot containing the new state.

#### Returns

`void`
