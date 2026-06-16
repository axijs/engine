import type {BaseNode, BooleanField, Field, GenericField, NumericField, StringField} from './fields.ts';
import {isObject} from '@axijs/ensure';
import type {FieldGroup} from './field-group.ts';

export function isNode(node: unknown): node is BaseNode {
  return isObject(node) && Object.hasOwn(node, 'type');
}

export function isGroup(node: unknown): node is FieldGroup  {
  return isNode(node) && node.type === 'group';
}

export function isField(node: unknown): node is Field<any>  {
  return isNode(node) && Object.hasOwn(node, 'value');
}

export function isGeneric(node: unknown): node is GenericField {
  return isNode(node) && node.type === 'generic';
}

export function isNumeric(node: unknown): node is NumericField {
  return isNode(node) && node.type === 'numeric';
}

export function isString(node: unknown): node is StringField {
  return isNode(node) && node.type === 'string';
}

export function isBoolean(node: unknown): node is BooleanField {
  return isNode(node) && node.type === 'boolean';
}
