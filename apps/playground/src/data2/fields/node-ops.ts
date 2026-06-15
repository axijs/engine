import {isGroup} from './node-guards.ts';
import type {FieldGroup, FieldNode} from './field-group.ts';

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
