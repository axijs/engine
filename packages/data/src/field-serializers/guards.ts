import {SerializedGroup, SerializedNode} from './types';
import {isObject} from '@axijs/ensure';

export function isSerializedNode(node: unknown): node is SerializedNode {
  return isObject(node) && Object.hasOwn(node, 'type');
}

export function isSerializedGroup(node: unknown): node is SerializedGroup  {
  return isSerializedNode(node) && node.type === 'group';
}
