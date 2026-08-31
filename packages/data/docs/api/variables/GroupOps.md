[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / GroupOps

# Variable: GroupOps

> `const` **GroupOps**: `object`

Defined in: packages/data/src/fields/group-ops.ts:19

Navigates the tree to the parent of a target node.
This is the core traversal logic for all path-based operations.

## Type Declaration

### add()

> **add**: (`group`, `path`, `childNode`) => `boolean`

#### Parameters

##### group

[`FieldGroup`](../interfaces/FieldGroup.md)

##### path

`PathType`

##### childNode

[`FieldNode`](../type-aliases/FieldNode.md)

#### Returns

`boolean`

boolean

### collectPaths()

> **collectPaths**: (`group`, `basePath`, `result`) => `string`[][]

#### Parameters

##### group

[`FieldGroup`](../interfaces/FieldGroup.md)

##### basePath?

`string`[] = `[]`

##### result?

`string`[][] = `[]`

#### Returns

`string`[][]

### collectPathsStr()

> **collectPathsStr**: (`group`, `basePath`, `result`) => `string`[]

#### Parameters

##### group

[`FieldGroup`](../interfaces/FieldGroup.md)

##### basePath?

`string` = `''`

##### result?

`string`[] = `[]`

#### Returns

`string`[]

### get()

> **get**: (`group`, `path`) => [`FieldNode`](../type-aliases/FieldNode.md) \| `undefined`

#### Parameters

##### group

[`FieldGroup`](../interfaces/FieldGroup.md)

##### path

`PathType`

#### Returns

[`FieldNode`](../type-aliases/FieldNode.md) \| `undefined`

### has()

> **has**: (`group`, `path`) => `boolean`

Checks if a node exists at a given path, traversing the tree.

#### Parameters

##### group

[`FieldGroup`](../interfaces/FieldGroup.md)

##### path

`PathType`

The path to check (e.g., 'player/stats' or ['player', 'stats']).

#### Returns

`boolean`

`true` if the entire path resolves to a node, otherwise `false`.

### remove()

> **remove**: (`group`, `path`) => `boolean`

#### Parameters

##### group

[`FieldGroup`](../interfaces/FieldGroup.md)

##### path

`PathType`

#### Returns

`boolean`

### replace()

> **replace**: (`group`, `path`, `childNode`) => `boolean`

#### Parameters

##### group

[`FieldGroup`](../interfaces/FieldGroup.md)

##### path

`PathType`

##### childNode

[`FieldNode`](../type-aliases/FieldNode.md)

#### Returns

`boolean`

boolean

### traversePath()

> **traversePath**: (`group`, `path`, `options?`) => \{ `branch`: [`FieldGroup`](../interfaces/FieldGroup.md); `leafName`: `string`; \} \| `undefined`

#### Parameters

##### group

[`FieldGroup`](../interfaces/FieldGroup.md)

##### path

`PathType`

##### options?

###### createPath?

`boolean`

#### Returns

\{ `branch`: [`FieldGroup`](../interfaces/FieldGroup.md); `leafName`: `string`; \} \| `undefined`

### set()

> **set**(`group`, `path`, `childNode`): `boolean`

#### Parameters

##### group

[`FieldGroup`](../interfaces/FieldGroup.md)

##### path

`PathType`

##### childNode

[`FieldNode`](../type-aliases/FieldNode.md)

#### Returns

`boolean`

true
