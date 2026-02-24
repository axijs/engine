import {Emitter, ensurePathArray, ensurePathString, PathType, throwIf, throwIfEmpty} from '@axi-engine/utils';
import {Fields} from './fields';
import {FieldTreeFactory} from './field-tree-factory';

/** A type alias for any container that can be a child node in a FieldTree */
export type TreeNode<F extends Fields> = FieldTree<F> | F;

/**
 * Represents a hierarchical data structure for managing the global state of the system.
 *
 * This class acts as the single source of truth for long-term data that exists
 * across different scenes and scripts, such as player stats, inventory,
 * and overall game progress. It uses a path-based system for accessing and
 * manipulating nested data, similar to a file system.
 *
 */
export class FieldTree<TFields extends Fields> {
  static readonly typeName = 'fieldTree';
  readonly typeName = FieldTree.typeName;

  /** @private The internal map storing child nodes (branches or leaves). */
  private readonly _nodes: Map<string, TreeNode<TFields>> = new Map();

  /** @private The factory used to create new child nodes. */
  private readonly _factory: FieldTreeFactory<TFields>;

  /**
   * An event emitter that fires immediately after a new node is added to this tree branch.
   * @event
   * @param {object} event - The event payload.
   * @param {string} event.name - The name (key) of the added node.
   * @param event.node - The node instance that was added.
   * @example
   * myTree.onAdd.subscribe(({ name, node }) => {
   *   console.log(`Node '${name}' was added.`, node);
   * });
   */
  onAdd = new Emitter<[event: {
    name: string,
    node: TreeNode<TFields>
  }]>();

  /**
   * An event emitter that fires once after one or more nodes have been successfully removed.
   * @event
   * @param {object} event - The event payload.
   * @param {string[]} event.names - An array of names of the nodes that were removed.
   * @example
   * myTree.onRemove.subscribe(({ names }) => {
   *   console.log(`Nodes removed: ${names.join(', ')}`);
   * });
   */
  onRemove = new Emitter<[event: {
    names: string[]
  }]>();

  /**
   * Provides direct access to the internal node storage.
   *
   * @remarks
   * This is primarily intended for **serialization**, debugging, or low-level iteration.
   * Avoid modifying this map directly to maintain internal consistency; use {@link addNode} or {@link removeNode} instead.
   * @internal
   */
  get nodes() {
    return this._nodes;
  }

  /**
   * Exposes the internal factory instance used by this tree.
   *
   * @remarks
   * Direct usage of this getter is generally unnecessary.
   * Prefer using {@link createDetachedTree} or {@link createDetachedFields} to create isolated instances.
   *
   * @returns {FieldTreeFactory} The factory instance.
   */
  get factory(): FieldTreeFactory<TFields> {
    return this._factory;
  }

  /**
   * Creates an instance of FieldTree.
   * @param {FieldTreeFactory} factory - A factory responsible for creating new nodes within the tree.
   */
  constructor(factory: FieldTreeFactory<TFields>) {
    this._factory = factory;
  }

  /**
   * Checks if a direct child node with the given name exists.
   * @param {string} name - The name of the direct child node.
   * @returns {boolean} `true` if the node exists, otherwise `false`.
   */
  has(name: string): boolean {
    return this._nodes.has(name);
  }

  /**
   * Checks if a node exists at a given path, traversing the tree.
   * @param {PathType} path - The path to check (e.g., 'player/stats' or ['player', 'stats']).
   * @returns {boolean} `true` if the entire path resolves to a node, otherwise `false`.
   */
  hasPath(path: PathType): boolean {
    // @todo: !important! need to fix case when tree didn't exists
    const traversedPath = this.traversePath(path);
    return traversedPath.branch.has(traversedPath.leafName);
  }

  /**
   * Adds a pre-existing node as a direct child of this tree branch.
   * @param {string} name - The name to assign to the new child node.
   * @param {TreeNode} node - The node instance to add.
   * @returns {TreeNode} The added node.
   * @throws If a node with the same name already exists.
   */
  addNode(name: string, node: TreeNode<TFields>): TreeNode<TFields> {
    throwIf(this.has(name), `Can't add node with name: '${name}', node already exists`);
    this._nodes.set(name, node);
    this.onAdd.emit({name, node});
    return node;
  }

