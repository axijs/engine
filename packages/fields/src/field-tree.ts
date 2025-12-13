import {ensurePathArray, ensurePathString, PathType, throwIf, throwIfEmpty} from '@axi-engine/utils';
import {Fields} from './fields';
import {TreeNodeFactory} from './field-tree-node-factory';


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
 * @todo
 * - Add node removal functionality.
 * - Implement an event system for node creation/removal.
 */
export class FieldTree<TFields extends Fields> {
  static readonly typeName = 'fieldTree';
  readonly typeName = FieldTree.typeName;

  /** @private The internal map storing child nodes (branches or leaves). */
  private readonly _nodes: Map<string, TreeNode<TFields>> = new Map();

  /** @private The factory used to create new child nodes. */
  private readonly _factory: TreeNodeFactory;

  /**
   * Gets the collection of direct child nodes of this tree branch.
   */
  get nodes() {
    return this._nodes;
  }

  /**
   * Creates an instance of FieldTree.
   * @param {TreeNodeFactory} factory - A factory responsible for creating new nodes within the tree.
   */
  constructor(factory: TreeNodeFactory) {
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
  getOrCreateFields(path: PathType): Fields {
    const traversedPath = this.traversePath(path, true);
    return traversedPath.branch.has(traversedPath.leafName) ?
      traversedPath.branch.getFields(traversedPath.leafName) :
      traversedPath.branch.createFields(traversedPath.leafName);
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
