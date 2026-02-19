[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / CoreTreeNodeFactory

# Class: CoreTreeNodeFactory

Defined in: data/src/core-field-tree-factory.ts:10

The default factory implementation that creates standard DefaultFields and FieldTree instances.

## Extends

- [`CoreFieldsFactory`](CoreFieldsFactory.md)

## Implements

- [`FieldTreeFactory`](../interfaces/FieldTreeFactory.md)\<[`CoreFields`](CoreFields.md)\>

## Constructors

### Constructor

> **new CoreTreeNodeFactory**(`fieldRegistry`): `CoreTreeNodeFactory`

Defined in: data/src/core-field-tree-factory.ts:11

#### Parameters

##### fieldRegistry

[`FieldRegistry`](FieldRegistry.md)

#### Returns

`CoreTreeNodeFactory`

#### Overrides

[`CoreFieldsFactory`](CoreFieldsFactory.md).[`constructor`](CoreFieldsFactory.md#constructor)

## Properties

### \_fieldRegistry

> `protected` `readonly` **\_fieldRegistry**: [`FieldRegistry`](FieldRegistry.md)

Defined in: data/src/core-fields-factory.ts:7

#### Inherited from

[`CoreFieldsFactory`](CoreFieldsFactory.md).[`_fieldRegistry`](CoreFieldsFactory.md#_fieldregistry)

## Accessors

### fieldRegistry

#### Get Signature

> **get** **fieldRegistry**(): [`FieldRegistry`](FieldRegistry.md)

Defined in: data/src/core-fields-factory.ts:9

##### Returns

[`FieldRegistry`](FieldRegistry.md)

#### Inherited from

[`CoreFieldsFactory`](CoreFieldsFactory.md).[`fieldRegistry`](CoreFieldsFactory.md#fieldregistry)

## Methods

### fields()

> **fields**(): [`CoreFields`](CoreFields.md)

Defined in: data/src/core-fields-factory.ts:17

#### Returns

[`CoreFields`](CoreFields.md)

#### Implementation of

[`FieldTreeFactory`](../interfaces/FieldTreeFactory.md).[`fields`](../interfaces/FieldTreeFactory.md#fields)

#### Inherited from

[`CoreFieldsFactory`](CoreFieldsFactory.md).[`fields`](CoreFieldsFactory.md#fields)

***

### tree()

> **tree**(): [`CoreFieldTree`](CoreFieldTree.md)

Defined in: data/src/core-field-tree-factory.ts:15

#### Returns

[`CoreFieldTree`](CoreFieldTree.md)

#### Implementation of

[`FieldTreeFactory`](../interfaces/FieldTreeFactory.md).[`tree`](../interfaces/FieldTreeFactory.md#tree)