  /**
   * Retrieves a direct child node by its name.
   * @param {string} name - The name of the child node.
   * @returns {TreeNode} The retrieved node.
   * @throws If a node with the given name cannot be found.
   */
  getNode(name: string): TreeNode<TFields> {
    const node = this._nodes.get(name);
    throwIfEmpty(node, `Can't find node with name '${name}'`);
    return node!;
  }

  /**
   * Removes one or more nodes from this tree branch.
   *
   * This method first validates that all specified nodes exist. If validation passes,
   * it recursively calls `destroy()` on each node to ensure proper cleanup of the entire subtree.
   * Finally, it emits a single `onRemove` event with the names of all successfully removed nodes.
   *
   * @param {string | string[]} names - A single name or an array of names of the nodes to remove.
   * @throws If any of the specified names do not correspond to an existing node.
   */
  removeNode(names: string | string[]) {
    const toRemoveNames = Array.isArray(names) ? names : [names];
    toRemoveNames.forEach(name => {
      throwIf(!this.has(name), `Can't remove node with name: '${name}', node doesn't exists`);
    });
    toRemoveNames.forEach(name => {
      this._nodes.get(name)!.destroy();
      this._nodes.delete(name);
    });
    if (toRemoveNames.length) {
      this.onRemove.emit({names: toRemoveNames});
    }
  }

  /**
   * Creates a new `FieldTree` (branch) node at the specified path.
   * @param {PathType} path - The path where the new `FieldTree` should be created.
   * @param {boolean} [createPath=false] - If `true`, any missing parent branches in the path will be created automatically.
   * @returns {FieldTree} The newly created `FieldTree` instance.
   * @throws If the path is invalid or a node already exists at the target location.
   */
  createFieldTree<T extends FieldTree<TFields>>(path: PathType, createPath?: boolean): T {
    const traversedPath = this.traversePath(path, createPath);
    return traversedPath.branch.addNode(traversedPath.leafName, this._factory.tree()) as T;
  }

  /**
   * Creates a new `Fields` (leaf) container at the specified path.
   * @param {PathType} path - The path where the new `Fields` container should be created.
   * @param {boolean} [createPath=false] - If `true`, any missing parent branches in the path will be created automatically.
   * @returns {Fields} The newly created `Fields` instance.
   * @throws If the path is invalid or a node already exists at the target location.
   */
  createFields(path: PathType, createPath?: boolean): TFields {
    const traversedPath = this.traversePath(path, createPath);
    return traversedPath.branch.addNode(traversedPath.leafName, this._factory.fields()) as TFields;
  }

  /**
   * Retrieves a `FieldTree` (branch) node from a specified path.
   * @param {PathType} path - The path to the `FieldTree` node.
   * @returns {FieldTree} The `FieldTree` instance at the specified path.
   * @throws If the path is invalid or the node at the path is not a `FieldTree`.
   */
  getFieldTree(path: PathType): FieldTree<TFields> {
    const traversedPath = this.traversePath(path);
    const node = traversedPath.branch.getNode(traversedPath.leafName);
    throwIf(
      !(node instanceof FieldTree),
      `Node with name: ${traversedPath.leafName} by path: '${ensurePathString(path)}' should be instance of FieldTree`
    );
    return node as FieldTree<TFields>;
  }

  /**
   * Retrieves a `Fields` (leaf) container from a specified path.
   * @param {PathType} path - The path to the `Fields` container.
   * @returns {Fields} The `Fields` instance at the specified path.
   * @throws If the path is invalid or the node at the path is not a `Fields` container.
   */
  getFields(path: PathType): TFields {
    const traversedPath = this.traversePath(path);
    const node = traversedPath.branch.getNode(traversedPath.leafName);
    throwIf(
      !(node instanceof Fields),
      `Node with name: ${traversedPath.leafName} by path: '${ensurePathString(path)}' should be instance of Fields`
    );
    return node as TFields;
  }

