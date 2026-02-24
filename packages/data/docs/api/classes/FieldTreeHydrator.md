[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / FieldTreeHydrator

# Class: FieldTreeHydrator\<TFields\>

Defined in: packages/data/src/fields/serializers/field-tree-hydrator.ts:22

Orchestrates the recursive deserialization of `FieldTree` instances.

This class handles the conversion of an entire `FieldTree` object graph into a
plain, storable snapshot and vice-versa. It delegates the processing of `Fields`
leaf nodes to a dedicated `FieldsHydrator`.

## Todo

Refactoring: The current implementation uses `if/else` logic in `snapshot` and `hydrate`
      to process different node types. A more extensible approach would be to use a
      registry of dedicated handlers for each node type.
      This would allow new node types to be supported without
      modifying this class, adhering to the Open/Closed Principle.

## Type Parameters

### TFields

`TFields` *extends* [`Fields`](Fields.md)

## Constructors

### Constructor

> **new FieldTreeHydrator**\<`TFields`\>(`fieldTreeNodeFactory`, `fieldsHydrator`): `FieldTreeHydrator`\<`TFields`\>

Defined in: packages/data/src/fields/serializers/field-tree-hydrator.ts:35

#### Parameters

##### fieldTreeNodeFactory

[`FieldTreeFactory`](../interfaces/FieldTreeFactory.md)\<`TFields`\>

##### fieldsHydrator

[`FieldsHydrator`](FieldsHydrator.md)\<`TFields`\>

#### Returns

`FieldTreeHydrator`\<`TFields`\>

## Properties

### \_factory

> **\_factory**: [`FieldTreeFactory`](../interfaces/FieldTreeFactory.md)\<`TFields`\>

Defined in: packages/data/src/fields/serializers/field-tree-hydrator.ts:24

***

### \_fieldsHydrator

> **\_fieldsHydrator**: [`FieldsHydrator`](FieldsHydrator.md)\<`TFields`\>

Defined in: packages/data/src/fields/serializers/field-tree-hydrator.ts:25

## Accessors

### factory

#### Get Signature

> **get** **factory**(): [`FieldTreeFactory`](../interfaces/FieldTreeFactory.md)\<`TFields`\>

Defined in: packages/data/src/fields/serializers/field-tree-hydrator.ts:27

##### Returns

[`FieldTreeFactory`](../interfaces/FieldTreeFactory.md)\<`TFields`\>

***

### fieldsHydrator

#### Get Signature

> **get** **fieldsHydrator**(): [`FieldsHydrator`](FieldsHydrator.md)\<`TFields`\>

Defined in: packages/data/src/fields/serializers/field-tree-hydrator.ts:31

##### Returns

[`FieldsHydrator`](FieldsHydrator.md)\<`TFields`\>

## Methods

### hydrate()

> **hydrate**(`snapshot`): [`FieldTree`](FieldTree.md)\<`TFields`\>

Defined in: packages/data/src/fields/serializers/field-tree-hydrator.ts:45

Restores the state of the tree from a snapshot.
It intelligently creates missing nodes based on `__type` metadata and delegates hydration to child nodes.

#### Parameters

##### snapshot

[`FieldTreeSnapshot`](../interfaces/FieldTreeSnapshot.md)

The snapshot object to load.

#### Returns

[`FieldTree`](FieldTree.md)\<`TFields`\>

***

### patch()

> **patch**(`tree`, `snapshot`): `void`

Defined in: packages/data/src/fields/serializers/field-tree-hydrator.ts:71

Synchronizes an existing `FieldTree` branch with a snapshot.

This method performs a recursive update to match the tree state with the provided snapshot:
1. **Removes** child nodes that are present in the tree but missing in the snapshot.
2. **Creates** new nodes that are present in the snapshot but missing in the tree.
3. **Replaces** nodes if their type has changed (e.g., replacing a `Fields` leaf with a `FieldTree` branch).
4. **Patches** existing matching nodes in-place (recursively).

#### Parameters

##### tree

[`FieldTree`](FieldTree.md)\<`TFields`\>

The target tree instance to update.

##### snapshot

[`FieldTreeSnapshot`](../interfaces/FieldTreeSnapshot.md)

The source snapshot containing the desired state.

#### Returns

`void`
