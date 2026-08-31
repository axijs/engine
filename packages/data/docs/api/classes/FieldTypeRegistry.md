[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / FieldTypeRegistry

# Class: FieldTypeRegistry

Defined in: packages/data/src/field-type-registry/field-type-registry.ts:7

## Constructors

### Constructor

> **new FieldTypeRegistry**(): `FieldTypeRegistry`

#### Returns

`FieldTypeRegistry`

## Methods

### cloneNodeValue()

> **cloneNodeValue**(`val`): `unknown`

Defined in: packages/data/src/field-type-registry/field-type-registry.ts:51

#### Parameters

##### val

[`Field`](../interfaces/Field.md)\<`unknown`\>

#### Returns

`unknown`

***

### cloneValue()

> **cloneValue**(`val`): `unknown`

Defined in: packages/data/src/field-type-registry/field-type-registry.ts:55

#### Parameters

##### val

`unknown`

#### Returns

`unknown`

***

### compare()

> **compare**(`node`, `val`): `boolean`

Defined in: packages/data/src/field-type-registry/field-type-registry.ts:32

#### Parameters

##### node

[`Field`](../interfaces/Field.md)\<`any`\>

##### val

`unknown`

#### Returns

`boolean`

***

### createNode()

> **createNode**(`val`): [`RegisteredField`](../type-aliases/RegisteredField.md)

Defined in: packages/data/src/field-type-registry/field-type-registry.ts:27

#### Parameters

##### val

`unknown`

#### Returns

[`RegisteredField`](../type-aliases/RegisteredField.md)

***

### getDefinition()

> **getDefinition**(`type`): [`FieldTypeDefinition`](../interfaces/FieldTypeDefinition.md)

Defined in: packages/data/src/field-type-registry/field-type-registry.ts:17

#### Parameters

##### type

keyof [`RegisteredFields`](../interfaces/RegisteredFields.md)

#### Returns

[`FieldTypeDefinition`](../interfaces/FieldTypeDefinition.md)

***

### getNodeNameByVariable()

> **getNodeNameByVariable**(`val`): keyof [`RegisteredFields`](../interfaces/RegisteredFields.md)

Defined in: packages/data/src/field-type-registry/field-type-registry.ts:39

#### Parameters

##### val

`unknown`

#### Returns

keyof [`RegisteredFields`](../interfaces/RegisteredFields.md)

***

### isValueEquivalent()

> **isValueEquivalent**(`node`, `newVal`): `boolean`

Defined in: packages/data/src/field-type-registry/field-type-registry.ts:43

#### Parameters

##### node

[`Field`](../interfaces/Field.md)\<`any`\>

##### newVal

`unknown`

#### Returns

`boolean`

***

### register()

> **register**(`fieldName`, `config`): `void`

Defined in: packages/data/src/field-type-registry/field-type-registry.ts:13

#### Parameters

##### fieldName

keyof [`RegisteredFields`](../interfaces/RegisteredFields.md)

##### config

[`FieldTypeDefinition`](../interfaces/FieldTypeDefinition.md)

#### Returns

`void`

***

### setFallback()

> **setFallback**(`fieldName`, `config`): `void`

Defined in: packages/data/src/field-type-registry/field-type-registry.ts:22

#### Parameters

##### fieldName

keyof [`RegisteredFields`](../interfaces/RegisteredFields.md)

##### config

[`FieldTypeDefinition`](../interfaces/FieldTypeDefinition.md)

#### Returns

`void`