  /**
   * Retrieves a `FieldTree` at the specified path. If it or any part of the path doesn't exist, it will be created.
   * @param {PathType} path - The path to the `FieldTree` node.
   * @returns {FieldTree} The existing or newly created `FieldTree` instance.
   */
  getOrCreateFieldTree(path: PathType): FieldTree<TFields> {
    const traversedPath = this.traversePath(path, true);
    return traversedPath.branch.has(traversedPath.leafName) ?
      traversedPath.branch.getFieldTree(traversedPath.leafName) :
      traversedPath.branch.createFieldTree(traversedPath.leafName);
  }

  /**
   * Retrieves a `Fields` container at the specified path. If it or any part of the path doesn't exist, it will be created.
   * @param {PathType} path - The path to the `Fields` container.
   * @returns {Fields} The existing or newly created `Fields` instance.
   */
  getOrCreateFields(path: PathType): TFields {
    const traversedPath = this.traversePath(path, true);
    return traversedPath.branch.has(traversedPath.leafName) ?
      traversedPath.branch.getFields(traversedPath.leafName) :
      traversedPath.branch.createFields(traversedPath.leafName);
  }

  /**
   * Finds the parent node for a given path.
   * @param path The path to the target node.
   * @returns The parent node (either a FieldTree or Fields).
   * @throws An error if the path is invalid or any intermediate node is not a FieldTree.
   */
  findParentNode(path: PathType): FieldTree<TFields> | TFields {
    const info = this.traversePath(path);
    return info.branch;
  }

  /**
   * Removes all child nodes from this tree branch.
   * This method ensures that `destroy()` is called on each child node, allowing for
   * a full, recursive cleanup of the entire subtree.
   */
  clear() {
    this.removeNode(Array.from(this._nodes.keys()));
  }

  /**
   * Performs a complete cleanup of this node and its entire subtree.
   *
   * It recursively destroys all child nodes by calling `clear()` and then
   * unsubscribes all listeners from its own event emitters.
   * This method should be called when a node is no longer needed.
   */
  destroy() {
    this.clear();
    this.onAdd.clear();
    this.onRemove.clear();
  }

  /**
   * Creates a new, detached FieldTree instance using the same factory as this tree.
   * This new tree has no parent and is completely isolated.
   *
   * @returns A new instance of the same tree type.
   */
  createDetachedTree(): FieldTree<TFields> {
    return this._factory.tree();
  }

  /**
   * Creates a new, detached Fields container using the same factory.
   *
   * @returns
   */
  createDetachedFields(): TFields {
    return this._factory.fields();
  }

  /**
   * @private
   * Navigates the tree to the parent of a target node.
   * This is the core traversal logic for all path-based operations.
   * @param {PathType} path - The full path to the target node.
   * @param {boolean} [createPath=false] - If `true`, creates missing `FieldTree` branches along the path.
   * @returns {{branch: FieldTree, leafName: string}} An object containing the final branch (parent node) and the name of the leaf (target node).
   * @throws If the path is empty, invalid, or contains a `Fields` container as an intermediate segment.
   */
  private traversePath(
    path: PathType,
    createPath?: boolean
  ): { branch: FieldTree<TFields>, leafName: string } {
    const pathArr = ensurePathArray(path);
    throwIfEmpty(pathArr, 'The path is empty');
    const leafName = pathArr.pop()!;
    let currentNode: FieldTree<TFields> = this;

    for (const pathPart of pathArr) {
      let node: TreeNode<TFields> | undefined;
      if (currentNode.has(pathPart)) {
        node = currentNode.getNode(pathPart);
      } else {
        if (createPath) {
          node = currentNode.createFieldTree(pathPart);
        }
      }
      throwIfEmpty(node, `Can't find node with name ${pathPart} by path parsing: ${ensurePathString(path)}`);
      throwIf(node instanceof Fields, `Node with name ${pathPart} should be instance of FieldTree`);
      currentNode = node as FieldTree<TFields>;
    }

    return {branch: currentNode, leafName: leafName};
  }
}
