import type {BaseNode, RegisteredField} from './fields.ts';

export type FieldNode = RegisteredField | FieldGroup;

export interface FieldGroup extends BaseNode {
  type: 'group';
  items: Record<string, FieldNode>;
}
