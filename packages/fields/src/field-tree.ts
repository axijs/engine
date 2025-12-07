import {ensurePathArray, ensurePathString, PathType, throwIf, throwIfEmpty} from '@axi-engine/utils';
import {Fields} from './fields';
import {DefaultFields} from './default-fields';
import {defaultFieldFactoryRegistry} from './field-registry';

interface TreeNodeFactory {
  fields<T extends Fields>(): T,

  tree<T extends FieldTree>(): T
}

class DefaultNodeFactory implements TreeNodeFactory {
  fields = () => new DefaultFields(defaultFieldFactoryRegistry) as any;
  tree = () => new FieldTree(this) as any; // Передає саму себе в дочірні вузли
}

/** A type alias for any container that can be a child node in a FieldTree */
export type TreeOrFieldsNode = FieldTree | Fields;

/** A helper type representing the constructor of a container */
// type ContainerCtor<T extends TreeOrFieldsContainer> = new () => T;

/** Describes the payload for events emitted when a container is created or removed from a FieldTree. */
// export type FieldTreeContainerEvent = {
//   type: 'created' | 'removed';
//   name: string;
//   path: [],
//   node: TreeOrFieldsContainer
// };


/**
 * Represents the global, persistent state of the entire system.
 * This service acts as the single source of truth for long-term data that exists
 * across different scenes and scripts, such as player stats, inventory,
 * and overall game progress.
 * It is designed to be the foundational data layer,
 * independent of any single script's / minigames execution lifecycle.
 * @template T Branch or Leaf types (FieldTree or Fields with items)
 * @todo:
 * - add node removing
 */
export class FieldTree {
  private readonly _items: Map<string, TreeOrFieldsNode> = new Map();
  private readonly _factory: TreeNodeFactory;

//   // readonly events = new AxiEventEmitter<'created' | 'removed'>();

  get items() {
    return this._items;
  }

  constructor(factory: TreeNodeFactory) {
    this._factory = factory;
  }

  has(name: string) {
    return this._items.has(name);
  }

  /**
   * Checks if a path to a node or fields container  or field exists without creating it.
   * @returns true if the entire path exists, false otherwise.
   */
  hasPath(path: PathType): boolean {
    const pathParts = ensurePathArray(path);
    let currentNode: TreeOrFieldsNode = this;

    for (let i = 0; i < pathParts.length; i++) {
      const part = pathParts[i];
      const nextNode: TreeOrFieldsNode | undefined = currentNode._items.get(part);
      if (!nextNode) {
        return false;
      }
      if (nextNode instanceof Fields) {
        /** if Fields last node - return true */
        if (i === pathParts.length - 1) {
          return true;
        }
        /** if after fields has more than one path parts throw error because wrong path to node  */
        throwIf(
          pathParts.length - i > 2,
          `Path validation failed, full path: ${ensurePathString(path)}, has extra nodes after Fields placed at: ${ensurePathString(pathParts.slice(0, i + 1))}`
        );
        return nextNode.has(pathParts[i + 1]);
      }
      currentNode = nextNode;
    }
    return true;
  }

  addNode(name: string, node: TreeOrFieldsNode) {
    throwIf(this.has(name), `Can't add node with name: '${name}', node already exists`);
    this._items.set(name, node);
    return node;
  }

  /**
   * Retrieves a child node from this tree level without type checking.
   * @param name The name of the child node.
   * @returns The retrieved node, which can be a `FieldTree` or a `Fields` container.
   * @throws If a node with the given name cannot be found.
   */
  getNode(name: string): TreeOrFieldsNode {
    const node = this._items.get(name);
    throwIfEmpty(node, `Can't find node with name '${name}'`);
    return node!;
  }

  /**
   * Creates and adds a new `FieldTree` node as a child of this one.
   * @param name The unique name for the new `FieldTree` node.
   * @returns The newly created `FieldTree` instance.
   */
  createFieldTree<T extends FieldTree>(name: string): T {
    return this.addNode(name, this._factory.tree<T>()) as T;
  }

  /**
   * Creates and adds a new `Fields` container as a child of this one.
   * @param name The unique name for the new `Fields` container.
   * @returns The newly created `Fields` instance.
   */
  createFields<T extends Fields>(name: string): T {
    return this.addNode(name, this._factory.fields<T>()) as T;
  }

  /**
   * Retrieves a child node and asserts that it is an instance of `FieldTree`.
   * @param name The name of the child node.
   * @returns The `FieldTree` instance.
   * @throws If the node does not exist or is not a `FieldTree`.
   */
  getFieldTree(name: string) {
    const node = this.getNode(name);
    throwIf(!(node instanceof FieldTree), `Node '${name}' should be instance of FieldTree`);
    return node as FieldTree;
  }

  /**
   * Retrieves a child node and asserts that it is an instance of `Fields`.
   * @param name The name of the child node.
   * @returns The `Fields` instance.
   * @throws If the node does not exist or is not a `Fields` container.
   */
  getFields(name: string) {
    const node = this.getNode(name);
    throwIf(!(node instanceof Fields), `Node '${name}' should be instance of Fields`);
    return node as Fields;
  }

