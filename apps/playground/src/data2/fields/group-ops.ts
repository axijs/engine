import {isUndefined} from '@axijs/ensure';
import {ensurePathArray, type PathType} from '@axi-engine/utils';
import {isGroup} from './node-guards.ts';
import type {FieldGroup, FieldNode} from './field-group.ts';
import {NodeOps} from './node-ops.ts';
import {NodeFactory} from './node-factory.ts';


/**
 * creation factory helper
 */


/**
 * Navigates the tree to the parent of a target node.
 * This is the core traversal logic for all path-based operations.
 */

export const GroupOps = {
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
        NodeOps.add(currentNode, pathSegment, NodeFactory.group());
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
    const res = GroupOps.traversePath(group, path);
    return isUndefined(res) ? false : NodeOps.has(res.branch, res.leafName);
  },

  get: (group: FieldGroup, path: PathType): FieldNode | undefined => {
    const traverse = GroupOps.traversePath(group, path);
    return isUndefined(traverse) ? undefined : NodeOps.get(traverse.branch, traverse.leafName);
  },

  /**
   * @return true
   */
  set(group: FieldGroup, path: PathType, childNode: FieldNode): boolean {
    const traverse = GroupOps.traversePath(group, path, {createPath: true});
    return isUndefined(traverse) ? false : NodeOps.set(traverse.branch, traverse.leafName, childNode);
  },

  /**
   * @return boolean
   */
  add: (group: FieldGroup, path: PathType, childNode: FieldNode): boolean => {
    const traverse = GroupOps.traversePath(group, path);
    return isUndefined(traverse) ? false : NodeOps.add(traverse.branch, traverse.leafName, childNode);
  },

  /**
   * @return boolean
   */
  replace: (group: FieldGroup, path: PathType, childNode: FieldNode): boolean => {
    const traverse = GroupOps.traversePath(group, path);
    return isUndefined(traverse) ? false : NodeOps.replace(traverse.branch, traverse.leafName, childNode);
  },

  remove: (group: FieldGroup, path: PathType): boolean => {
    const traverse = GroupOps.traversePath(group, path);
    return isUndefined(traverse) ? false : NodeOps.remove(traverse.branch, traverse.leafName);
  }
}

