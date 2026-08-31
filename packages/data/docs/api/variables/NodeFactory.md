[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / NodeFactory

# Variable: NodeFactory

> `const` **NodeFactory**: `object`

Defined in: packages/data/src/fields/node-factory.ts:4

## Type Declaration

### bool()

> **bool**: (`value`) => [`BooleanField`](../interfaces/BooleanField.md)

#### Parameters

##### value

`boolean`

#### Returns

[`BooleanField`](../interfaces/BooleanField.md)

### generic()

> **generic**: (`value`) => [`GenericField`](../interfaces/GenericField.md)

#### Parameters

##### value

`unknown`

#### Returns

[`GenericField`](../interfaces/GenericField.md)

### group()

> **group**: (`data`) => [`FieldGroup`](../interfaces/FieldGroup.md)

#### Parameters

##### data?

`Record`\<`string`, [`FieldNode`](../type-aliases/FieldNode.md)\> = `{}`

#### Returns

[`FieldGroup`](../interfaces/FieldGroup.md)

### num()

> **num**: (`value`) => [`NumericField`](../interfaces/NumericField.md)

#### Parameters

##### value

`number`

#### Returns

[`NumericField`](../interfaces/NumericField.md)

### raw()

> **raw**: \<`T`\>(`type`, `value`) => [`Field`](../interfaces/Field.md)\<`any`\>

#### Type Parameters

##### T

`T`

#### Parameters

##### type

`string`

##### value

`T`

#### Returns

[`Field`](../interfaces/Field.md)\<`any`\>

### str()

> **str**: (`value`) => [`StringField`](../interfaces/StringField.md)

#### Parameters

##### value

`string`

#### Returns

[`StringField`](../interfaces/StringField.md)