  /**
   * Navigates through the tree using a path and returns the `Fields` container at the end.
   * @param path The path to the `Fields` container (e.g., 'player/stats').
   * @returns The `Fields` container at the specified path.
   * @throws If the path is empty, or any intermediate node is not a `FieldTree`.
   */
  getFieldsByPath(path: PathType) {
    const pathParts = ensurePathArray(path);
    throwIf(!pathParts.length, 'Empty path');
    let container: FieldTree = this;
    for (let i = 0; i < pathParts.length - 1; i++) {
      container = container.getFieldTree(pathParts[i]);
    }
    return container.getFields(pathParts[pathParts.length - 1]);
  }

//   /**
//    * Creates a `Field` at a deeply nested path.
//    * The last part of the path is treated as the field name, and the preceding parts as the path to its container.
//    * @param path The full path to the new field (e.g., 'player/stats/health').
//    * @param initialValue The initial value for the new field.
//    * @returns The newly created `Field` instance.
//    */
//   create<T>(path: PathType, initialValue: T): BaseField<T> {
//     const fullPath = [...ensurePathArray(path)];
//     const fieldName = fullPath.pop()!;
//     throwIf(!fullPath.length, `Wrong path format of one field creating: '${ensurePathString(path)}', should be at least two sections`);
//     return this.getFieldsByPath(fullPath).create<T>(fieldName, initialValue);
//   }
//
//   /**
//    * Creates a `NumberField` at a deeply nested path.
//    * @param path The full path to the new field (e.g., 'player/stats/mana').
//    * @param initialValue The initial numeric value.
//    * @returns The newly created `NumberField` instance.
//    */
//   createNumber(path: PathType, initialValue: number): NumberField {
//     const fullPath = [...ensurePathArray(path)];
//     const fieldName = fullPath.pop()!;
//     return this.getFieldsByPath(fullPath).createNumber(fieldName, initialValue);
//   }
//
//   /**
//    * Retrieves a `Field` from a deeply nested path.
//    * @param path The full path to the field (e.g., 'player/stats/name').
//    * @returns The `Field` instance at the specified path.
//    */
//   get<T>(path: PathType): BaseField<T> {
//     const fullPath = [...ensurePathArray(path)];
//     const fieldName = fullPath.pop()!;
//     return this.getFieldsByPath(fullPath).get<T>(fieldName);
//   }
//
//   /**
//    * Retrieves a `NumberField` from a deeply nested path.
//    * @param path The full path to the number field (e.g., 'player/stats/level').
//    * @returns The `NumberField` instance at the specified path.
//    */
//   getNumber(path: PathType): NumberField {
//     const fullPath = [...ensurePathArray(path)];
//     const fieldName = fullPath.pop()!;
//     return this.getFieldsByPath(fullPath).getNumber(fieldName);
//   }


//   /**
//    * Creates a serializable snapshot of the entire tree and its contained fields.
//    * @returns A plain JavaScript object representing the complete state managed by this tree.
//    */
//   snapshot() {
//     const dump: Record<string, any> = {
//       __type: FieldsNodeType.fieldTree
//     };
//     this._items.forEach((node, key) => dump[key] = node.snapshot());
//     return dump;
//   }
//
//   /**
//    * Restores the state of the tree from a snapshot.
//    * It intelligently creates missing nodes based on `__type` metadata and delegates hydration to child nodes.
//    * @param snapshot The snapshot object to load.
//    */
//   hydrate(snapshot: any) {
//     for (const key in snapshot) {
//       if (key === '__type') {
//         continue;
//       }
//
//       const field = snapshot[key];
//       const type = field?.__type;
//
//       let node: TreeOrFieldsContainer | undefined = this._items.get(key);
//       if (!node) {
//         if (type === FieldsNodeType.fields) {
//           node = this.createFields(key);
//         } else if (type === FieldsNodeType.fieldTree) {
//           node = this.createFieldTree(key);
//         } else {
//           console.warn(`Node '${key}' in snapshot has no __type metadata. Skipping.`);
//         }
//       }
//       node?.hydrate(field);
//     }
//   }
//
//   /**
//    * @private
//    * Generic internal method for creating and adding a new node to the tree.
//    * @param name The name of the node to create.
//    * @param ctor The constructor for the node type (e.g., `FieldTree` or `Fields`).
//    * @returns The newly created node instance.
//    */
//   private createNode<T extends TreeOrFieldsContainer>(name: string, ctor: ContainerCtor<T>): T {
//     throwIf(this._items.has(name), `Can't create node with name: '${name}', node already exists`);
//
//     const res = new ctor();
//     this._items.set(name, res);
//
//     /** todo: restore */
//     // this.events.emit('created', {
//     //   type: 'created',
//     //   name: name,
//     //   path: [], // todo: need to decide how to pass full path
//     //   node: res
//     // } as FieldTreeContainerEvent);
//
//     return res;
//   }
}
