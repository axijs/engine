[**@axi-engine/fields**](../README.md)

***

[@axi-engine/fields](../README.md) / FieldTreeFactory

# Interface: FieldTreeFactory\<TFields\>

Defined in: fields/src/field-tree-factory.ts:10

Defines the contract for a factory that creates nodes for a FieldTree.
This allows for custom implementations of Fields and FieldTree to be used.

## Extends

- [`FieldsFactory`](FieldsFactory.md)\<`TFields`\>

## Type Parameters

### TFields

`TFields` *extends* [`Fields`](../classes/Fields.md)

## Methods

### fields()

> **fields**(): `TFields`

Defined in: fields/src/field-tree-factory.ts:11

#### Returns

`TFields`

#### Overrides

[`FieldsFactory`](FieldsFactory.md).[`fields`](FieldsFactory.md#fields)

***

### tree()

> **tree**(): [`FieldTree`](../classes/FieldTree.md)\<`TFields`\>

Defined in: fields/src/field-tree-factory.ts:12

#### Returns

[`FieldTree`](../classes/FieldTree.md)\<`TFields`\>
