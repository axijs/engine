[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / CoreFieldTree

# Class: CoreFieldTree

Defined in: packages/data/src/fields/core-field-tree.ts:4

Represents a hierarchical data structure for managing the global state of the system.

This class acts as the single source of truth for long-term data that exists
across different scenes and scripts, such as player stats, inventory,
and overall game progress. It uses a path-based system for accessing and
manipulating nested data, similar to a file system.

## Extends

- [`FieldTree`](FieldTree.md)\<[`CoreFields`](CoreFields.md)\>

## Constructors

### Constructor

> **new CoreFieldTree**(`factory`): `CoreFieldTree`

Defined in: packages/data/src/fields/field-tree.ts:87

Creates an instance of FieldTree.

#### Parameters

##### factory

[`FieldTreeFactory`](../interfaces/FieldTreeFactory.md)\<[`CoreFields`](CoreFields.md)\>

A factory responsible for creating new nodes within the tree.

#### Returns

`CoreFieldTree`

#### Inherited from

[`FieldTree`](FieldTree.md).[`constructor`](FieldTree.md#constructor)

## Properties

### typeName

> `readonly` **typeName**: `"fieldTree"` = `FieldTree.typeName`

Defined in: packages/data/src/fields/field-tree.ts:20

#### Inherited from

[`FieldTree`](FieldTree.md).[`typeName`](FieldTree.md#typename)

***

### typeName

> `readonly` `static` **typeName**: `"fieldTree"` = `'fieldTree'`

Defined in: packages/data/src/fields/field-tree.ts:19

#### Inherited from

[`FieldTree`](FieldTree.md).[`typeName`](FieldTree.md#typename-1)

## Accessors

### factory

#### Get Signature

> **get** **factory**(): [`FieldTreeFactory`](../interfaces/FieldTreeFactory.md)\<`TFields`\>

Defined in: packages/data/src/fields/field-tree.ts:79

Exposes the internal factory instance used by this tree.

##### Remarks

Direct usage of this getter is generally unnecessary.
Prefer using [createDetachedTree](#createdetachedtree) or [createDetachedFields](#createdetachedfields) to create isolated instances.

##### Returns

[`FieldTreeFactory`](../interfaces/FieldTreeFactory.md)\<`TFields`\>

The factory instance.

#### Inherited from

[`FieldTree`](FieldTree.md).[`factory`](FieldTree.md#factory)

***

### nodes

#### Get Signature

> **get** **nodes**(): `Map`\<`string`, [`TreeNode`](../type-aliases/TreeNode.md)\<`TFields`\>\>

Defined in: packages/data/src/fields/field-tree.ts:66

**`Internal`**

Provides direct access to the internal node storage.

##### Remarks

This is primarily intended for **serialization**, debugging, or low-level iteration.
Avoid modifying this map directly to maintain internal consistency; use [addNode](#addnode) or [removeNode](#removenode) instead.

##### Returns

`Map`\<`string`, [`TreeNode`](../type-aliases/TreeNode.md)\<`TFields`\>\>

#### Inherited from

[`FieldTree`](FieldTree.md).[`nodes`](FieldTree.md#nodes)

## Methods

### addNode()

> **addNode**(`name`, `node`): [`TreeNode`](../type-aliases/TreeNode.md)\<[`CoreFields`](CoreFields.md)\>

Defined in: packages/data/src/fields/field-tree.ts:146

Adds a pre-existing node as a direct child of this tree branch.

#### Parameters

##### name

`string`

The name to assign to the new child node.

##### node

[`TreeNode`](../type-aliases/TreeNode.md)\<[`CoreFields`](CoreFields.md)\>

The node instance to add.

#### Returns

[`TreeNode`](../type-aliases/TreeNode.md)\<[`CoreFields`](CoreFields.md)\>

The added node.

#### Throws

If a node with the same name already exists.

#### Inherited from

[`FieldTree`](FieldTree.md).[`addNode`](FieldTree.md#addnode)

***

### clear()

> **clear**(): `void`

Defined in: packages/data/src/fields/field-tree.ts:285

Removes all child nodes from this tree branch.
This method ensures that `destroy()` is called on each child node, allowing for
a full, recursive cleanup of the entire subtree.

#### Returns

`void`

#### Inherited from

[`FieldTree`](FieldTree.md).[`clear`](FieldTree.md#clear)

***

### createDetachedFields()

> **createDetachedFields**(): [`CoreFields`](CoreFields.md)

Defined in: packages/data/src/fields/field-tree.ts:317

Creates a new, detached Fields container using the same factory.

#### Returns

[`CoreFields`](CoreFields.md)

#### Inherited from

[`FieldTree`](FieldTree.md).[`createDetachedFields`](FieldTree.md#createdetachedfields)

***

### createDetachedTree()

> **createDetachedTree**(): [`FieldTree`](FieldTree.md)\<[`CoreFields`](CoreFields.md)\>

Defined in: packages/data/src/fields/field-tree.ts:308

Creates a new, detached FieldTree instance using the same factory as this tree.
This new tree has no parent and is completely isolated.

#### Returns

[`FieldTree`](FieldTree.md)\<[`CoreFields`](CoreFields.md)\>

A new instance of the same tree type.

#### Inherited from

[`FieldTree`](FieldTree.md).[`createDetachedTree`](FieldTree.md#createdetachedtree)

***

### createFields()

> **createFields**(`path`, `createPath?`): [`CoreFields`](CoreFields.md)

Defined in: packages/data/src/fields/field-tree.ts:208

Creates a new `Fields` (leaf) container at the specified path.

#### Parameters

##### path

`PathType`

The path where the new `Fields` container should be created.

##### createPath?

`boolean`

If `true`, any missing parent branches in the path will be created automatically.

#### Returns

[`CoreFields`](CoreFields.md)

The newly created `Fields` instance.

#### Throws

If the path is invalid or a node already exists at the target location.

#### Inherited from

[`FieldTree`](FieldTree.md).[`createFields`](FieldTree.md#createfields)

***

### createFieldTree()

> **createFieldTree**\<`T`\>(`path`, `createPath?`): `T`

Defined in: packages/data/src/fields/field-tree.ts:196

Creates a new `FieldTree` (branch) node at the specified path.

#### Type Parameters

##### T

`T` *extends* [`FieldTree`](FieldTree.md)\<[`CoreFields`](CoreFields.md)\>

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

#### Inherited from

[`FieldTree`](FieldTree.md).[`createFieldTree`](FieldTree.md#createfieldtree)

***

### destroy()

> **destroy**(): `void`

Defined in: packages/data/src/fields/field-tree.ts:296

Performs a complete cleanup of this node and its entire subtree.

It recursively destroys all child nodes by calling `clear()` and then
unsubscribes all listeners from its own event emitters.
This method should be called when a node is no longer needed.

#### Returns

`void`

#### Inherited from

[`FieldTree`](FieldTree.md).[`destroy`](FieldTree.md#destroy)

***

### findParentNode()

> **findParentNode**(`path`): [`CoreFields`](CoreFields.md) \| [`FieldTree`](FieldTree.md)\<[`CoreFields`](CoreFields.md)\>

Defined in: packages/data/src/fields/field-tree.ts:275

Finds the parent node for a given path.

#### Parameters

##### path

`PathType`

The path to the target node.

#### Returns

[`CoreFields`](CoreFields.md) \| [`FieldTree`](FieldTree.md)\<[`CoreFields`](CoreFields.md)\>

The parent node (either a FieldTree or Fields).

#### Throws

An error if the path is invalid or any intermediate node is not a FieldTree.

#### Inherited from

[`FieldTree`](FieldTree.md).[`findParentNode`](FieldTree.md#findparentnode)

***

### getFields()

> **getFields**(`path`): [`CoreFields`](CoreFields.md)

Defined in: packages/data/src/fields/field-tree.ts:235

Retrieves a `Fields` (leaf) container from a specified path.

#### Parameters

##### path

`PathType`

The path to the `Fields` container.

#### Returns

[`CoreFields`](CoreFields.md)

The `Fields` instance at the specified path.

#### Throws

If the path is invalid or the node at the path is not a `Fields` container.

#### Inherited from

[`FieldTree`](FieldTree.md).[`getFields`](FieldTree.md#getfields)

***

### getFieldTree()

> **getFieldTree**(`path`): [`FieldTree`](FieldTree.md)\<[`CoreFields`](CoreFields.md)\>

Defined in: packages/data/src/fields/field-tree.ts:219

Retrieves a `FieldTree` (branch) node from a specified path.

#### Parameters

##### path

`PathType`

The path to the `FieldTree` node.

#### Returns

[`FieldTree`](FieldTree.md)\<[`CoreFields`](CoreFields.md)\>

The `FieldTree` instance at the specified path.

#### Throws

If the path is invalid or the node at the path is not a `FieldTree`.

#### Inherited from

[`FieldTree`](FieldTree.md).[`getFieldTree`](FieldTree.md#getfieldtree)

***

### getNode()

> **getNode**(`name`): [`TreeNode`](../type-aliases/TreeNode.md)\<[`CoreFields`](CoreFields.md)\>

Defined in: packages/data/src/fields/field-tree.ts:159

Retrieves a direct child node by its name.

#### Parameters

##### name

`string`

The name of the child node.

#### Returns

[`TreeNode`](../type-aliases/TreeNode.md)\<[`CoreFields`](CoreFields.md)\>

The retrieved node.

#### Throws

If a node with the given name cannot be found.

#### Inherited from

[`FieldTree`](FieldTree.md).[`getNode`](FieldTree.md#getnode)

***

### getOrCreateFields()

> **getOrCreateFields**(`path`): [`CoreFields`](CoreFields.md)

Defined in: packages/data/src/fields/field-tree.ts:262

Retrieves a `Fields` container at the specified path. If it or any part of the path doesn't exist, it will be created.

#### Parameters

##### path

`PathType`

The path to the `Fields` container.

#### Returns

[`CoreFields`](CoreFields.md)

The existing or newly created `Fields` instance.

#### Inherited from

[`FieldTree`](FieldTree.md).[`getOrCreateFields`](FieldTree.md#getorcreatefields)

***

### getOrCreateFieldTree()

> **getOrCreateFieldTree**(`path`): [`FieldTree`](FieldTree.md)\<[`CoreFields`](CoreFields.md)\>

Defined in: packages/data/src/fields/field-tree.ts:250

Retrieves a `FieldTree` at the specified path. If it or any part of the path doesn't exist, it will be created.

#### Parameters

##### path

`PathType`

The path to the `FieldTree` node.

#### Returns

[`FieldTree`](FieldTree.md)\<[`CoreFields`](CoreFields.md)\>

The existing or newly created `FieldTree` instance.

#### Inherited from

[`FieldTree`](FieldTree.md).[`getOrCreateFieldTree`](FieldTree.md#getorcreatefieldtree)

***

### has()

> **has**(`name`): `boolean`

Defined in: packages/data/src/fields/field-tree.ts:96

Checks if a direct child node with the given name exists.

#### Parameters

##### name

`string`

The name of the direct child node.

#### Returns

`boolean`

`true` if the node exists, otherwise `false`.

#### Inherited from

[`FieldTree`](FieldTree.md).[`has`](FieldTree.md#has)

***

### hasPath()

> **hasPath**(`path`): `boolean`

Defined in: packages/data/src/fields/field-tree.ts:105

Checks if a node exists at a given path, traversing the tree.

#### Parameters

##### path

`PathType`

The path to check (e.g., 'player/stats' or ['player', 'stats']).

#### Returns

`boolean`

`true` if the entire path resolves to a node, otherwise `false`.

#### Inherited from

[`FieldTree`](FieldTree.md).[`hasPath`](FieldTree.md#haspath)

***

### removeNode()

> **removeNode**(`names`): `void`

Defined in: packages/data/src/fields/field-tree.ts:175

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

#### Inherited from

[`FieldTree`](FieldTree.md).[`removeNode`](FieldTree.md#removenode)

## Events

### onAdd

> **onAdd**: `Emitter`\<\[`object`\]\>

Defined in: packages/data/src/fields/field-tree.ts:39

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

#### Inherited from

[`FieldTree`](FieldTree.md).[`onAdd`](FieldTree.md#onadd)

***

### onRemove

> **onRemove**: `Emitter`\<\[`object`\]\>

Defined in: packages/data/src/fields/field-tree.ts:54

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

#### Inherited from

[`FieldTree`](FieldTree.md).[`onRemove`](FieldTree.md#onremove)
