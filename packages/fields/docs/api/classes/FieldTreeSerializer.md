[**@axi-engine/fields**](../README.md)

***

[@axi-engine/fields](../README.md) / FieldTreeSerializer

# Class: FieldTreeSerializer\<TFields\>

Defined in: fields/src/serializer/field-tree-serializer.ts:27

Orchestrates the recursive serialization and deserialization of `FieldTree` instances.

This class handles the conversion of an entire `FieldTree` object graph into a
plain, storable snapshot and vice-versa. It delegates the processing of `Fields`
leaf nodes to a dedicated `FieldsSerializer`.

## Todo

Refactoring: The current implementation uses `if/else` logic in `snapshot` and `hydrate`
      to process different node types. A more extensible approach would be to use a
      registry of dedicated handlers for each node type.
      This would allow new node types to be supported without
      modifying this class, adhering to the Open/Closed Principle.

## Todo

Implement a `patch(tree, snapshot)` method for recursive, non-destructive
      updates. This method should traverse the existing tree and the snapshot,
      patching nodes in place to maintain object references.

## Type Parameters

### TFields

`TFields` *extends* [`Fields`](Fields.md)

## Constructors

### Constructor

> **new FieldTreeSerializer**\<`TFields`\>(`fieldTreeNodeFactory`, `fieldsSerializer`): `FieldTreeSerializer`\<`TFields`\>

Defined in: fields/src/serializer/field-tree-serializer.ts:29

#### Parameters

##### fieldTreeNodeFactory

[`FieldTreeFactory`](../interfaces/FieldTreeFactory.md)\<`TFields`\>

##### fieldsSerializer

[`FieldsSerializer`](FieldsSerializer.md)\<`TFields`\>

#### Returns

`FieldTreeSerializer`\<`TFields`\>

## Methods

### hydrate()

> **hydrate**(`snapshot`): [`FieldTree`](FieldTree.md)\<`TFields`\>

Defined in: fields/src/serializer/field-tree-serializer.ts:59

Restores the state of the tree from a snapshot.
It intelligently creates missing nodes based on `__type` metadata and delegates hydration to child nodes.

#### Parameters

##### snapshot

[`FieldTreeSnapshot`](../interfaces/FieldTreeSnapshot.md)

The snapshot object to load.

#### Returns

[`FieldTree`](FieldTree.md)\<`TFields`\>

***

### snapshot()

> **snapshot**(`tree`): [`FieldTreeSnapshot`](../interfaces/FieldTreeSnapshot.md)

Defined in: fields/src/serializer/field-tree-serializer.ts:39

Creates a serializable snapshot of the entire tree and its contained fields.

#### Parameters

##### tree

[`FieldTree`](FieldTree.md)\<`TFields`\>

#### Returns

[`FieldTreeSnapshot`](../interfaces/FieldTreeSnapshot.md)

A plain JavaScript object representing the complete state managed by this tree.
