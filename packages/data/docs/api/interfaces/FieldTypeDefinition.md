[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / FieldTypeDefinition

# Interface: FieldTypeDefinition

Defined in: packages/data/src/field-type-registry/field-type-definition.ts:3

## Methods

### checkNode()

> **checkNode**(`field`): `boolean`

Defined in: packages/data/src/field-type-registry/field-type-definition.ts:8

#### Parameters

##### field

[`BaseNode`](BaseNode.md)

#### Returns

`boolean`

***

### checkType()

> **checkType**(`val`): `boolean`

Defined in: packages/data/src/field-type-registry/field-type-definition.ts:5

#### Parameters

##### val

`unknown`

#### Returns

`boolean`

***

### cloneValue()

> **cloneValue**(`val`): `unknown`

Defined in: packages/data/src/field-type-registry/field-type-definition.ts:16

#### Parameters

##### val

`unknown`

#### Returns

`unknown`

***

### createNode()

> **createNode**(`val`): [`RegisteredField`](../type-aliases/RegisteredField.md)

Defined in: packages/data/src/field-type-registry/field-type-definition.ts:11

#### Parameters

##### val

`unknown`

#### Returns

[`RegisteredField`](../type-aliases/RegisteredField.md)

***

### isValueEquivalent()

> **isValueEquivalent**(`oldVal`, `newVal`): `boolean`

Defined in: packages/data/src/field-type-registry/field-type-definition.ts:13

#### Parameters

##### oldVal

`unknown`

##### newVal

`unknown`

#### Returns

`boolean`
