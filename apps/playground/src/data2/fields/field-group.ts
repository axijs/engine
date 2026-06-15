import type {BaseNode, FieldType} from './fields.ts';

export type FieldNode = FieldType | FieldGroup;

export interface FieldGroup extends BaseNode {
  type: 'group';
  items: Record<string, FieldNode>;
}
