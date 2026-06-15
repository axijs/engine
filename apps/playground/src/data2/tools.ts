import {isUndefined} from '@axijs/ensure';
import {ensurePathArray, type PathType} from '@axi-engine/utils';
import type {BooleanField, Field, FieldGroup, FieldNode, NumericField, StringField} from './fields.ts';
import {isGroup} from './guards.ts';


/**
 * creation factory helper
 */
export const FieldFactory = {
  generic: <T>(type: string, value: T): Field<T> => ({type, value}),
  num: (value: number): NumericField => ({type: 'numeric', value}),
  bool: (value: boolean): BooleanField => ({type: 'boolean', value}),
  str: (value: string): StringField => ({type: 'string', value}),
  group: (data: Record<string, FieldNode> = {}): FieldGroup => ({type: 'group', items: data})
}

export const NodeOps = {
  /** nodes manipulations */
  has: (node: FieldNode, childName: string): boolean => isGroup(node) && Object.hasOwn(node.items, childName),

  get: (node: FieldNode, childName: string): FieldNode | undefined => {
    return !isGroup(node) ? undefined : node.items[childName];
  },

  set: (node: FieldNode, childName: string, childNode: FieldNode): boolean => {
    if (!isGroup(node)) {
      return false;
    }
    node.items[childName] = childNode;
    return true;
  },

  /**
   * adds the childNode if didn't exist
   * @return boolean
   */
  add: (node: FieldNode, childName: string, childNode: FieldNode): boolean => {
    if (!isGroup(node) || NodeOps.has(node, childName)) {
      return false;
    }
    node.items[childName] = childNode;
    return true;
  },

  /**
   * replaces the childNode if exist
   * @return boolean
   */
  replace: (node: FieldNode, childName: string, childNode: FieldNode): boolean => {
    if (!isGroup(node) || !NodeOps.has(node, childName)) {
      return false;
    }
    node.items[childName] = childNode;
    return true;
  },

  remove: (node: FieldNode, childName: string): boolean => {
    if (NodeOps.has(node, childName)) {
      delete (node as FieldGroup).items[childName];
      return true;
    }
    return false;
  }
}

/**
 * Navigates the tree to the parent of a target node.
 * This is the core traversal logic for all path-based operations.
 */

export const TreeOps = {
  traversePath: (group: FieldGroup, path: PathType, options?: { createPath?: boolean })
    : { branch: FieldGroup, leafName: string } | undefined =>
  {
    const pathArr = ensurePathArray(path);
    if (!pathArr.length) {
      return undefined;
    }
    const leafName = pathArr.pop()!;
    let currentNode: FieldGroup = group;
    for (const pathSegment of pathArr) {
      let node: FieldNode | undefined = NodeOps.get(currentNode, pathSegment);
      if (isUndefined(node) && options?.createPath) {
        NodeOps.add(currentNode, pathSegment, FieldFactory.group());
        node = NodeOps.get(currentNode, pathSegment);
      }
      if (!isGroup(node)) {
        return undefined;
      }
      currentNode = node as FieldGroup;
    }
    return {branch: currentNode, leafName: leafName};
  },

  /**
   * Checks if a node exists at a given path, traversing the tree.
   * @param group
   * @param {PathType} path - The path to check (e.g., 'player/stats' or ['player', 'stats']).
   * @returns {boolean} `true` if the entire path resolves to a node, otherwise `false`.
   */
  has: (group: FieldGroup, path: PathType): boolean => {
    const res = TreeOps.traversePath(group, path);
    return isUndefined(res) ? false : NodeOps.has(res.branch, res.leafName);
  },

  get: (group: FieldGroup, path: PathType): FieldNode | undefined => {
    const traverse = TreeOps.traversePath(group, path);
    return isUndefined(traverse) ? undefined : NodeOps.get(traverse.branch, traverse.leafName);
  },

  /**
   * @return true
   */
  set(group: FieldGroup, path: PathType, childNode: FieldNode): boolean {
    const traverse = TreeOps.traversePath(group, path, {createPath: true});
    return isUndefined(traverse) ? false : NodeOps.set(traverse.branch, traverse.leafName, childNode);
  },

  /**
   * @return boolean
   */
  add: (group: FieldGroup, path: PathType, childNode: FieldNode): boolean => {
    const traverse = TreeOps.traversePath(group, path);
    return isUndefined(traverse) ? false : NodeOps.add(traverse.branch, traverse.leafName, childNode);
  },

  /**
   * @return boolean
   */
  replace: (group: FieldGroup, path: PathType, childNode: FieldNode): boolean => {
    const traverse = TreeOps.traversePath(group, path);
    return isUndefined(traverse) ? false : NodeOps.replace(traverse.branch, traverse.leafName, childNode);
  },

  remove: (group: FieldGroup, path: PathType): boolean => {
    const traverse = TreeOps.traversePath(group, path);
    return isUndefined(traverse) ? false : NodeOps.remove(traverse.branch, traverse.leafName);
  }
}

