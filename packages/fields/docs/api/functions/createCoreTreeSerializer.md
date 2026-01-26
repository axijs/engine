[**@axi-engine/fields**](../README.md)

***

[@axi-engine/fields](../README.md) / createCoreTreeSerializer

# Function: createCoreTreeSerializer()

> **createCoreTreeSerializer**(`fieldTreeNodeFactory`, `policySerializer?`): [`FieldTreeSerializer`](../classes/FieldTreeSerializer.md)\<[`CoreFields`](../classes/CoreFields.md)\>

Defined in: fields/src/setup.ts:55

Creates a fully configured serializer for a FieldTree.
This function composes all necessary serializers (FieldTree, Fields, Field) for a complete setup.

## Parameters

### fieldTreeNodeFactory

[`CoreTreeNodeFactory`](../classes/CoreTreeNodeFactory.md)

The factory used to create new tree nodes during deserialization.

### policySerializer?

[`PolicySerializer`](../classes/PolicySerializer.md)

## Returns

[`FieldTreeSerializer`](../classes/FieldTreeSerializer.md)\<[`CoreFields`](../classes/CoreFields.md)\>

A top-level serializer for the entire field tree.
