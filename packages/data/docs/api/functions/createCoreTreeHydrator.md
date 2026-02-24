[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / createCoreTreeHydrator

# Function: createCoreTreeHydrator()

> **createCoreTreeHydrator**(`fieldTreeNodeFactory`, `policySerializer?`): [`FieldTreeHydrator`](../classes/FieldTreeHydrator.md)\<[`CoreFields`](../classes/CoreFields.md)\>

Defined in: packages/data/src/setup.ts:56

Creates a fully configured serializer for a FieldTree.
This function composes all necessary serializers (FieldTree, Fields, Field) for a complete setup.

## Parameters

### fieldTreeNodeFactory

[`CoreTreeNodeFactory`](../classes/CoreTreeNodeFactory.md)

The factory used to create new tree nodes during deserialization.

### policySerializer?

[`PolicySerializer`](../classes/PolicySerializer.md)

## Returns

[`FieldTreeHydrator`](../classes/FieldTreeHydrator.md)\<[`CoreFields`](../classes/CoreFields.md)\>

A top-level serializer for the entire field tree.
