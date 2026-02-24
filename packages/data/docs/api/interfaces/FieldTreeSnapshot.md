[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / FieldTreeSnapshot

# Interface: FieldTreeSnapshot

Defined in: packages/data/src/fields/serializers/field-tree-snapshot.ts:12

Represents the serializable state of a `FieldTree` container.

This type describes a plain object that has:
1. A required `__type` property to identify the tree's class.
2. An arbitrary number of other properties, where each key is the `name`
   of a child node, and the value is the snapshot of that child node.
   The `| string` is included to ensure compatibility with the `__type` property.

## Indexable

\[`fieldName`: `string`\]: `string` \| [`FieldsSnapshot`](FieldsSnapshot.md) \| `FieldTreeSnapshot`

## Properties

### \_\_type

> **\_\_type**: `string`

Defined in: packages/data/src/fields/serializers/field-tree-snapshot.ts:13
