import type {BaseNode, FieldName, RegisteredField} from './fields';

export type FieldNode = RegisteredField | FieldGroup;

export type NodeName = FieldName & 'group';

export interface FieldGroup extends BaseNode {
  type: 'group';
  items: Record<string, FieldNode>;
}
