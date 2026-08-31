[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / NodeOps

# Variable: NodeOps

> `const` **NodeOps**: `object`

Defined in: packages/data/src/fields/node-ops.ts:4

## Type Declaration

### add()

> **add**: (`node`, `childName`, `childNode`) => `boolean`

adds the childNode if didn't exist

#### Parameters

##### node

[`FieldNode`](../type-aliases/FieldNode.md)

##### childName

`string`

##### childNode

[`FieldNode`](../type-aliases/FieldNode.md)

#### Returns

`boolean`

boolean

### get()

> **get**: (`node`, `childName`) => [`FieldNode`](../type-aliases/FieldNode.md) \| `undefined`

#### Parameters

##### node

[`FieldNode`](../type-aliases/FieldNode.md)

##### childName

`string`

#### Returns

[`FieldNode`](../type-aliases/FieldNode.md) \| `undefined`

### has()

> **has**: (`node`, `childName`) => `boolean`

nodes manipulations

#### Parameters

##### node

[`FieldNode`](../type-aliases/FieldNode.md)

##### childName

`string`

#### Returns

`boolean`

### remove()

> **remove**: (`node`, `childName`) => `boolean`

#### Parameters

##### node

[`FieldNode`](../type-aliases/FieldNode.md)

##### childName

`string`

#### Returns

`boolean`

### replace()

> **replace**: (`node`, `childName`, `childNode`) => `boolean`

replaces the childNode if exist

#### Parameters

##### node

[`FieldNode`](../type-aliases/FieldNode.md)

##### childName

`string`

##### childNode

[`FieldNode`](../type-aliases/FieldNode.md)

#### Returns

`boolean`

boolean

### set()

> **set**: (`node`, `childName`, `childNode`) => `boolean`

set or replace field node

#### Parameters

##### node

[`FieldNode`](../type-aliases/FieldNode.md)

##### childName

`string`

##### childNode

[`FieldNode`](../type-aliases/FieldNode.md)

#### Returns

`boolean`
