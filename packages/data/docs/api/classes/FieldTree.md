[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / FieldTree

# Class: FieldTree\<TFields\>

Defined in: data/src/field-tree.ts:17

Represents a hierarchical data structure for managing the global state of the system.

This class acts as the single source of truth for long-term data that exists
across different scenes and scripts, such as player stats, inventory,
and overall game progress. It uses a path-based system for accessing and
manipulating nested data, similar to a file system.

## Extended by

- [`CoreFieldTree`](CoreFieldTree.md)

## Type Parameters

### TFields

`TFields` *extends* [`Fields`](Fields.md)

## Constructors

### Constructor

> **new FieldTree**\<`TFields`\>(`factory`): `FieldTree`\<`TFields`\>

Defined in: data/src/field-tree.ts:86

Creates an instance of FieldTree.

#### Parameters

##### factory

[`FieldTreeFactory`](../interfaces/FieldTreeFactory.md)\<`TFields`\>

A factory responsible for creating new nodes within the tree.

#### Returns

`FieldTree`\<`TFields`\>

## Properties

### typeName

> `readonly` **typeName**: `"fieldTree"` = `FieldTree.typeName`

Defined in: data/src/field-tree.ts:19

***

### typeName

> `readonly` `static` **typeName**: `"fieldTree"` = `'fieldTree'`

Defined in: data/src/field-tree.ts:18

## Accessors

### factory

#### Get Signature

> **get** **factory**(): [`FieldTreeFactory`](../interfaces/FieldTreeFactory.md)\<`TFields`\>

Defined in: data/src/field-tree.ts:78

Exposes the internal factory instance used by this tree.

##### Remarks

Direct usage of this getter is generally unnecessary.
Prefer using [createDetachedTree](#createdetachedtree) or [createDetachedFields](#createdetachedfields) to create isolated instances.

##### Returns

[`FieldTreeFactory`](../interfaces/FieldTreeFactory.md)\<`TFields`\>

The factory instance.

***

### nodes

#### Get Signature

> **get** **nodes**(): `Map`\<`string`, [`TreeNode`](../type-aliases/TreeNode.md)\<`TFields`\>\>

Defined in: data/src/field-tree.ts:65

**`Internal`**

Provides direct access to the internal node storage.

##### Remarks

This is primarily intended for **serialization**, debugging, or low-level iteration.
Avoid modifying this map directly to maintain internal consistency; use [addNode](#addnode) or [removeNode](#removenode) instead.

##### Returns

`Map`\<`string`, [`TreeNode`](../type-aliases/TreeNode.md)\<`TFields`\>\>

## Methods

### addNode()

> **addNode**(`name`, `node`): [`TreeNode`](../type-aliases/TreeNode.md)\<`TFields`\>

Defined in: data/src/field-tree.ts:116

Adds a pre-existing node as a direct child of this tree branch.

#### Parameters

##### name

`string`

The name to assign to the new child node.

##### node

[`TreeNode`](../type-aliases/TreeNode.md)\<`TFields`\>

The node instance to add.

#### Returns

[`TreeNode`](../type-aliases/TreeNode.md)\<`TFields`\>

The added node.

#### Throws

If a node with the same name already exists.

***

### clear()

> **clear**(): `void`

Defined in: data/src/field-tree.ts:255

Removes all child nodes from this tree branch.
This method ensures that `destroy()` is called on each child node, allowing for
a full, recursive cleanup of the entire subtree.

#### Returns

`void`

***

### createDetachedFields()

> **createDetachedFields**(): `TFields`

Defined in: data/src/field-tree.ts:287

Creates a new, detached Fields container using the same factory.

#### Returns

`TFields`

***

### createDetachedTree()

> **createDetachedTree**(): `FieldTree`\<`TFields`\>

Defined in: data/src/field-tree.ts:278

Creates a new, detached FieldTree instance using the same factory as this tree.
This new tree has no parent and is completely isolated.

#### Returns

`FieldTree`\<`TFields`\>

A new instance of the same tree type.

***

### createFields()

> **createFields**(`path`, `createPath?`): `TFields`

Defined in: data/src/field-tree.ts:178

Creates a new `Fields` (leaf) container at the specified path.

#### Parameters

##### path

`PathType`

The path where the new `Fields` container should be created.

##### createPath?

`boolean`

If `true`, any missing parent branches in the path will be created automatically.

#### Returns

`TFields`

The newly created `Fields` instance.

#### Throws

If the path is invalid or a node already exists at the target location.

***

### createFieldTree()

> **createFieldTree**\<`T`\>(`path`, `createPath?`): `T`

Defined in: data/src/field-tree.ts:166

Creates a new `FieldTree` (branch) node at the specified path.

#### Type Parameters

##### T

`T` *extends* `FieldTree`\<`TFields`\>

#### Parameters

##### path

`PathType`

The path where the new `FieldTree` should be created.

##### createPath?

`boolean`

If `true`, any missing parent branches in the path will be created automatically.

#### Returns

`T`

The newly created `FieldTree` instance.

#### Throws

If the path is invalid or a node already exists at the target location.

***

### destroy()

> **destroy**(): `void`

Defined in: data/src/field-tree.ts:266

Performs a complete cleanup of this node and its entire subtree.

It recursively destroys all child nodes by calling `clear()` and then
unsubscribes all listeners from its own event emitters.
This method should be called when a node is no longer needed.

#### Returns

`void`

***

### findParentNode()

> **findParentNode**(`path`): `FieldTree`\<`TFields`\> \| `TFields`

Defined in: data/src/field-tree.ts:245

Finds the parent node for a given path.

#### Parameters

##### path

`PathType`

The path to the target node.

#### Returns

`FieldTree`\<`TFields`\> \| `TFields`

The parent node (either a FieldTree or Fields).

#### Throws

An error if the path is invalid or any intermediate node is not a FieldTree.

***

### getFields()

> **getFields**(`path`): `TFields`

Defined in: data/src/field-tree.ts:205

Retrieves a `Fields` (leaf) container from a specified path.

#### Parameters

##### path

`PathType`

The path to the `Fields` container.

#### Returns

`TFields`

The `Fields` instance at the specified path.

#### Throws

If the path is invalid or the node at the path is not a `Fields` container.

***

### getFieldTree()

> **getFieldTree**(`path`): `FieldTree`\<`TFields`\>

Defined in: data/src/field-tree.ts:189

Retrieves a `FieldTree` (branch) node from a specified path.

#### Parameters

##### path

`PathType`

The path to the `FieldTree` node.

#### Returns

`FieldTree`\<`TFields`\>

The `FieldTree` instance at the specified path.

#### Throws

If the path is invalid or the node at the path is not a `FieldTree`.

***

### getNode()

> **getNode**(`name`): [`TreeNode`](../type-aliases/TreeNode.md)\<`TFields`\>

Defined in: data/src/field-tree.ts:129

Retrieves a direct child node by its name.

#### Parameters

##### name

`string`

The name of the child node.

#### Returns

[`TreeNode`](../type-aliases/TreeNode.md)\<`TFields`\>

The retrieved node.

#### Throws

If a node with the given name cannot be found.

***

### getOrCreateFields()

> **getOrCreateFields**(`path`): `TFields`

Defined in: data/src/field-tree.ts:232

Retrieves a `Fields` container at the specified path. If it or any part of the path doesn't exist, it will be created.

#### Parameters

##### path

`PathType`

The path to the `Fields` container.

#### Returns

`TFields`

The existing or newly created `Fields` instance.

***

### getOrCreateFieldTree()

> **getOrCreateFieldTree**(`path`): `FieldTree`\<`TFields`\>

Defined in: data/src/field-tree.ts:220

Retrieves a `FieldTree` at the specified path. If it or any part of the path doesn't exist, it will be created.

#### Parameters

##### path

`PathType`

The path to the `FieldTree` node.

#### Returns

`FieldTree`\<`TFields`\>

The existing or newly created `FieldTree` instance.

***

### has()

> **has**(`name`): `boolean`

Defined in: data/src/field-tree.ts:95

Checks if a direct child node with the given name exists.

#### Parameters

##### name

`string`

The name of the direct child node.

#### Returns

`boolean`

`true` if the node exists, otherwise `false`.

***

### hasPath()

> **hasPath**(`path`): `boolean`

Defined in: data/src/field-tree.ts:104

Checks if a node exists at a given path, traversing the tree.

#### Parameters

##### path

`PathType`

The path to check (e.g., 'player/stats' or ['player', 'stats']).

#### Returns

`boolean`

`true` if the entire path resolves to a node, otherwise `false`.

***

### removeNode()

> **removeNode**(`names`): `void`

Defined in: data/src/field-tree.ts:145

Removes one or more nodes from this tree branch.

This method first validates that all specified nodes exist. If validation passes,
it recursively calls `destroy()` on each node to ensure proper cleanup of the entire subtree.
Finally, it emits a single `onRemove` event with the names of all successfully removed nodes.

#### Parameters

##### names

A single name or an array of names of the nodes to remove.

`string` | `string`[]

#### Returns

`void`

#### Throws

If any of the specified names do not correspond to an existing node.

## Events

### onAdd

> **onAdd**: `Emitter`\<\[`object`\]\>

Defined in: data/src/field-tree.ts:38

An event emitter that fires immediately after a new node is added to this tree branch.

#### Param

The event payload.

#### Param

The name (key) of the added node.

#### Param

The node instance that was added.

#### Example

```ts
myTree.onAdd.subscribe(({ name, node }) => {
  console.log(`Node '${name}' was added.`, node);
});
```

***

### onRemove

> **onRemove**: `Emitter`\<\[`object`\]\>

Defined in: data/src/field-tree.ts:53

An event emitter that fires once after one or more nodes have been successfully removed.

#### Param

The event payload.

#### Param

An array of names of the nodes that were removed.

#### Example

```ts
myTree.onRemove.subscribe(({ names }) => {
  console.log(`Nodes removed: ${names.join(', ')}`);
});
```
