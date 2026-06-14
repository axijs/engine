import {ensurePathArray, type PathType} from '@axi-engine/utils';
import type {BooleanField, Field, FieldGroup, FieldNode, NumericField, StringField} from './types.ts';
import {isGroup} from './guards.ts';
import {isUndefined} from '@axijs/ensure';

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

/** nodes manipulations */
export function hasItem(node: FieldNode, childName: string) {
  return isGroup(node) && Object.hasOwn(node.items, childName);
}

export function getItem(node: FieldNode, childName: string) {
  return !isGroup(node) ? undefined : node.items[childName];
}

export function removeItem(node: FieldNode, childName: string) {
  if (hasItem(node, childName)) {
    delete (node as FieldGroup).items[childName];
    return true;
  }
  return false;
}

export function setItem(node: FieldNode, childName: string, childNode: FieldNode) {
  if (!isGroup(node)) {
    return false;
  }
  node.items[childName] = childNode;
  return true;
}

export function addItem(node: FieldNode, childName: string, childNode: FieldNode) {
  if (!isGroup(node) || hasItem(node, childName)) {
    return false;
  }
  node.items[childName] = childNode;
  return true;
}

export function replaceItem(node: FieldNode, childName: string, childNode: FieldNode) {
  if (!isGroup(node) || !hasItem(node, childName)) {
    return false;
  }
  node.items[childName] = childNode;
  return true;
}

/**
 * Navigates the tree to the parent of a target node.
 * This is the core traversal logic for all path-based operations.
 */
export function traversePath(
  group: FieldGroup,
  path: PathType,
  options?: {createPath?: boolean}
): {
  branch: FieldGroup,
  leafName: string
} | undefined {
  const pathArr = ensurePathArray(path);
  if (!pathArr.length) {
    return undefined;
  }
  const leafName = pathArr.pop()!;
  let currentNode: FieldGroup = group;
  for (const pathSegment of pathArr) {
    let node: FieldNode | undefined = getItem(currentNode, pathSegment);
    if (isUndefined(node) && options?.createPath) {
      addItem(currentNode, pathSegment, FieldFactory.group());
      node = getItem(currentNode, pathSegment);
    }
    if (!isGroup(node)) {
      return undefined;
    }
    currentNode = node as FieldGroup;
  }
  return {branch: currentNode, leafName: leafName};
}

/**
 * Checks if a node exists at a given path, traversing the tree.
 * @param group
 * @param {PathType} path - The path to check (e.g., 'player/stats' or ['player', 'stats']).
 * @returns {boolean} `true` if the entire path resolves to a node, otherwise `false`.
 */
export function hasNode(group: FieldGroup, path: PathType): boolean {
  const res = traversePath(group, path);
  return isUndefined(res) ? false : hasItem(res.branch, res.leafName);
}

// export function setNode(group: FieldGroup, path: PathType, node: FieldNode, options?: { createPath: boolean }) {
//   const traverse = traversePath(group, path, options?.createPath);
//   throwIf(
//     Object.hasOwn(traverse.branch.items, traverse.leafName),
//     `Node with name ${traverse.leafName} already exists`
//   );
//   traverse.branch.items[traverse.leafName] = node;
// }
//
// export function getNode(group: FieldGroup, path: PathType): FieldNode {
//   const traverse = traversePath(group, path);
//   throwIf(
//     !Object.hasOwn(traverse.branch.items, traverse.leafName),
//     `Can't find node with name ${traverse.leafName}`
//   );
//   return traverse.branch.items[traverse.leafName];
// }
//
// export function removeNode(group: FieldGroup, path: PathType) {
//   const traverse = traversePath(group, path);
//   throwIf(
//     !Object.hasOwn(traverse.branch.items, traverse.leafName),
//     `Can't find node with name ${traverse.leafName}`
//   );
//   delete traverse.branch.items[traverse.leafName];
// }


